using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

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

            if (Dto.CurrentPassword != user.PasswordHash)
                throw new Exception("Current password is incorrect");

            user.PasswordHash = Dto.NewPassword;
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
