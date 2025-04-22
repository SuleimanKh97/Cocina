using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.Models;
using BCrypt.Net;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Dtos;

namespace TasteItInYourHome.Server.Controllers.Sondos
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sondos : ControllerBase
    {
        private readonly IDataService.SondosIDataService _data;

        public Sondos(IDataService.SondosIDataService data)
        {
            _data = data;
        }

        [HttpGet("AllUser")]
        public IActionResult GetAll()
        {
            var all = _data.GetAll();
            return Ok(all);
        }

        [HttpGet("GetProfile/{id}")]

        public IActionResult getUserById(int id)
        {
            var user = _data.getUserById(id);
            if (user == null)
                return NotFound("User not found");
            return Ok(user);
        }

        //[HttpGet("BookingHistory/{userId}")]
        //public IActionResult GetUserBookingHistory(int userId)
        //{
        //    var bookingHistory = _data.GetUserBookingHistory(userId);
        //    var user = _data.getUserById(userId);
        //    if (user == null)
        //    {
        //        return NotFound("User not found");
        //    }
        //    else
        //    {

        //        if (bookingHistory == null || !bookingHistory.Any())
        //        {
        //            return NotFound("No booking for this User");
        //        }

        //        return Ok(bookingHistory);
        //    }


        //}

        [HttpGet("BookingHistory/{UserId}")]
        public IActionResult BookingHistory(int UserId)
        {
            var bookings = _data.BookingHistory(UserId);
               

            return Ok(bookings);
        }



        [HttpPost("AddFeedback")]
        public IActionResult AddFeedback([FromBody] FeedbackDto dto)
        {
            Console.WriteLine("========== RECIBIDA SOLICITUD DE ADICIÓN DE FEEDBACK ==========");
            Console.WriteLine($"Booking ID: {dto?.BookingId}");
            Console.WriteLine($"Rating: {dto?.Rating}");
            Console.WriteLine($"Comment: {dto?.Comment}");
            
            if (dto == null || !dto.BookingId.HasValue)
            {
                return BadRequest("Invalid data: BookingId is required.");
            }

            // Verificar primero si ya existe feedback
            var existingFeedback = _data.GetFeedbackByBookingId(dto.BookingId.Value);
            if (existingFeedback != null)
            {
                Console.WriteLine($"Feedback ya existe para booking ID {dto.BookingId.Value}");
                return BadRequest(new { message = "Feedback already submitted for this booking." });
            }

            // Verificar el booking y su estado
            var booking = _data.GetBookingById(dto.BookingId.Value);
            if (booking == null)
            {
                Console.WriteLine($"Booking ID {dto.BookingId.Value} no encontrado");
                return NotFound(new { message = "Booking not found." });
            }

            // Mostrar información detallada del estado para depuración
            Console.WriteLine($"Estado del booking: '{booking.Status}'");
            Console.WriteLine($"Longitud del estado: {booking.Status?.Length ?? 0}");
            Console.WriteLine($"Comparación directa con 'Completed': {booking.Status == "Completed"}");
            
            // Normalizar el estado para comparación segura
            string normalizedStatus = (booking.Status ?? "").Trim();
            Console.WriteLine($"Estado normalizado (Trim): '{normalizedStatus}'");
            
            // Prueba con StringComparison.OrdinalIgnoreCase
            bool completedIgnoreCase = string.Equals(normalizedStatus, "Completed", StringComparison.OrdinalIgnoreCase);
            bool acceptedIgnoreCase = string.Equals(normalizedStatus, "Accepted", StringComparison.OrdinalIgnoreCase);
            Console.WriteLine($"Completed (IgnoreCase): {completedIgnoreCase}");
            Console.WriteLine($"Accepted (IgnoreCase): {acceptedIgnoreCase}");

            // Verificar estado con múltiples métodos
            bool isStatusValid = 
                booking.Status == "Completed" || 
                booking.Status == "Accepted" ||
                (booking.Status != null && 
                 (booking.Status.ToLower().Trim() == "completed" || 
                  booking.Status.ToLower().Trim() == "accepted" ||
                  completedIgnoreCase || 
                  acceptedIgnoreCase));

            if (!isStatusValid)
            {
                Console.WriteLine($"Estado inválido: '{booking.Status}'");
                return BadRequest(new { 
                    message = "Feedback can only be submitted for bookings with status 'Completed' or 'Accepted'.",
                    currentStatus = booking.Status
                });
            }

            var check = _data.AddFeedback(dto);
            if (check) 
            { 
                return Ok(new { message = "Feedback added successfully!" });
            }
            else 
            {
                return BadRequest(new { message = "Unable to add feedback. Please try again." });
            }
        }

        [HttpGet("DiagnoseBooking/{bookingId}")]
        public IActionResult DiagnoseBooking(int bookingId)
        {
            Console.WriteLine($"Diagnóstico solicitado para booking ID: {bookingId}");
            
            // Verificar si existe el booking
            var booking = _data.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" });
            }
            
            // Verificar si existe feedback
            var feedback = _data.GetFeedbackByBookingId(bookingId);
            
            // Analizar caracteres del estado para detectar problemas ocultos
            string statusHex = "";
            if (booking.Status != null)
            {
                foreach (var b in System.Text.Encoding.UTF8.GetBytes(booking.Status))
                {
                    statusHex += $"{b:X2} ";
                }
            }
            
            // Normalizar y comparar el estado para las validaciones
            string normalizedStatus = (booking.Status ?? "").Trim();
            bool isCompletedStatus = string.Equals(normalizedStatus, "Completed", StringComparison.OrdinalIgnoreCase);
            bool isAcceptedStatus = string.Equals(normalizedStatus, "Accepted", StringComparison.OrdinalIgnoreCase);
            bool isValidForFeedback = isCompletedStatus || isAcceptedStatus;
            
            // Responder con toda la información diagnóstica
            return Ok(new 
            { 
                bookingId = booking.Id,
                status = booking.Status,
                statusLength = booking.Status?.Length ?? 0,
                statusHex = statusHex,
                normalizedStatus = normalizedStatus,
                isCompletedStatus = isCompletedStatus,
                isAcceptedStatus = isAcceptedStatus,
                isValidForFeedback = isValidForFeedback,
                feedbackExists = feedback != null,
                feedbackId = feedback?.Id,
                feedbackRating = feedback?.Rating,
                feedbackComment = feedback?.Comment,
                feedbackSubmittedAt = feedback?.SubmittedAt,
                userId = booking.UserId,
                chefId = booking.ChefId,
                bookingDate = booking.BookingDate,
                timeSlot = booking.TimeSlot,
                createdAt = booking.CreatedAt
            });
        }

        //[HttpPut("UpdateProfile/{id}")]
        //public IActionResult UpdateProfile(int id, EditProfileWithImageDto Dto)
        //{
        //    if (Dto == null)
        //    {
        //        return BadRequest();
        //    }

        //    var user = _data.UpdateProfile(id, Dto);
        //    if (user ==true )
        //    {
        //        return Ok();
        //    }
        //    return NotFound();
        //}
        [HttpPut("UpdateProfile/{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromForm] EditProfileWithImageDto dto)
        {
            var success = await _data.UpdateProfileAsync(id, dto);
            if (success) return Ok();

            return NotFound();
        }




        [HttpPut("ChangePassword/{id}")]
        public IActionResult ChangePassword(int id, [FromBody] changePassword Dto)
        {
            if (Dto == null)
                return BadRequest();

            try
            {
                _data.ChangePassword(id, Dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("CheckFeedbackExists/{bookingId}")]
        public IActionResult CheckFeedbackExists(int bookingId)
        {
            if (bookingId <= 0)
            {
                return BadRequest(new { message = "Invalid booking ID." });
            }

            var feedback = _data.GetFeedbackByBookingId(bookingId);
            return Ok(new { 
                exists = feedback != null,
                message = feedback != null ? "Feedback already exists for this booking." : "No feedback exists for this booking." 
            });
        }

        [HttpGet("Debug/Booking/{bookingId}")]
        public IActionResult DebugBooking(int bookingId)
        {
            // Obtener el booking directamente del contexto
            var booking = _data.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound(new { message = $"Booking ID {bookingId} not found" });
            }

            // Verificar si hay feedback existente
            var feedback = _data.GetFeedbackByBookingId(bookingId);

            // Comprobar si el booking es elegible para feedback
            bool isStatusCompleted = booking.Status == "Completed";
            bool isStatusCompletedLower = booking.Status?.ToLower() == "completed";
            bool isStatusAccepted = booking.Status == "Accepted";
            bool isStatusAcceptedLower = booking.Status?.ToLower() == "accepted";
            bool isEligibleForFeedback = isStatusCompleted || isStatusCompletedLower || isStatusAccepted || isStatusAcceptedLower;

            return Ok(new
            {
                booking = new
                {
                    id = booking.Id,
                    status = booking.Status,
                    statusBytes = string.Join(" ", System.Text.Encoding.UTF8.GetBytes(booking.Status ?? "").Select(b => $"{b:X2}")),
                    userId = booking.UserId,
                    chefId = booking.ChefId,
                    bookingDate = booking.BookingDate,
                    isEligibleForFeedback,
                    statusChecks = new
                    {
                        isStatusCompleted,
                        isStatusCompletedLower,
                        isStatusAccepted,
                        isStatusAcceptedLower
                    }
                },
                feedbackExists = feedback != null,
                feedback = feedback != null ? new
                {
                    id = feedback.Id,
                    rating = feedback.Rating,
                    comment = feedback.Comment,
                    submittedAt = feedback.SubmittedAt
                } : null
            });
        }

        [HttpGet("CheckBookingStatus/{bookingId}")]
        public IActionResult CheckBookingStatus(int bookingId)
        {
            if (bookingId <= 0)
            {
                return BadRequest(new { message = "Invalid booking ID." });
            }

            var booking = _data.GetBookingById(bookingId);
            if (booking == null)
            {
                return NotFound(new { message = $"Booking with ID {bookingId} not found." });
            }

            // Recopilar información detallada sobre el estado
            var statusInfo = new
            {
                rawStatus = booking.Status,
                length = booking.Status?.Length ?? 0,
                bytes = booking.Status != null ? string.Join(" ", System.Text.Encoding.UTF8.GetBytes(booking.Status).Select(b => $"{b:X2}")) : null,
                trimmedStatus = booking.Status?.Trim(),
                lowerCaseStatus = booking.Status?.ToLower(),
                equalsCompleted = booking.Status == "Completed",
                equalsCompletedIgnoreCase = string.Equals(booking.Status, "Completed", StringComparison.OrdinalIgnoreCase),
                equalsAccepted = booking.Status == "Accepted",
                equalsAcceptedIgnoreCase = string.Equals(booking.Status, "Accepted", StringComparison.OrdinalIgnoreCase),
                isValidForFeedback = (booking.Status == "Completed" || 
                                     booking.Status == "Accepted" ||
                                     string.Equals(booking.Status, "Completed", StringComparison.OrdinalIgnoreCase) ||
                                     string.Equals(booking.Status, "Accepted", StringComparison.OrdinalIgnoreCase))
            };

            // También verificar si ya existe feedback
            var feedback = _data.GetFeedbackByBookingId(bookingId);
            var feedbackExists = feedback != null;

            return Ok(new
            {
                bookingId = booking.Id,
                userId = booking.UserId,
                chefId = booking.ChefId,
                bookingDate = booking.BookingDate,
                timeSlot = booking.TimeSlot,
                status = statusInfo,
                feedbackExists,
                feedback = feedbackExists ? new
                {
                    id = feedback.Id,
                    rating = feedback.Rating,
                    comment = feedback.Comment,
                    submittedAt = feedback.SubmittedAt
                } : null
            });
        }

        [HttpGet("TestAddFeedback/{bookingId}/{rating}/{comment}")]
        public IActionResult TestAddFeedback(int bookingId, int rating, string comment)
        {
            Console.WriteLine("========== TEST ADD FEEDBACK ==========");
            Console.WriteLine($"Booking ID: {bookingId}");
            Console.WriteLine($"Rating: {rating}");
            Console.WriteLine($"Comment: {comment}");
            
            // Crear el objeto DTO manualmente
            var feedbackDto = new FeedbackDto
            {
                BookingId = bookingId,
                Rating = rating,
                Comment = comment
            };
            
            try
            {
                // Intentar añadir el feedback y recoger cualquier error
                var feedback = _data.GetFeedbackByBookingId(bookingId);
                if (feedback != null)
                {
                    Console.WriteLine($"Error: Ya existe feedback para booking ID {bookingId}");
                    return BadRequest(new { 
                        success = false, 
                        message = "Feedback already exists for this booking.",
                        feedbackId = feedback.Id,
                        submittedAt = feedback.SubmittedAt
                    });
                }
                
                var booking = _data.GetBookingById(bookingId);
                if (booking == null)
                {
                    Console.WriteLine($"Error: No se encontró el booking ID {bookingId}");
                    return NotFound(new { success = false, message = "Booking not found." });
                }
                
                Console.WriteLine($"Estado del booking: '{booking.Status}'");
                
                // Normalize and check status
                string normalizedStatus = (booking.Status ?? "").Trim();
                bool isCompleted = string.Equals(normalizedStatus, "Completed", StringComparison.OrdinalIgnoreCase);
                bool isAccepted = string.Equals(normalizedStatus, "Accepted", StringComparison.OrdinalIgnoreCase);
                
                if (!isCompleted && !isAccepted)
                {
                    Console.WriteLine($"Error: Estado inválido '{booking.Status}' para añadir feedback");
                    return BadRequest(new { 
                        success = false, 
                        message = "Feedback can only be submitted for bookings with status 'Completed' or 'Accepted'.", 
                        currentStatus = booking.Status
                    });
                }
                
                // Intentar añadir el feedback
                var result = _data.AddFeedback(feedbackDto);
                if (result)
                {
                    Console.WriteLine("Feedback añadido correctamente");
                    return Ok(new { success = true, message = "Feedback added successfully!" });
                }
                else
                {
                    Console.WriteLine("Error al añadir feedback");
                    return BadRequest(new { success = false, message = "Unable to add feedback. Please try again." });
                }
            }
            catch (Exception ex)
            {
                // Registrar cualquier excepción para diagnóstico
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { success = false, message = "Internal server error", error = ex.Message });
            }
        }

    }
}
