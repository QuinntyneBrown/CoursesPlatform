// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static void AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(isOriginAllowed: _ => true)
            .AllowCredentials()));

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ConfigureServices).Assembly));
        services.AddValidatorsFromAssembly(typeof(ConfigureServices).Assembly);

        var jwtKey = configuration["Jwt:Key"] ?? "DefaultSecretKeyForDevelopment12345678";
        var key = Encoding.UTF8.GetBytes(jwtKey);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"] ?? "CoursesPlatform",
                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"] ?? "CoursesPlatform",
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });

        services.AddAuthorization();
    }
}
