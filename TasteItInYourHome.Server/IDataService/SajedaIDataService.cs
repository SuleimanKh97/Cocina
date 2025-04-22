using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SajedaIDataService
    {
        public int AddBook(BookingReq dto);
        public User getUserByID(int id);
        public List<Chef> getAllChifs();
        public List<FoodCategory> getAllFoodCategories();
        public List<Food> GetByChefAndCategoryAsync(int chefId, int categoryId);
        public List<Service> GetAllServ();
        public Payment addPayment(PaymentRequest dto);
        public Booking getBookID(int id);
        public List<string> GetAvailability(int chefId, DateTime bookingDate);
        public List<BookingDTO> GetUserBookings(int userId);
        public bool CancelBooking(int bookingId);
    }
}
