using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;

namespace Domain
{
    public class ModelCreating
    {
        public static ModelBuilder OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Role>()
                .HasMany(e => e.Users)
                .WithOne(e => e.Role)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<User>(entity => {
                entity.HasMany(e => e.WorkLogs)
                    .WithOne(e => e.User)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.Requests)
                    .WithOne(e => e.UserHandled)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.Foods)
                    .WithOne(e => e.User)
                    .HasForeignKey(e => e.CreatedUserId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(e => e.Role)
                    .WithMany(e => e.Users)
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.NoAction);
            });
                
            
            builder.Entity<Shift>(entity => {
                entity.HasOne(e => e.User)
                    .WithMany(e => e.Shifts)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.NoAction);
            });                

            builder.Entity<Category>()
                .HasMany(e => e.Foods)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Food>( entity => 
            {
                entity.HasMany(e => e.IngredientsOfFoods)
                    .WithOne(e => e.Food)
                    .HasForeignKey(e => e.FoodId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.FoodMakingProcesses)
                    .WithOne(e => e.Food)
                    .HasForeignKey(e => e.FoodId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.OrderDetails)
                    .WithOne(e => e.Food)
                    .HasForeignKey(e => e.FoodId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Order>(entity => {
                entity.HasMany(e => e.OrderDetails)
                    .WithOne(e => e.Order)
                    .HasForeignKey(e => e.OrderId)
                    .OnDelete(DeleteBehavior.ClientCascade);

                entity.HasMany(e => e.Payments)
                    .WithOne(e  => e.Order)
                    .HasForeignKey(e => e.OrderId)
                    .OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(e => e.Table)
                .WithMany(e => e.Orders)
                .OnDelete(DeleteBehavior.NoAction);
            });


            builder.Entity<Request>(e =>
            {
                e.HasOne(e => e.Table)
                .WithMany(e => e.Requests)
                .HasForeignKey(e => e.TableId)
                .OnDelete(DeleteBehavior.ClientCascade);
            });

            builder.Entity<Table>(e =>
            {
                e.HasMany(e => e.Bookings)
                .WithOne(e => e.Table)
                .HasForeignKey(e => e.TableId)
                .OnDelete(DeleteBehavior.ClientCascade);
            });

             builder.Entity<RequestToChangeWorklog>(e =>
            {
                e.HasOne(e => e.Shift)
                .WithMany(e => e.Requests)
                .HasForeignKey(e => e.ShiftId)
                .OnDelete(DeleteBehavior.NoAction);
            });

            return builder;
        }
    }
}