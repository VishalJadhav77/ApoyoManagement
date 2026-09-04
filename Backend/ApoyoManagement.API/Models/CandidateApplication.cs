namespace ApoyoManagement.API.Models;

public class CandidateApplication
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Mobile { get; set; } = string.Empty;

    public string Skills { get; set; } = string.Empty;

    public string CurrentCity { get; set; } = string.Empty;

    public string ExperienceLevel { get; set; } = string.Empty;

    public string? ResumePath { get; set; }

    // Lead Management
    public string Status { get; set; } = "New";

    public string? AssignedTo { get; set; }

    public DateTime? FollowUpDate { get; set; }

    public string? InternalNotes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}