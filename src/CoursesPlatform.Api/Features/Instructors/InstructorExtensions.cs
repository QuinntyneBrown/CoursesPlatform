namespace CoursesPlatform.Api;

using CoursesPlatform.Core;

public static class InstructorExtensions
{
    public static InstructorDto ToDto(this Instructor instructor)
    {
        return new InstructorDto(
            instructor.InstructorId,
            instructor.UserId,
            instructor.Biography,
            instructor.Credentials,
            instructor.Status.ToString(),
            instructor.IsVerified,
            instructor.IsPremium,
            instructor.Expertise,
            instructor.ApplicationDate,
            instructor.ApprovalDate);
    }
}
