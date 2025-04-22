using TasteItInYourHome.Server.Dtos;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DTOs;



namespace TasteItInYourHome.Server.DataService
{
    public class SaraDataService : SaraIDataService
    {


        private readonly ChefProjectContext _db;

        public SaraDataService(ChefProjectContext db)
        {
            _db = db;
        }

        public List<Service> getAllServices()
        {

            var services = _db.Services.ToList();
            return services;
        }



        public bool AddService(ServiceDTO service)
        {
            var obj = new Service
            {
                Name = service.Name,
                Description = service.Description,
                ImageUrl = service.ImageUrl,
            };

            _db.Services.Add(obj);
            _db.SaveChanges();
            return true;
        }

        public bool updateService(int id, ServiceDTO serviceData)
        {
            var existService = _db.Services.Find(id);

            if (existService == null)
                return false;

            existService.Name = serviceData.Name;
            existService.Description = serviceData.Description;

            if (!string.IsNullOrEmpty(serviceData.ImageUrl))
            {
                existService.ImageUrl = serviceData.ImageUrl;
            }

            _db.SaveChanges();
            return true;
        }



        public bool DeleteService(int id, out string errorMessage)
        {
            var service = _db.Services.Find(id);
            errorMessage = string.Empty;



            if (service != null)
            {
                // تحقق إذا فيه حجز أو علاقة تربطه مع جداول أخرى
                bool isRelated = _db.Bookings.Any(b => b.ServiceId == id); // أو أي جدول عنده FK للخدمة

                if (isRelated)
                {
                    errorMessage = "Cannot delete this service because it's linked to existing bookings.";
                    return false;
                }

                _db.Services.Remove(service);
                _db.SaveChanges();
                return true;
            }

            errorMessage = "Service not found.";
            return false;


        }



        public List<BookingDTO> GetAllBookings()
        {
            var bookings = _db.Bookings.Select(b => new BookingDTO
            {
                Id = b.Id,
                UserName = b.User.FullName,
                ChefName = b.Chef.FullName,
                FoodName = b.Food.Name,
                ServiceName = b.Service.Name,
                NumberOfGuests = b.NumberOfGuests ?? 0,
                BookingDate = b.BookingDate.ToDateTime(TimeOnly.MinValue),
                TimeSlot = b.TimeSlot,
                Status = b.Status
            }).ToList();

            return bookings;
        }

        public bool AcceptBooking(int bookingId)
        {
            var booking = _db.Bookings.FirstOrDefault(b => b.Id == bookingId);
            if (booking == null) return false;

            booking.Status = "Accepted";
            
            // Also update the payment status for this booking
            var payment = _db.Payments.FirstOrDefault(p => p.BookingId == bookingId);
            if (payment != null)
            {
                payment.PaymentStatus = "Completed";
            }
            
            _db.SaveChanges();
            return true;
        }


        // payment

        public List<PaymentDTO> GetAllPayments()
        {
            var payments = _db.Payments
                .Include(p => p.Booking)
                    .ThenInclude(b => b.User)
                .Include(p => p.Booking.Service) // ✅ إضافة الربط بالخدمة
                .Select(p => new PaymentDTO
                {
                    Id = p.Id,
                    UserName = p.Booking.User.FullName,
                    Amount = p.Amount,
                    PaymentMethod = p.PaymentMethod,
                    Status = p.PaymentStatus,
                    PaymentDate = p.PaymentDate,
                    ServiceName = p.Booking.Service.Name // ✅ إضافة اسم الخدمة
                }).ToList();

            return payments;
        }



        public bool AddContactMessage(ContactUsDTO contact)
        {
            var message = new ContactU
            {
                FullName = contact.FullName,
                Email = contact.Email,
                Message = contact.Message,
                SubmittedAt = DateTime.Now
            };

            _db.ContactUs.Add(message);
            _db.SaveChanges();
            return true;
        }

        public List<ContactUsDTO> GetAllContactMessages()
        {
            return _db.ContactUs
                .Select(m => new ContactUsDTO
                {
                    FullName = m.FullName,
                    Email = m.Email,
                    Message = m.Message,
                    SubmittedAt = m.SubmittedAt
                }).ToList();
        }

        //feedback

        public bool AddFeedback(FeedbackDto feedback)
        {
            if (feedback.Rating < 1 || feedback.Rating > 5)
            {

                Console.WriteLine("Invalid rating value. Must be between 1 and 5.");
                return false;
            }

            var fb = new Feedback
            {
                BookingId = feedback.BookingId,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
                SubmittedAt = DateTime.Now // أو feedback.SubmittedAt
            };

            _db.Feedbacks.Add(fb);
            _db.SaveChanges();
            return true;
        }



        public List<FeedbackDto> GetAllFeedbacks()
        {
            var feedbacks = _db.Feedbacks
                .Include(f => f.Booking) // تضمين الحجز
                    .ThenInclude(b => b.User)  // الوصول إلى المستخدم عبر الحجز
                .Include(f => f.Booking) // تضمين الحجز مرة أخرى ولكن بدون تكرار
                    .ThenInclude(b => b.Chef)  // الوصول إلى الشيف عبر الحجز
                .Include(f => f.Booking) // تضمين الحجز مرة ثالثة ولكن بدون تكرار
            .ThenInclude(b => b.Food)  // الوصول إلى الطعام عبر الحجز
                .Select(f => new FeedbackDto
                {
                    BookingId = f.BookingId,
                    Rating = f.Rating,
                    Comment = f.Comment,
                    SubmittedAt = f.SubmittedAt ?? DateTime.Now, // إذا كان التوقيت فارغًا
                    UserName = f.Booking.User.FullName, // اسم المستخدم
                    ChefName = f.Booking.Chef.FullName, // اسم الشيف
                    FoodName = f.Booking.Food.Name // اسم الطعام
                })
                .ToList();



            return feedbacks;
        }




    }
}

