using Cyberbit.TaskManager.Server.Models;
using Cyberbit.TaskManager.Server.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;

namespace Cyberbit.TaskManager.Server.Dal
{
    public class BackendDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Category> Categories { get; set; }

        public BackendDbContext(DbContextOptions<BackendDbContext> options)
        : base(options)
        {

        }

        #region FluentAPI
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(new EnumToStringConverter<UserRole>());


            modelBuilder.Entity<Task>()
                .HasOne(t => t.CreatedByUser)
                .WithMany(u => u.CreatedByTasks)
                .HasForeignKey(f => f.CreatedByUserId);
            
            modelBuilder.Entity<Task>()
                .Property(t => t.Status)
                .HasConversion(new EnumToStringConverter<TasksStatus>());            
        }
        #endregion

        public void SeedMockData()
        {
            Users.Add(new User
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "the best",
                Email = "admin_1@cyberbit.com",
                Role = UserRole.Manager,
                Password = "1234",
                CreateTime = DateTime.Now
            });

            Users.Add(new User
                {
                    Id = 2,
                    FirstName = "ido",
                    LastName = "greenberg",
                    Email = "ido.greenberg@cyberbit.com",
                    Role = UserRole.Employee,
                    Password = "1234",
                    CreateTime = DateTime.Now
                });
            for (int i = 2; i < 6; i++)
            {
                Users.Add(new User
                {
                    Id = i +1,
                    FirstName = "Employee",
                    LastName = "i.ToString()",
                    Email = $"employee_{i}@cyberbit.com",
                    Role = UserRole.Employee,
                    Password = "1234",
                    CreateTime = DateTime.Now
                });
            }

            var category1 = new Category
            {
                Name = "South Africa"
            };
            Categories.Add(category1);

            var category2 = new Category
            {
                Name = "Western Virginia"
            };
            Categories.Add(category2);

            var category3 = new Category
            {
                Name = "Tel Aviv"
            };
            Categories.Add(category3);

            var category4 = new Category
            {
                Name = "North Carolina"
            };

            var category5 = new Category
            {
                Name = "Papua New Guinea"
            };
            Categories.Add(category5);

            var category6 = new Category
            {
                Name = "Am Israel Chai"
            };
            Categories.Add(category6);
            SaveChanges();

            Tasks.Add(new Task
            {
                CreatedByUserId = 1,
                CreationTime = DateTime.Now,
                Description = "Fix all bugs",
                DueDate = DateTime.Now.AddDays(7),
                Title = "Bugs",
                UserId = 2,
                Status = TasksStatus.Open,
                Categories = new List<Category> { category6 }
            });

            Tasks.Add(new Task
            {
                CreatedByUserId = 1,
                CreationTime = DateTime.Now.AddDays(-1).AddHours(1).AddMinutes(-13),
                Description = "Test1",
                DueDate = DateTime.Now.AddDays(2),
                Title = "High priority",
                UserId = 1,
                Status = TasksStatus.Open,
                Categories = new List<Category> { category5 }
            });

            Tasks.Add(new Task
            {
                CreatedByUserId = 1,
                CreationTime = DateTime.Now.AddDays(-2).AddHours(-4).AddMinutes(27),
                Description = "In the heart of the bustling city, the ancient cathedral stood as a timeless sentinel, its towering spires reaching toward the heavens, casting long shadows over the cobblestone streets below, where generations of people had walked, lived, and loved. The intricate stained glass windows, with their vivid hues and elaborate designs, told stories of old, filtering the sunlight into a kaleidoscope of colors.",
                DueDate = DateTime.Now.AddDays(30),
                Title = "The mesmerizing grandeur of the Milky Way galaxy, with its vast expanse of stars, planets, and other celestial bodies.",
                UserId = 1,
                Status = TasksStatus.Open,
                Categories = new List<Category> { category1, category4, category2, category3 }
            });
            SaveChanges();
        }
    }
}
