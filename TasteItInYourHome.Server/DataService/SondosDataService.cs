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
        public List<Booking> BookingHistory(int UserId)
        {
            var bookings = _context.Bookings
                .Where(b => b.UserId == UserId)
                .ToList();

            return bookings;
        }

        public  bool AddFeedback( FeedbackDto dto)
        {
            var existingFeedback = _context.Feedbacks
         .FirstOrDefault(f => f.BookingId == dto.BookingId);

            if (existingFeedback != null)
            {
                return false;
            }

            var feedback = new Feedback
            {
                BookingId = dto.BookingId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                SubmittedAt = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
             _context.SaveChangesAsync();

            return true;
        }
    
        public bool UpdateProfile(int id,  EditProfile Dto)
        {
            

            var user = _context.Users.Find(id);
            if (user != null)
            {
                user.FullName = Dto.FullName;
                user.Email = Dto.Email;
                user.PhoneNumber = Dto.PhoneNumber;
                user.Address = Dto.Address;

                if (Dto.ImageUrl != null)
                {
                   
                    user.ImageUrl = Dto.ImageUrl;
                }

                _context.SaveChanges();
                return true;
               
            }
            return false;
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



    }
}
