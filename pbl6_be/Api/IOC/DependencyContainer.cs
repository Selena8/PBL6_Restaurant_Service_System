using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Services;
using pbl6_be.Services.Authentication;
using pbl6_be.Services.TokenService;

namespace pbl6_be.Api.IOC
{
    public class DependencyContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton<ITokenService, TokenService>();
            services.AddSingleton<IMailService, MailService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IFoodService, FoodService>();
            services.AddSingleton<IUploadFileService, UploadFileService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<IStaffService,StaffService>();
            services.AddScoped<IOrderService,OrderService>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<IShiftService, ShiftService>();
            services.AddScoped<IMapService, MapService>();
            services.AddScoped<ITableService, TableService>();
            services.AddScoped<IStatisticsService,StatisticsService>();
            services.AddScoped<IVnPayService,VnPayService>();
        }
    }
}
