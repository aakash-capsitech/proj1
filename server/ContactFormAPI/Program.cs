// Program.cs
using ContactFormAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add MongoDB
builder.Services.AddSingleton<MongoDbContext>();

// Add CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReactApp", policy =>
//     {
//         policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // React dev servers
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// After var app = builder.Build();


var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();