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
    options.UseSqlServer(builder.Configuration.GetConnectionString("AMMAR")));


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

// Add a diagnostic endpoint just before app.Run()
app.MapGet("/api/DiagnoseBooking/{id}", (int id, ChefProjectContext db) =>
{
    var booking = db.Bookings.Find(id);
    if (booking == null)
        return Results.NotFound(new { Message = $"Booking with ID {id} not found" });
    
    var existingFeedback = db.Feedbacks.FirstOrDefault(f => f.BookingId == id);
    var feedbackExists = existingFeedback != null;
    
    return Results.Ok(new { 
        BookingId = booking.Id,
        Status = booking.Status,
        StatusLowerCase = booking.Status?.ToLower(),
        HasExistingFeedback = feedbackExists,
        FeedbackId = existingFeedback?.Id,
        IsCompleted = booking.Status?.ToLower() == "completed",
        IsAccepted = booking.Status?.ToLower() == "accepted"
    });
});

// Diagnóstico del booking específico
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ChefProjectContext>();
    var booking = context.Bookings.Find(15);
    
    if (booking != null)
    {
        Console.WriteLine("======= DIAGNÓSTICO DEL BOOKING ID 15 =======");
        Console.WriteLine($"Booking ID: {booking.Id}");
        Console.WriteLine($"Status: '{booking.Status}' (tipo: {booking.Status?.GetType().Name})");
        Console.WriteLine($"Usuario ID: {booking.UserId}");
        Console.WriteLine($"Chef ID: {booking.ChefId}");
        Console.WriteLine($"Fecha: {booking.BookingDate}");
        
        // Verificar si hay feedback para este booking
        var feedback = context.Feedbacks.FirstOrDefault(f => f.BookingId == booking.Id);
        if (feedback != null)
        {
            Console.WriteLine("FEEDBACK EXISTENTE:");
            Console.WriteLine($"Feedback ID: {feedback.Id}");
            Console.WriteLine($"Rating: {feedback.Rating}");
            Console.WriteLine($"Comentario: {feedback.Comment}");
            Console.WriteLine($"Fecha de envío: {feedback.SubmittedAt}");
        }
        else
        {
            Console.WriteLine("NO HAY FEEDBACK PARA ESTE BOOKING");
        }
        
        // Comparación de cadenas para diagnóstico
        Console.WriteLine("\nCOMPARACIÓN DE CADENAS:");
        Console.WriteLine($"Status == 'Completed': {booking.Status == "Completed"}");
        Console.WriteLine($"Status.ToLower() == 'completed': {booking.Status?.ToLower() == "completed"}");
        Console.WriteLine($"Status == 'Accepted': {booking.Status == "Accepted"}");
        Console.WriteLine($"Status.ToLower() == 'accepted': {booking.Status?.ToLower() == "accepted"}");
        Console.WriteLine("=========================================");
    }
    else
    {
        Console.WriteLine("======= BOOKING ID 15 NO ENCONTRADO =======");
    }
}

app.Run();
