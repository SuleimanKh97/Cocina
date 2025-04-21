using TasteItInYourHome.Server.Dtos;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SaraIDataService
    {
        public List<Service> getAllServices();

        public bool AddService(ServiceDTO service);

        public bool updateService(int id, ServiceDTO serviceData);

        public bool DeleteService(int id, out string errorMessage);

        public List<BookingDTO> GetAllBookings();
        public bool AcceptBooking(int bookingId);

        public List<PaymentDTO> GetAllPayments();

        public bool AddContactMessage(ContactUsDTO contact);
        public List<ContactUsDTO> GetAllContactMessages();
        public List<FeedbackDto> GetAllFeedbacks();

        public bool AddFeedback(FeedbackDto feedback);







    }
}

