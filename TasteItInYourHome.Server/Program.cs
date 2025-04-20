using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DataService;
using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ChefProjectContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DESKTOP-057PR2N")));


builder.Services.AddScoped<SuleimanIDataService, SuleimanDataService>();
builder.Services.AddScoped<SondosIDataService, SondosDataService>();
builder.Services.AddScoped<SofyanIDataService, SofyanDataService>();
builder.Services.AddScoped<SaraIDataService, SaraDataService>();
builder.Services.AddScoped<SallyIDataService, SallyDataService>();
builder.Services.AddScoped<SajedaIDataService, SajedaDataService>();
builder.Services.AddScoped<AmmarIDataService, AmmarDataService>();




var app = builder.Build();
app.UseCors("AllowAllOrigins");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
