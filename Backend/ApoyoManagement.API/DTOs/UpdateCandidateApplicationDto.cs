namespace ApoyoManagement.API.DTOs;

public class UpdateCandidateApplicationDto
{
    public string? Status { get; set; }

    public string? AssignedTo { get; set; }

    public DateTime? FollowUpDate { get; set; }

    public string? InternalNotes { get; set; }
}