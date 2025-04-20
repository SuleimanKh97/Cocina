using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface AmmarIDataService
    {

        public List<User> GetUsers();


        /// ///////////////////////////////////////

        public List<Chef> GetChefs();
        public bool DeleteChef(int id);
        public bool AddChef(ChefRequestDTO dto);
        public bool EditChef(int id, ChefRequestDTO dto);

        /// ////////////////////////////////////////////////

        public List<Food> GetFoods();
        public bool DeleteFood(int id);
        public bool AddFood(FoodRequestDTO dto);

        public bool EditFood(int id, FoodRequestDTO dto);
       
        /// ///////////////////////////////////////////////
      
        public List<FoodCategory> GetALlCategory();
        public bool DeleteCategory(int id);

        public bool AddCategory(CategoryFoodRequestDTO dto);

        public bool EditCategory(int id, CategoryFoodRequestDTO dto);

    }
}
