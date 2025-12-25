namespace CoursesPlatform.Api;

public static class ConfigureServices
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ConfigureServices).Assembly));

        var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? ["http://localhost:4200"];
        services.AddCors(options =>
        {
            options.AddPolicy("AllowedOrigins", policy =>
            {
                policy.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        return services;
    }
}
