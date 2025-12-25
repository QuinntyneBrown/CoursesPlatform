# CoursesPlatform

A full-stack course management platform built with .NET and Angular, featuring course creation, user management, and identity services.

## Architecture

This project follows Clean Architecture principles with clear separation of concerns:

### Backend (.NET)
- **CoursesPlatform.Core** - Domain entities, interfaces, and business logic
- **CoursesPlatform.Infrastructure** - Data access, repositories, and external services
- **CoursesPlatform.Api** - RESTful API endpoints and controllers

### Frontend (Angular 21)
- **CoursesPlatform.WebApp** - Angular workspace containing:
  - Main application with course management features
  - Reusable component library (courses-platform-components)
  - Storybook for component documentation

## Prerequisites

- .NET SDK (version specified in global.json or latest LTS)
- Node.js 20+ (using npm 10.9.4)
- Angular CLI 21

## Getting Started

### Backend Setup

```bash
# Restore dependencies
dotnet restore

# Build solution
dotnet build

# Run API (from src/CoursesPlatform.Api)
dotnet run --project src/CoursesPlatform.Api
```

### Frontend Setup

```bash
# Navigate to Angular workspace
cd src/CoursesPlatform.WebApp

# Install dependencies
npm install

# Start development server
npm start

# Run Storybook
npm run storybook
```

## Available Scripts

### Backend
- `dotnet build` - Build the solution
- `dotnet test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run storybook` - Launch Storybook
- `npm run build-storybook` - Build static Storybook

## Project Structure

```
CoursesPlatform/
├── src/
│   ├── CoursesPlatform.Api/           # Web API
│   ├── CoursesPlatform.Core/          # Domain layer
│   ├── CoursesPlatform.Infrastructure/ # Data & infrastructure
│   └── CoursesPlatform.WebApp/        # Angular application
├── tests/
│   └── CoursesPlatform.Api.Tests/     # API tests
└── docs/                              # Documentation
    ├── events/                        # Event storming artifacts
    └── specs/                         # Technical specifications
```

## Features

- Course creation and management
- User authentication and identity management
- Component library with Storybook documentation
- RESTful API with clean architecture
- Comprehensive testing

## Technology Stack

- **Backend**: .NET, ASP.NET Core
- **Frontend**: Angular 21, Angular Material, RxJS
- **Testing**: xUnit (backend), Vitest (frontend)
- **Documentation**: Storybook
- **Package Management**: npm

## Documentation

Additional documentation can be found in the [docs](./docs) directory:
- Event storming artifacts
- Technical specifications
- Architecture decision records

## License

[Your License Here]
