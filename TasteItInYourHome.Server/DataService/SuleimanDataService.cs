using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.DataService
{
    public class SuleimanDataService : SuleimanIDataService
    {
        private readonly ChefProjectContext _db;
        public SuleimanDataService(ChefProjectContext db)
        {
            _db = db;
        }
        public List<Service> getAllServices()
        {
            return _db.Services.ToList();
        }

        public bool newContact(ContactUsRequest contact)
        {
            if (contact == null) 
            {
                return false;
            }
            var contactForm = new ContactU();
            contactForm.FullName = contact.FullName;
            contactForm.Email = contact.Email;
            contactForm.Message = contact.Message;
            contactForm.SubmittedAt = DateTime.Now;
            _db.ContactUs.Add(contactForm);
            _db.SaveChanges();
            return true;
        }

    }
}
