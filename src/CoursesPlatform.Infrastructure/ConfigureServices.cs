namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Server=(localdb)\\mssqllocaldb;Database=CoursesPlatform;Trusted_Connection=True;MultipleActiveResultSets=true";

        services.AddDbContext<CoursesPlatformContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<ICoursesPlatformContext>(provider =>
            provider.GetRequiredService<CoursesPlatformContext>());

        return services;
    }
}
