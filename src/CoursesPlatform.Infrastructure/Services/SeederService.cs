// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CoursesPlatform.Infrastructure;

public class SeederService : ISeederService
{
    private readonly CoursesPlatformContext _context;
    private readonly ILogger<SeederService> _logger;

    public SeederService(CoursesPlatformContext context, ILogger<SeederService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting database seeding...");

        await _context.Database.MigrateAsync(cancellationToken);

        if (await _context.Users.AnyAsync(cancellationToken))
        {
            _logger.LogInformation("Database already seeded. Skipping...");
            return;
        }

        await SeedUsersAsync(cancellationToken);
        await SeedCategoriesAsync(cancellationToken);
        await SeedCoursesAsync(cancellationToken);

        _logger.LogInformation("Database seeding completed successfully.");
    }

    private async Task SeedUsersAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Seeding users...");

        var users = new List<User>
        {
            CreateUser(
                "admin@coursesplatform.com",
                "Admin@123",
                "System",
                "Administrator",
                "Platform administrator with full access to all features.",
                "Platform Administrator"),
            CreateUser(
                "john.doe@example.com",
                "Password@123",
                "John",
                "Doe",
                "Experienced software engineer with 10+ years in web development. Passionate about teaching and sharing knowledge.",
                "Senior Software Engineer & Instructor"),
            CreateUser(
                "jane.smith@example.com",
                "Password@123",
                "Jane",
                "Smith",
                "Data scientist and machine learning expert. I love making complex topics accessible to everyone.",
                "Data Science Instructor"),
            CreateUser(
                "bob.wilson@example.com",
                "Password@123",
                "Bob",
                "Wilson",
                "Full-stack developer specializing in cloud architecture and DevOps practices.",
                "Cloud Architecture Specialist"),
            CreateUser(
                "alice.johnson@example.com",
                "Password@123",
                "Alice",
                "Johnson",
                "UX/UI designer with a background in psychology. Creating beautiful and user-friendly interfaces.",
                "UX Design Expert"),
            CreateUser(
                "student1@example.com",
                "Password@123",
                "Mike",
                "Brown",
                null,
                null),
            CreateUser(
                "student2@example.com",
                "Password@123",
                "Sarah",
                "Davis",
                null,
                null)
        };

        await _context.Users.AddRangeAsync(users, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Seeded {Count} users.", users.Count);
    }

    private static User CreateUser(string email, string password, string firstName, string lastName, string? biography, string? headline)
    {
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            Biography = biography,
            Headline = headline,
            Status = UserStatus.Active,
            EmailVerified = true,
            CreatedAt = DateTime.UtcNow
        };
        user.SetPassword(password);
        return user;
    }

    private async Task SeedCategoriesAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Seeding categories...");

        var development = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = "Development",
            Description = "Programming, web development, mobile apps, and software engineering courses."
        };

        var dataScience = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = "Data Science",
            Description = "Data analysis, machine learning, artificial intelligence, and statistics courses."
        };

        var design = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = "Design",
            Description = "UX/UI design, graphic design, and creative courses."
        };

        var business = new Category
        {
            CategoryId = Guid.NewGuid(),
            Name = "Business",
            Description = "Entrepreneurship, management, marketing, and business strategy courses."
        };

        var categories = new List<Category> { development, dataScience, design, business };
        await _context.Categories.AddRangeAsync(categories, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        // Add subcategories
        var subCategories = new List<Category>
        {
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "Web Development",
                Description = "Frontend and backend web development courses.",
                ParentCategoryId = development.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "Mobile Development",
                Description = "iOS, Android, and cross-platform mobile development.",
                ParentCategoryId = development.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "Cloud & DevOps",
                Description = "Cloud computing, containerization, and DevOps practices.",
                ParentCategoryId = development.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "Machine Learning",
                Description = "Machine learning algorithms and frameworks.",
                ParentCategoryId = dataScience.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "Data Analysis",
                Description = "Data visualization and analysis techniques.",
                ParentCategoryId = dataScience.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "UX Design",
                Description = "User experience design principles and practices.",
                ParentCategoryId = design.CategoryId
            },
            new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = "UI Design",
                Description = "User interface design and prototyping.",
                ParentCategoryId = design.CategoryId
            }
        };

        await _context.Categories.AddRangeAsync(subCategories, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Seeded {Count} categories.", categories.Count + subCategories.Count);
    }

    private async Task SeedCoursesAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Seeding courses...");

        var johnDoe = await _context.Users.FirstAsync(u => u.Email == "john.doe@example.com", cancellationToken);
        var janeSmith = await _context.Users.FirstAsync(u => u.Email == "jane.smith@example.com", cancellationToken);
        var bobWilson = await _context.Users.FirstAsync(u => u.Email == "bob.wilson@example.com", cancellationToken);
        var aliceJohnson = await _context.Users.FirstAsync(u => u.Email == "alice.johnson@example.com", cancellationToken);

        var webDev = await _context.Categories.FirstAsync(c => c.Name == "Web Development", cancellationToken);
        var cloudDevOps = await _context.Categories.FirstAsync(c => c.Name == "Cloud & DevOps", cancellationToken);
        var machineLearning = await _context.Categories.FirstAsync(c => c.Name == "Machine Learning", cancellationToken);
        var dataAnalysis = await _context.Categories.FirstAsync(c => c.Name == "Data Analysis", cancellationToken);
        var uxDesign = await _context.Categories.FirstAsync(c => c.Name == "UX Design", cancellationToken);

        var courses = new List<Course>
        {
            CreateCourse(
                "Complete ASP.NET Core Web API Development",
                "Build RESTful APIs with .NET 9 and Entity Framework Core",
                "Learn to build production-ready REST APIs using ASP.NET Core. This comprehensive course covers everything from setting up your development environment to deploying your API to the cloud. You'll learn about controllers, routing, dependency injection, Entity Framework Core, authentication, and much more.",
                johnDoe.UserId,
                webDev.CategoryId,
                CourseStatus.Published,
                CourseLevel.Intermediate,
                "English",
                new List<string>
                {
                    "Build RESTful APIs with ASP.NET Core",
                    "Implement CRUD operations with Entity Framework Core",
                    "Secure APIs with JWT authentication",
                    "Write unit and integration tests",
                    "Deploy APIs to Azure"
                }),
            CreateCourse(
                "Angular for Beginners",
                "Master modern frontend development with Angular 18",
                "Start your journey into frontend development with Angular. This beginner-friendly course teaches you the fundamentals of Angular including components, services, routing, forms, and HTTP client. By the end, you'll be able to build complete single-page applications.",
                johnDoe.UserId,
                webDev.CategoryId,
                CourseStatus.Published,
                CourseLevel.Beginner,
                "English",
                new List<string>
                {
                    "Understand Angular architecture and components",
                    "Create reusable components and services",
                    "Implement routing and navigation",
                    "Handle forms and validation",
                    "Connect to backend APIs"
                }),
            CreateCourse(
                "Python Machine Learning Masterclass",
                "From basics to advanced ML with scikit-learn and TensorFlow",
                "Dive deep into machine learning with Python. This course covers supervised and unsupervised learning, neural networks, deep learning, and practical applications. You'll work on real-world projects and learn to deploy ML models.",
                janeSmith.UserId,
                machineLearning.CategoryId,
                CourseStatus.Published,
                CourseLevel.Advanced,
                "English",
                new List<string>
                {
                    "Understand core ML algorithms",
                    "Implement models with scikit-learn",
                    "Build neural networks with TensorFlow",
                    "Perform feature engineering",
                    "Deploy ML models to production"
                }),
            CreateCourse(
                "Data Analysis with Python and Pandas",
                "Master data manipulation and visualization",
                "Learn how to analyze and visualize data using Python. This course covers Pandas, NumPy, Matplotlib, and Seaborn. You'll learn to clean data, perform exploratory data analysis, and create compelling visualizations.",
                janeSmith.UserId,
                dataAnalysis.CategoryId,
                CourseStatus.Published,
                CourseLevel.Intermediate,
                "English",
                new List<string>
                {
                    "Master Pandas DataFrames",
                    "Clean and preprocess data",
                    "Perform statistical analysis",
                    "Create data visualizations",
                    "Build interactive dashboards"
                }),
            CreateCourse(
                "Docker and Kubernetes Fundamentals",
                "Container orchestration for modern applications",
                "Learn containerization with Docker and orchestration with Kubernetes. This hands-on course covers container basics, Docker Compose, Kubernetes architecture, deployments, services, and production best practices.",
                bobWilson.UserId,
                cloudDevOps.CategoryId,
                CourseStatus.Published,
                CourseLevel.Intermediate,
                "English",
                new List<string>
                {
                    "Build and manage Docker containers",
                    "Create multi-container applications",
                    "Deploy to Kubernetes clusters",
                    "Implement CI/CD pipelines",
                    "Monitor and troubleshoot containers"
                }),
            CreateCourse(
                "AWS Solutions Architect Preparation",
                "Prepare for AWS certification exam",
                "Comprehensive preparation for the AWS Solutions Architect Associate certification. Covers all exam domains including compute, storage, networking, databases, security, and architecture best practices.",
                bobWilson.UserId,
                cloudDevOps.CategoryId,
                CourseStatus.Draft,
                CourseLevel.Advanced,
                "English",
                new List<string>
                {
                    "Understand AWS core services",
                    "Design highly available architectures",
                    "Implement security best practices",
                    "Optimize for cost and performance",
                    "Pass the AWS certification exam"
                }),
            CreateCourse(
                "UX Design Principles and Practices",
                "Create user-centered digital experiences",
                "Learn the fundamentals of UX design. This course covers user research, information architecture, wireframing, prototyping, and usability testing. You'll work on real projects and build a professional portfolio.",
                aliceJohnson.UserId,
                uxDesign.CategoryId,
                CourseStatus.Published,
                CourseLevel.Beginner,
                "English",
                new List<string>
                {
                    "Conduct user research",
                    "Create personas and user journeys",
                    "Design wireframes and prototypes",
                    "Perform usability testing",
                    "Apply accessibility principles"
                }),
            CreateCourse(
                "Advanced Figma Design System",
                "Build scalable design systems in Figma",
                "Take your Figma skills to the next level. Learn to create comprehensive design systems with components, variants, auto-layout, and design tokens. Perfect for designers working on large-scale projects.",
                aliceJohnson.UserId,
                uxDesign.CategoryId,
                CourseStatus.Draft,
                CourseLevel.Advanced,
                "English",
                new List<string>
                {
                    "Master Figma components and variants",
                    "Implement auto-layout effectively",
                    "Create and manage design tokens",
                    "Build accessible design systems",
                    "Collaborate with development teams"
                })
        };

        await _context.Courses.AddRangeAsync(courses, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Seeded {Count} courses.", courses.Count);
    }

    private static Course CreateCourse(
        string title,
        string subtitle,
        string description,
        Guid instructorId,
        Guid categoryId,
        CourseStatus status,
        CourseLevel level,
        string language,
        List<string> learningObjectives)
    {
        var course = new Course
        {
            CourseId = Guid.NewGuid(),
            Title = title,
            Subtitle = subtitle,
            Description = description,
            InstructorId = instructorId,
            CategoryId = categoryId,
            Status = status,
            Level = level,
            Language = language,
            CreatedAt = DateTime.UtcNow,
            PublishedAt = status == CourseStatus.Published ? DateTime.UtcNow : null
        };

        for (int i = 0; i < learningObjectives.Count; i++)
        {
            course.LearningObjectives.Add(new LearningObjective
            {
                LearningObjectiveId = Guid.NewGuid(),
                Description = learningObjectives[i],
                SortOrder = i + 1
            });
        }

        return course;
    }
}
