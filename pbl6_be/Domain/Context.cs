using Domain;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common;
using pbl6_be.Common.Utilities;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;
using Object = pbl6_be.Domain.Models.Schemas.Object;

namespace pbl6_be.Domain
{
    public class Context : Microsoft.EntityFrameworkCore.DbContext
    {
        public Context(DbContextOptions options) :
            base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<FoodMakingProcess> FoodMakingProcesses { get; set; }
        public DbSet<IngredientsOfFood> IngredientsOfFoods { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Point> Points { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<WorkLog> WorkLogs { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Object> Objects {get; set;}
        public DbSet<RequestToChangeWorklog> requestToChangeWorklogs {get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            DbInitializer.AddDefaultData(modelBuilder);
            ModelCreating.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<Food>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<FoodMakingProcess>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<IngredientsOfFood>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<User>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<Shift>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<Request>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            modelBuilder.Entity<RequestToChangeWorklog>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
             modelBuilder.Entity<Table>().HasQueryFilter(c => !EF.Property<bool>(c, "IsDeleted"));
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            AddTimestamps();
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            AddTimestamps();
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync();
        }
        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries()
                .Where(x => x.Entity is BaseModel && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entity in entities)
            {
                var now = DateTimeOffset.Now;
                if (entity.State == EntityState.Added)
                {
                    ((BaseModel)entity.Entity).CreatedAt = now;
                    continue;
                }
                ((BaseModel)entity.Entity).UpdatedAt = now;
            }
        }
        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is BaseModel)
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            entry.CurrentValues["IsDeleted"] = false;
                            break;
                        case EntityState.Deleted:
                            entry.State = EntityState.Modified;
                            entry.CurrentValues["IsDeleted"] = true;
                            break;
                    }
            }
        }
    }
}
