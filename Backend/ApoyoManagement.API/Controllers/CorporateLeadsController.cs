using ApoyoManagement.API.Data;
using ApoyoManagement.API.DTOs;
using ApoyoManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApoyoManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CorporateLeadsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CorporateLeadsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // =========================================================
    // PUBLIC - Company can submit workforce requirement
    // =========================================================
    [HttpPost]
    public async Task<IActionResult> Create(CreateCorporateLeadDto dto)
    {
        var lead = new CorporateLead
        {
            CompanyName = dto.CompanyName,
            ContactPerson = dto.ContactPerson,
            BusinessEmail = dto.BusinessEmail,
            Mobile = dto.Mobile,
            WorkforceCategory = dto.WorkforceCategory,
            EstimatedStaffSize = dto.EstimatedStaffSize,
            Location = dto.Location,
            ProjectDetails = dto.ProjectDetails
        };

        _context.CorporateLeads.Add(lead);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Corporate lead submitted successfully.",
            leadId = lead.Id
        });
    }

    // =========================================================
    // ADMIN ONLY - View corporate leads
    // =========================================================
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var leads = await _context.CorporateLeads
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return Ok(leads);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    int id,
    UpdateCorporateLeadDto dto)
    {
        var lead = await _context.CorporateLeads
            .FirstOrDefaultAsync(x => x.Id == id);

        if (lead == null)
        {
            return NotFound(new
            {
                message = "Corporate lead not found."
            });
        }

        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            lead.Status = dto.Status;
        }

        if (dto.AssignedTo != null)
        {
            lead.AssignedTo = dto.AssignedTo;
        }

        if (dto.FollowUpDate.HasValue)
        {
            lead.FollowUpDate = dto.FollowUpDate;
        }

        if (dto.InternalNotes != null)
        {
            lead.InternalNotes = dto.InternalNotes;
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Corporate lead updated successfully.",
            leadId = lead.Id
        });
    }
    // =========================================================
    // ADMIN ONLY - Delete corporate lead
    // =========================================================
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var lead = await _context.CorporateLeads
            .FirstOrDefaultAsync(x => x.Id == id);

        if (lead == null)
        {
            return NotFound(new
            {
                message = "Corporate lead not found."
            });
        }

        _context.CorporateLeads.Remove(lead);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Corporate lead deleted successfully."
        });
    }
}