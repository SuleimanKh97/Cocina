using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.Dtos;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;
using BCrypt.Net;


namespace TasteItInYourHome.Server.DataService
{
    public class SondosDataService : SondosIDataService
    {

        private readonly ChefProjectContext _context;

        public SondosDataService(ChefProjectContext context)
        {
            _context = context;
        }

        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }
        public User getUserById(int id)
        {


            var user = _context.Users.Find(id);
            if (user != null) { 
                return user;
            }

            return null;
        }

        //public async Task<string> Feedback(FeedbackDTO feedback)
        //{


        //    var newFeedback = new Feedback
        //    {
        //        BookingId = feedback.BookingId,
        //        Rating = feedback.Rating,
        //        Comment = feedback.Comment,
        //        SubmittedAt = DateTime.UtcNow,

        //    };

        //    _context.Users.Add(newFeedback);
        //    _context.SaveChanges();
        //    return "User registered successfully.";
        //}
        public List<BookingHistoryDto> BookingHistory(int UserId)
        {
            var bookings = _context.Bookings
                .Where(b => b.UserId == UserId)
                .Include(b => b.Chef)
                .Include(b => b.Food)
                .Include(b => b.Service)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BookingHistoryDto
                {
                    Id = b.Id,
                    ChefName = b.Chef != null ? b.Chef.FullName : string.Empty,
                    FoodName = b.Food != null ? b.Food.Name : string.Empty,
                    ServiceName = b.Service != null ? b.Service.Name : string.Empty,
                    NumberOfGuests = b.NumberOfGuests,
                    BookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                    TimeSlot = b.TimeSlot,
                    Status = b.Status,
                    CreatedAt = b.CreatedAt.HasValue ? b.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm:ss") : string.Empty
                })
                .ToList();

            return bookings;
        }

        public bool AddFeedback(FeedbackDto dto)
        {
            Console.WriteLine($"\n===== AÑADIENDO FEEDBACK PARA BOOKING {dto?.BookingId} =====");
            
            if (dto == null || !dto.BookingId.HasValue)
            {
                Console.WriteLine("Error: dto es null o BookingId no tiene valor");
                return false;
            }

            // التحقق من وجود الملاحظات السابقة
            var existingFeedback = _context.Feedbacks
                .FirstOrDefault(f => f.BookingId == dto.BookingId.Value);

            if (existingFeedback != null)
            {
                // Ya existe un feedback para esta reserva
                Console.WriteLine($"Error: Feedback ya existe para booking {dto.BookingId.Value}");
                return false;
            }

            // التحقق من حالة الطلب - يجب أن تكون "Completed" أو "completed" أو "Accepted" أو "accepted"
            var booking = _context.Bookings.Find(dto.BookingId.Value);
            if (booking == null)
            {
                Console.WriteLine($"Error: Booking {dto.BookingId.Value} no encontrado");
                return false; // الطلب غير موجود
            }

            // Depuración: Mostrar el estado actual del booking
            Console.WriteLine($"Booking {dto.BookingId.Value} status: '{booking.Status}' (tipo: {booking.Status?.GetType().Name})");
            
            // Mostrar bytes del string para depuración
            if (booking.Status != null)
            {
                Console.WriteLine("Bytes del status:");
                foreach (var b in System.Text.Encoding.UTF8.GetBytes(booking.Status))
                {
                    Console.Write($"{b:X2} ");
                }
                Console.WriteLine();
            }

            // التحقق من الحالة بصرف النظر عن حالة الأحرف
            // Pruebas de comparación para diagnóstico
            Console.WriteLine($"Comparación directa: '{booking.Status}' == 'Completed': {booking.Status == "Completed"}");
            Console.WriteLine($"Comparación con ToLower: '{booking.Status}' -> '{booking.Status?.ToLower()}' == 'completed': {booking.Status?.ToLower() == "completed"}");
            Console.WriteLine($"Comparación con Trim: '{booking.Status}' -> '{booking.Status?.Trim()}' == 'Completed': {booking.Status?.Trim() == "Completed"}");
            Console.WriteLine($"Comparación con ToLowerInvariant: '{booking.Status}' -> '{booking.Status?.ToLowerInvariant()}' == 'completed': {booking.Status?.ToLowerInvariant() == "completed"}");

            // Caso especial: permitir estados exactos o normalizados
            bool isValidStatus = booking.Status == "Completed" || 
                              booking.Status == "Accepted" ||
                              booking.Status?.ToLower()?.Trim() == "completed" || 
                              booking.Status?.ToLower()?.Trim() == "accepted";

            Console.WriteLine($"¿Es estado válido? {isValidStatus}");
            
            if (isValidStatus)
            {
                // El estado es válido, continuar con la adición del feedback
                var feedback = new Feedback
                {
                    BookingId = dto.BookingId.Value,
                    Rating = dto.Rating,
                    Comment = dto.Comment,
                    SubmittedAt = DateTime.UtcNow
                };

                _context.Feedbacks.Add(feedback);
                _context.SaveChanges(); // استخدام SaveChanges بدلاً من SaveChangesAsync

                Console.WriteLine($"Feedback añadido con éxito para booking {dto.BookingId.Value}");
                return true;
            }
            else
            {
                // Estado inválido para añadir feedback
                Console.WriteLine($"Error: Estado inválido '{booking.Status}' para añadir feedback");
                return false;
            }
        }

        //public bool UpdateProfile(int id,  EditProfileWithImageDto Dto)
        //{


        //    var user = _context.Users.Find(id);
        //    if (user != null)
        //    {
        //        user.FullName = Dto.FullName;
        //        user.Email = Dto.Email;
        //        user.PhoneNumber = Dto.PhoneNumber;
        //        user.Address = Dto.Address;

        //        if (Dto.ImageUrl != null)
        //        {

        //            user.ImageUrl = Dto.ImageUrl;
        //        }

        //        _context.SaveChanges();
        //        return true;

        //    }
        //    return false;
        //}
      

           
                

            

      
        public async Task<bool> UpdateProfileAsync(int id, EditProfileWithImageDto dto)
        {
            var user = _context.Users.Find(id);
            if (user == null) return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Address = dto.Address;

            if (dto.ImageFile != null)
            {
                var uploadsFolder = Path.Combine("wwwroot", "assets", "images");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.ImageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageFile.CopyToAsync(stream);
                }

                user.ImageUrl = fileName;
            }

            await _context.SaveChangesAsync();
            return true;
        }




        public void ChangePassword(int id, changePassword Dto)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                throw new Exception("User not found");

            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(Dto.CurrentPassword, user.PasswordHash);
            if (!isPasswordCorrect)
                throw new Exception("Current password is incorrect");

           
            string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(Dto.NewPassword);

            
            user.PasswordHash = hashedNewPassword;
            _context.SaveChanges();
        }

        public List<BookingHistoryDto> GetUserBookingHistory(int userId)
        {


            var bookings = _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Chef)
                .Include(b => b.Food)
                .Include(b => b.Service)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new BookingHistoryDto
                {
                    Id = b.Id,
                    ChefName = b.Chef != null ? b.Chef.FullName : string.Empty,
                    FoodName = b.Food != null ? b.Food.Name : string.Empty,
                    ServiceName = b.Service != null ? b.Service.Name : string.Empty,
                    NumberOfGuests = b.NumberOfGuests,
                    BookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                    TimeSlot = b.TimeSlot,
                    Status = b.Status,
                    CreatedAt = b.CreatedAt.HasValue ? b.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm:ss") : string.Empty
                })
                .ToList();

            return bookings;
        }

        public Booking GetBookingById(int bookingId)
        {
            return _context.Bookings.Find(bookingId);
        }

        public Feedback GetFeedbackByBookingId(int bookingId)
        {
            return _context.Feedbacks.FirstOrDefault(f => f.BookingId == bookingId);
        }

    }
}
