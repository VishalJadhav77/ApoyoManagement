namespace ApoyoManagement.API.DTOs;

public class CreateCorporateLeadDto
{
    public string CompanyName { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string BusinessEmail { get; set; } = string.Empty;

    public string Mobile { get; set; } = string.Empty;

    public string WorkforceCategory { get; set; } = string.Empty;

    public int EstimatedStaffSize { get; set; }

    public string Location { get; set; } = string.Empty;

    public string ProjectDetails { get; set; } = string.Empty;
}