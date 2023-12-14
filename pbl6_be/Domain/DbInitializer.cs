using pbl6_be.Common.Utilities;
using pbl6_be.Common;
using pbl6_be.Domain;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    public class DbInitializer
    {
        public static void AddDefaultData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role(){ Id = 1, Name = "Admin", Description = ""});
            modelBuilder.Entity<Role>().HasData(new Role() { Id = 2, Name = "Staff", Description = "" });
            modelBuilder.Entity<Role>().HasData(new Role() { Id = 3, Name = "User", Description = "" });

            User user1 = new User()
            { 
                Id = 1,
                DisplayName = Constants.ADMIN_USERNAME,
                Email = Constants.ADMIN_EMAIL,
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                AccountStatus = pbl6_be.Common.Enum.AccountStatus.EmailConfirmed,
                CreatedAt = new DateTime(2022, 01, 01),
                UpdatedAt = new DateTime(2022, 01, 01),
                Address = "134-0091",
                PhoneNumber = "123456",
                FirstName = "",
                LastName = "",
                RoleId = 1,
                FullName = "Test"
            };

            User user2 = new User()
            {
                Id = 2,
                DisplayName = "staff_01",
                Email = "staff01@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                AccountStatus = pbl6_be.Common.Enum.AccountStatus.EmailConfirmed,
                CreatedAt = new DateTime(2022, 01, 01),
                UpdatedAt = new DateTime(2022, 01, 01),
                Address = "134-0091",
                PhoneNumber = "123456",
                FirstName = "",
                LastName = "",
                RoleId = 2,
                FullName = "Test"
            };

            User user3 = new User()
            {
                Id = 3,
                DisplayName = "user_01",
                Email = "user01@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                AccountStatus = pbl6_be.Common.Enum.AccountStatus.EmailConfirmed,
                CreatedAt = new DateTime(2022, 01, 01),
                UpdatedAt = new DateTime(2022, 01, 01),
                Address = "134-0091",
                PhoneNumber = "123456",
                FirstName = "",
                LastName = "",
                RoleId = 3,
                FullName = "Test"
            };

            modelBuilder.Entity<User>().HasData(user1);
            modelBuilder.Entity<User>().HasData(user2);
            modelBuilder.Entity<User>().HasData(user3);
        }
    }
}