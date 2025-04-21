using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.Dtos;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;

namespace TasteItInYourHome.Server.Controllers.Sara
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sara : ControllerBase
    {
        private readonly SaraIDataService _data;
        public Sara(SaraIDataService data)
        {
            _data = data;
        }

        [HttpGet("getService")]
        public ActionResult getService()
        {
            var servive = _data.getAllServices();
            return Ok(servive);
        }


        [HttpPost("AddService")]
        public ActionResult AddService([FromForm] ServiceDTO serviceData, IFormFile? image)
        {
            // التأكد من وجود بيانات الخدمة
            if (serviceData == null)
                return BadRequest();

            // التحقق من الصورة المرفقة
            if (image != null)
            {
                // حفظ الصورة في المسار الذي تريده على السيرفر
                var imagePath = Path.Combine("path_to_save", image.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                // تحديث ImageUrl في ServiceDTO مع المسار الجديد للصورة
                serviceData.ImageUrl = imagePath;
            }

            // إضافة الخدمة إلى قاعدة البيانات
            bool added = _data.AddService(serviceData);

            if (!added)
                return BadRequest();

            return Ok();
        }


        [HttpPut("UpdateService/{id}")]
        public IActionResult UpdateService(int id, [FromForm] ServiceDTO serviceDto)
        {
            Console.WriteLine($"Name: {serviceDto.Name}");
            Console.WriteLine($"Description: {serviceDto.Description}");

            if (string.IsNullOrEmpty(serviceDto.Name) || string.IsNullOrEmpty(serviceDto.Description))
                return BadRequest("Name and Description are required");



            _data.updateService(id, serviceDto);
            return Ok();
        }



        [HttpDelete("deleteService/{id}")]
        public IActionResult DeleteService(int id)
        {
            string errorMessage;
            bool result = _data.DeleteService(id, out errorMessage);

            if (!result)
            {
                return BadRequest(errorMessage); // أو ممكن تستخدم StatusCode(409, errorMessage) إذا بدك تعبر عن تعارض
            }

            return Ok();
        }


        /// Booking

        [HttpGet("getBookings")]
        public IActionResult GetBookings()
        {
            var bookings = _data.GetAllBookings();
            return Ok(bookings);
        }

        [HttpPut("updateBookings/{id}")]
        public IActionResult AcceptBooking(int id)
        {
            bool accepted = _data.AcceptBooking(id);
            if (!accepted) return NotFound("Booking not found.");
            return Ok();
        }


        [HttpGet("getPayments")]
        public IActionResult GetPayments()
        {
            var payments = _data.GetAllPayments();
            return Ok(payments);
        }

        //[HttpGet("getPayments")]
        //public IActionResult GetPayments()
        //{
        //    var payments = _data.GetAllPayments()
        //        .Include(p => p.Booking)
        //            .ThenInclude(b => b.Service)
        //        .Select(p => new PaymentDTO
        //        {
        //            Id = p.Id,
        //            Amount = p.Amount,
        //            PaymentStatus = p.PaymentStatus,
        //            PaymentDate = p.PaymentDate,
        //            ServiceName = p.Booking.Service.Name
        //        })
        //        .ToList(); // بدون await

        //    return Ok(payments);
        //}

        // contact US


        [HttpPost("addMessage")]
        public IActionResult PostMessage([FromBody] ContactUsDTO contact)
        {
            var result = _data.AddContactMessage(contact);
            return result ? Ok("Message sent!") : BadRequest("Failed to send message.");
        }

        [HttpGet("getMessage")]
        public IActionResult GetMessages()
        {
            var messages = _data.GetAllContactMessages();
            return Ok(messages);
        }


        // Feedback

        [HttpGet("getFeedback")]
        public IActionResult GetAllFeedbacks()
        {
            var feedbacks = _data.GetAllFeedbacks();
            return Ok(feedbacks);
        }

        // POST: api/Feedback
        [HttpPost("addFeedback")]
        public IActionResult AddFeedback([FromBody] FeedbackDto feedback)
        {
            var result = _data.AddFeedback(feedback);
            if (!result)
            {
                return BadRequest("Rating must be between 1 and 5.");
            }

            return Ok("Feedback has been successfully added.");
        }

    }

}

