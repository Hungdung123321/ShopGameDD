using System.Text.Json.Serialization;
using ShopGameDD.Context;
using ShopGameDD.Models;
using ShopGameDD.Options;
using ShopGameDD.Repositories.bundle;
using ShopGameDD.Repositories.cart;
using ShopGameDD.Repositories.developerandpublisher;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.genre;
using ShopGameDD.Repositories.user;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ShopGameDD.Repositories.jwt;
using Microsoft.OpenApi.Models;
using ShopGameDD.Repositories.cloudinary;
using ShopGameDD.Repositories.game_purchased;
using ShopGameDD.Repositories.order;
using ShopGameDD.Repositories.order_detail;


var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection(nameof(MongoSettings)));
builder.Services.AddScoped<IMongoDbContext,MongoDbContext>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IDAPRepository,DAPRepository>();
builder.Services.AddScoped<IGenreRepository,GenreRepository>();
builder.Services.AddScoped<ICartRepository,CartRepository>();
builder.Services.AddScoped<IBundleRepository,BundleRepository>();
builder.Services.AddScoped<IGameRepository,GameRepository>();
builder.Services.AddScoped<IOrderRepository,OrderRepository>();
builder.Services.AddScoped<IGPRepository,GPRepository>();
builder.Services.AddScoped<IPaymentRepository,PaymentRepository>();
builder.Services.AddScoped<IjwtRepository,jwtRepository>();
builder.Services.AddScoped<ICloudinaryRepository,CloudinaryRepository>();



builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()  
                            .AllowAnyMethod();  
                      });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Set the JsonSerializer to ignore null values
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = jwtRepository.Issuer,
            ValidAudience = jwtRepository.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtRepository.SecretKey))
        };
    });

builder.Services.AddAuthorization();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
