using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;
using TasteItInYourHome.Server.Controllers.Sally; // علشان ResetCodeStore

namespace TasteItInYourHome.Server.DataService
{
    public class SallyDataService : SallyIDataService
    {
        private readonly ChefProjectContext db;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public SallyDataService(ChefProjectContext db, IWebHostEnvironment hostingEnvironment)
        {
            this.db = db;
            _hostingEnvironment = hostingEnvironment;
        }

        public int? LoginAndGetId(loginUserDTO user)
        {
            if (user.Email=="admin@gmail.com" && user.Password == "admin")
            {
                return -1;
            }
            var existUser = db.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existUser == null) return null;

            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(user.Password, existUser.PasswordHash);
            if (!isPasswordCorrect) return null;

            return existUser.Id;
        }

        public async Task SendPasswordResetCodeAsync(string toEmail)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == toEmail);
            if (user == null) return;

            var code = new Random().Next(100000, 999999).ToString();
            ResetCodeStore.Codes[toEmail] = code;

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("TasteItInYourHome", "tested4email@gmail.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Password Reset Code";
            message.Body = new TextPart("plain")
            {
                Text = $"Your password reset code is: {code}"
            };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync("tested4email@gmail.com", "jjde lbzz zdxy cvxs");
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public bool VerifyResetCode(string email, string code)
        {
            if (ResetCodeStore.Codes.TryGetValue(email, out var storedCode))
            {
                return storedCode == code;
            }
            return false;
        }

        public async Task<bool> ResetPasswordAsync(string email, string newPassword)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await db.SaveChangesAsync();
            ResetCodeStore.Codes.Remove(email); // حذف الكود بعد استخدامه
            return true;
        }

        public async Task<string> Register(addUserDTO user)
        {
            var existUser = db.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existUser != null) return "Email already exists.";

            if (user.Image != null)
            {
                var uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                var fileName = Path.GetFileName(user.Image.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await user.Image.CopyToAsync(fileStream);
                }

                user.ImageUrl = Path.Combine("uploads", fileName);
            }

            var NewUser = new User
            {
                Email = user.Email,
                FullName = user.FullName,
                Address = user.Address,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password),
                PhoneNumber = user.PhoneNumber,
                ImageUrl = user.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            db.Users.Add(NewUser);
            db.SaveChanges();
            return "User registered successfully.";
        }

        public async Task<GoogleLoginResponseDTO?> GoogleLogin(string token)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(token);
                var user = db.Users.FirstOrDefault(u => u.Email == payload.Email) ?? new User
                {
                    Email = payload.Email,
                    FullName = payload.Name,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    IsGoogleUser = true,
                    GoogleId = payload.Subject,
                    CreatedAt = DateTime.UtcNow
                };

                if (user.Id == 0)
                {
                    db.Users.Add(user);
                    await db.SaveChangesAsync();
                }

                return new GoogleLoginResponseDTO
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    IsGoogleUser = true,
                    Id = user.Id,
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Google login error: {ex.Message}");
                return null;
            }
        }
    }
}
