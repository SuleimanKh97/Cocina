using System.Diagnostics.Contracts;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.DataService
{
    public class SajedaDataService : SajedaIDataService
    {
        private readonly ChefProjectContext _projectContext;

        public SajedaDataService(ChefProjectContext projectContext)
        {
            _projectContext = projectContext;
        }


        public int AddBook(BookingReq dto)
        {
            var book = new Booking()
            {
                BookingDate = dto.BookingDate,
                UserId = dto.UserId,
                ChefId = dto.ChefId,
                FoodId = dto.FoodId,
                ServiceId = dto.ServiceId,
                NumberOfGuests = dto.NumberOfGuests,
                Status = "Pending",
                TimeSlot = dto.TimeSlot,
            };
            _projectContext.Add(book);
            _projectContext.SaveChanges();
            return book.Id; // Return the ID of the inserted booking
        }

        public User getUserByID(int id)
        {
            var user = _projectContext.Users.Find(id);
            return user;

        }

        public List<Chef> getAllChifs()
        {
            var chefs = _projectContext.Chefs.ToList();
            return chefs;
        }

        public List<FoodCategory> getAllFoodCategories() { 
            
            var categories = _projectContext.FoodCategories.ToList();
            return categories;
        }

        public List<Food> GetByChefAndCategoryAsync(int chefId, int categoryId)
        {
            var food= _projectContext.Foods
                .Where(f => f.ChefId == chefId && f.CategoryId == categoryId)
                .ToList();
            return food;
        }

        public List<Service> GetAllServ()
        { 
            return  _projectContext.Services.ToList();
        }

        public Payment addPayment(PaymentRequest dto)
        {
            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                PaymentMethod = dto.PaymentMethod,
                PaymentStatus = dto.PaymentStatus,
                PaymentDate = dto.PaymentDate,
            };
            _projectContext.Add(payment);
            _projectContext.SaveChanges();
            return payment; 
        }

        public Booking getBookID(int id)
        {
            var book = _projectContext.Bookings.Find(id);
            return book;
        }


        public List<string> GetAvailability(int chefId, DateTime bookingDate)
        {
            var chef = _projectContext.Chefs.Find(chefId);
            if (chef == null || string.IsNullOrEmpty(chef.AvailabilitySchedule))
                return new List<string>();

            // Deserialize the JSON to a dictionary
            var availability = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(chef.AvailabilitySchedule);

            var dateKey = bookingDate.ToString("yyyy-MM-dd"); // format the date as string "2025-04-23"

            if (availability != null && availability.TryGetValue(dateKey, out var times))
                return times;

            return new List<string>();
        }

        public List<BookingDTO> GetUserBookings(int userId)
        {
            return _projectContext.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Chef)
                .Include(b => b.Food)
                .Include(b => b.Service)
                .Include(b => b.User)
                .Select(b => new BookingDTO
                {
                    Id = b.Id,
                    BookingDate = new DateTime(b.BookingDate.Year, b.BookingDate.Month, b.BookingDate.Day),
                    ChefId = b.ChefId ?? 0,
                    ChefName = b.Chef.FullName,
                    FoodId = b.FoodId ?? 0,
                    FoodName = b.Food.Name,
                    ServiceId = b.ServiceId ?? 0,
                    ServiceName = b.Service.Name,
                    UserId = b.UserId ?? 0,
                    UserName = b.User.FullName,
                    NumberOfGuests = b.NumberOfGuests ?? 0,
                    Status = b.Status ?? "Unknown",
                    TimeSlot = b.TimeSlot
                })
                .ToList();
        }

        public bool CancelBooking(int bookingId)
        {
            var booking = _projectContext.Bookings.Find(bookingId);
            if (booking == null)
                return false;

            // Only allow cancellation of pending or confirmed bookings
            if (booking.Status != "Pending" && booking.Status != "Confirmed")
                return false;

            booking.Status = "Cancelled";
            _projectContext.SaveChanges();
            return true;
        }
    }
}

    