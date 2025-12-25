namespace CoursesPlatform.Core;

public class Instructor
{
    public Guid InstructorId { get; private set; }

    public Guid UserId { get; private set; }

    public User User { get; private set; } = null!;

    public string Biography { get; private set; } = string.Empty;

    public string? Credentials { get; private set; }

    public InstructorStatus Status { get; private set; }

    public bool IsVerified { get; private set; }

    public bool IsPremium { get; private set; }

    public DateTime ApplicationDate { get; private set; }

    public DateTime? ApprovalDate { get; private set; }

    public DateTime CreatedAt { get; private set; }

    private readonly List<string> _expertise = [];

    public IReadOnlyCollection<string> Expertise => _expertise.AsReadOnly();

    private Instructor()
    {
    }

    public static Instructor Apply(User user, string biography)
    {
        return new Instructor
        {
            InstructorId = Guid.NewGuid(),
            UserId = user.UserId,
            User = user,
            Biography = biography,
            Status = InstructorStatus.PendingReview,
            IsVerified = false,
            IsPremium = false,
            ApplicationDate = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public void Approve()
    {
        Status = InstructorStatus.Active;
        ApprovalDate = DateTime.UtcNow;
    }

    public void Reject()
    {
        Status = InstructorStatus.Rejected;
    }

    public void Suspend()
    {
        Status = InstructorStatus.Suspended;
    }

    public void Reinstate()
    {
        Status = InstructorStatus.Active;
    }

    public void UpdateBiography(string biography)
    {
        Biography = biography;
    }

    public void UpdateCredentials(string credentials)
    {
        Credentials = credentials;
    }

    public void AddExpertise(string expertise)
    {
        if (!_expertise.Contains(expertise))
        {
            _expertise.Add(expertise);
        }
    }

    public void RemoveExpertise(string expertise)
    {
        _expertise.Remove(expertise);
    }

    public void Verify()
    {
        IsVerified = true;
    }

    public void GrantPremiumStatus()
    {
        IsPremium = true;
    }

    public void RevokePremiumStatus()
    {
        IsPremium = false;
    }
}
