using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.Dtos;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SondosIDataService
    {
        public bool AddFeedback( FeedbackDto dto);


        public List<Booking> BookingHistory(int UserId);

        public User getUserById(int id);
        public List<User> GetAll();

        //public bool UpdateProfile(int id,  EditProfileWithImageDto Dto);
        Task<bool> UpdateProfileAsync(int id, EditProfileWithImageDto dto);

        public void ChangePassword(int id,  changePassword Dto);

        public List<BookingHistoryDto> GetUserBookingHistory(int userId);


    }
}
