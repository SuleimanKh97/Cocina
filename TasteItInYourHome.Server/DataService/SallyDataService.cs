using Google.Apis.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

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
            var existUser = db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (existUser == null) return null;

            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(user.Password, existUser.PasswordHash);

            if (!isPasswordCorrect) return null;

            return existUser.Id;
        }


        public async Task<string> Register(addUserDTO user)
        {
            var existUser = db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (existUser != null)
                return "Email already exists.";

            if (user.Image != null)
            {
                // تحديد المسار لتخزين الصورة
                var uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileName = Path.GetFileName(user.Image.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                // حفظ الصورة على الخادم
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await user.Image.CopyToAsync(fileStream);
                }

                // تخزين رابط الصورة في ImageUrl
                var imageUrl = Path.Combine("uploads", fileName); // هذا هو المسار الذي يمكنك تخزينه في قاعدة البيانات
                user.ImageUrl = imageUrl; // الآن تقوم بتخزين الرابط في ImageUrl
            }



            var NewUser = new User
            {
                Email = user.Email,
                FullName = user.FullName,
                Address = user.Address,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password),
                PhoneNumber = user.PhoneNumber,
                ImageUrl = user.ImageUrl,  // Use the ImageUrl from DTO directly
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

                if (user.Id == 0) // New user
                {
                    db.Users.Add(user);
                    await db.SaveChangesAsync();
                }

                return new GoogleLoginResponseDTO
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    IsGoogleUser = true
                    // لا يوجد JwtToken هنا
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
