using System.ComponentModel;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NSwag;
using NSwag.Generation.Processors.Security;
using pbl6_be.Api.IOC;
using pbl6_be.Api.Mapper;
using pbl6_be.Api.Middlewares;
using pbl6_be.Domain;
using pbl6_be.Domain.ModelSetting;
using pbl6_be.Domain.ModelSettings;
using pbl6_be.Hubs;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddDbContext<Context>(options =>
    options.UseMySQL(builder.Configuration["ConnectionStrings:Default"]));

builder.Services.AddControllers()
     .AddNewtonsoftJson(
          options => {
           options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
      });
      
// builder.Services.AddControllers(config =>
// {
//     // config settings
// }).AddJsonOptions(x =>
// {
//     // use the above date time converter
//     x.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
// });

DependencyContainer.RegisterServices(builder.Services);
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocument(config =>
{
    config.PostProcess = document =>
    {
        document.Info.Version = "v1";
        document.Info.Title = "";
        document.Info.Description = "";
        document.Info.TermsOfService = "None";
        document.Info.Contact = new OpenApiContact
        {
            Name = "",
            Email = string.Empty,
            Url = ""
        };

    };
    config.AddSecurity("Bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Authorization",
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Type into the textbox: {your JWT token}."
    });

    config.OperationProcessors.Add(
        new AspNetCoreOperationSecurityScopeProcessor("Bearer"));
});

// builder.WebHost.UseUrls("https://localhost:5005");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSetOrigins", builder =>
    {
        builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
builder.Services.Configure<TokenSettings>(builder.Configuration.GetSection("TokenSettings"));
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
builder.Services.Configure<VnPaySetting>(builder.Configuration.GetSection("Vnpay"));

builder.Services.AddSignalR();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    var Key = Encoding.UTF8.GetBytes(builder.Configuration["TokenSettings:key"]);

    option.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["TokenSettings:Issuer"],
        ValidAudience = builder.Configuration["TokenSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Key)
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseMiddleware<JwtMiddleware>();
app.UseOpenApi();
app.UseSwaggerUi3();
app.UseHttpsRedirection();
app.UseCors("AllowSetOrigins");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<OrderHub>("/order-hub");
app.Run();
