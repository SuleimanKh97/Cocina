using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;


namespace TasteItInYourHome.Server.DataService
{
    public class AmmarDataService : AmmarIDataService
    {
        private readonly ChefProjectContext _context;
        public AmmarDataService(ChefProjectContext context)
        {
            _context = context;
        }



        public List<User> GetUsers()
        {
            var users = _context.Users.ToList();
            return users;
        }

        ////////////////////////////////////////////////

        public List<Chef> GetChefs()
        {
            var chefs = _context.Chefs.ToList();
            return chefs;
        }



        public bool DeleteChef(int id)
        {
            var chef = _context.Chefs.FirstOrDefault(c => c.Id == id);
            if (chef == null)
                return false;

            _context.Chefs.Remove(chef);
            _context.SaveChanges(); 
            return true;
        }


        public bool AddChef(ChefRequestDTO dto)
        {
            var chef = new Chef
            {
                FullName = dto.FullName,
                Bio = dto.Bio,
                ExperienceYears = dto.ExperienceYears ?? 0,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                AvailabilitySchedule = dto.AvailabilitySchedule,
                ImageUrl = dto.ImageUrl,
                CreatedAt = DateTime.Now
            };

            _context.Chefs.Add(chef);
            _context.SaveChanges();
            return true;
        }

        public bool EditChef(int id, ChefRequestDTO chef)
        {

            var existchef = _context.Chefs.Find(id);

            if (existchef == null)
                return false;
            else
            {
                existchef.FullName = chef.FullName;
                existchef.Bio = chef.Bio;
                existchef.ExperienceYears = chef.ExperienceYears;
                existchef.Email = chef.Email;
                existchef.PhoneNumber = chef.PhoneNumber;
                existchef.AvailabilitySchedule = chef.AvailabilitySchedule;
                existchef.ImageUrl = chef.ImageUrl;



                _context.SaveChanges();
                return true;
            }

        }
        public List<Food> GetFoods()
        {
            var foods = _context.Foods.ToList();
            return foods;
        }

        public bool DeleteFood(int id)
        {
            var food = _context.Foods.FirstOrDefault(c => c.Id == id);
            if (food == null)
                return false;
            _context.Foods.Remove(food);
            _context.SaveChanges();
            return true;

        }


        


        public bool AddFood(FoodRequestDTO dto)
        {
            var food = new Food
            {
                Name = dto.Name,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                Price = dto.Price,
                CategoryId = dto.CategoryId ?? 0,
                ChefId = dto.ChefId ?? 0
            };
            _context.Foods.Add(food);
            _context.SaveChanges();
            return true;
        }

        public bool EditFood(int id, FoodRequestDTO food)
        {

            var existfood = _context.Foods.Find(id);

            if (existfood == null)
                return false;
            else
            {
                existfood.Name = food.Name;
                existfood.Description = food.Description;
                existfood.ImageUrl = food.ImageUrl;
                existfood.Price = food.Price;
                existfood.CategoryId = food.CategoryId;
                existfood.ChefId = food.ChefId;

                _context.SaveChanges();
                return true;
            }

        }
        

        //////////////////////////////////////////
        public List<FoodCategory> GetALlCategory()
        {
            var category = _context.FoodCategories.ToList();
            return category;
        }

        public bool DeleteCategory(int id)
        {
            var categoryToDelete = _context.FoodCategories.FirstOrDefault(c => c.Id == id);
            if (categoryToDelete == null)
                return false;
            _context.FoodCategories.Remove(categoryToDelete);
            _context.SaveChanges();
            return true;


        }

       


        public bool AddCategory(CategoryFoodRequestDTO dto)
        {
            var category = new FoodCategory
            {
                Name = dto.Name,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl
            };
            _context.FoodCategories.Add(category);
            _context.SaveChanges();
            return true;
        }


        public bool EditCategory(int id, CategoryFoodRequestDTO category)
        {
            var existcategory = _context.FoodCategories.Find(id);
            if (existcategory == null)
                return false;
            else
            {
                existcategory.Name = category.Name;
                existcategory.Description = category.Description;
                existcategory.ImageUrl = category.ImageUrl;
                _context.SaveChanges();
                return true;
            }
        }


    }
}
