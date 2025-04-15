using Backend.DbContexts;
using Backend.Implementations;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll",
		policy => policy.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader());
});

// Configure Serilog here
Log.Logger = new LoggerConfiguration()
	.WriteTo.Console()    // Logs to the console
	.WriteTo.File("Logs/MyApp.txt", rollingInterval: RollingInterval.Day)
	.Enrich.FromLogContext()
	.CreateLogger();

// Add Serilog to the logging system
builder.Host.UseSerilog();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("BackendAPI", new OpenApiInfo
	{
		Title = "Almutasaweq Catalog API",
		Version = "v1",
		Description = "A B2B API to help salesmen showcase products to business owners.",
		Contact = new OpenApiContact
		{
			Name = "Ammar Arab",
			Email = "oammar@outlook.sa",
			Url = new Uri("https://0ammar.github.io/Personal-site/")
		}
	});

	c.DocInclusionPredicate((docName, apiDesc) =>
	{
		var groupName = apiDesc.GroupName ?? "";
		return docName == groupName;
	});

	var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
	var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	if (File.Exists(xmlPath))
		c.IncludeXmlComments(xmlPath);
});

// Assumptions on every server it works on every IP
builder.WebHost.UseUrls("http://0.0.0.0:5097");


// Configur Database
builder.Services.AddDbContext<CatalogContext>(x => x.UseSqlServer("Data Source=AMMAR-ARAB\\SQLEXPRESS;" +
	"Initial Catalog=AlmutasaweqCatalog;Integrated Security=True;Trust Server Certificate=True"));

// Configur Services
builder.Services.AddScoped<ICategoriesServices, CategoriesServices>();
builder.Services.AddScoped<IItemServices, ItemServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(c =>
	{
		c.SwaggerEndpoint("/swagger/BackendAPI/swagger.json", "Backend API");
	});

}

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
try
{
	Log.Information("Start Running The API");
	Log.Information("App Runs Successfully");
	app.Run("http://0.0.0.0:5097");

}
catch (Exception ex)
{
	Log.Information("An Error Occured");
	Log.Error($"Error {ex.Message} was Prevernt Application from run successfully");
}
finally
{
	Log.Warning("Test Warning");
}