namespace ApoyoManagement.API.Models;

public class CorporateLead
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string BusinessEmail { get; set; } = string.Empty;

    public string Mobile { get; set; } = string.Empty;

    public string WorkforceCategory { get; set; } = string.Empty;

    public int EstimatedStaffSize { get; set; }

    public string Location { get; set; } = string.Empty;

    public string ProjectDetails { get; set; } = string.Empty;

    // Lead Management
    public string Status { get; set; } = "New";

    public string? AssignedTo { get; set; }

    public DateTime? FollowUpDate { get; set; }

    public string? InternalNotes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}