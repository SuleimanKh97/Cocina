using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SondosIDataService
    {


        public User getUserById(int id);
        public List<User> GetAll();

        public bool UpdateProfile(int id,  EditProfile Dto);
        public void ChangePassword(int id,  changePassword Dto);

        public List<BookingHistoryDto> GetUserBookingHistory(int userId);


    }
}
