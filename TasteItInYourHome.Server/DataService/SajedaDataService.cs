using System.Diagnostics.Contracts;
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


        public bool AddBook(BookingReq dto)
        {
            var book = new Booking()
            {
                BookingDate = dto.BookingDate,
                UserId = dto.UserId,
                ChefId = dto.ChefId,
                FoodId = dto.FoodId,
                ServiceId = dto.ServiceId,
                NumberOfGuests = dto.NumberOfGuests,
                Status = dto.Status,
                TimeSlot = dto.TimeSlot,
            };
            _projectContext.Add(book);
            _projectContext.SaveChanges();
            return true;
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
    }
}

    