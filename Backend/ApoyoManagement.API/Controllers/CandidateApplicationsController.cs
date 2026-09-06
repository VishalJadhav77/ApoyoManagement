using ApoyoManagement.API.Data;
using ApoyoManagement.API.DTOs;
using ApoyoManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApoyoManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CandidateApplicationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public CandidateApplicationsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // =========================================================
    // PUBLIC - Candidate can submit application
    // =========================================================
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] CandidateApplicationDto dto,
        IFormFile? resume)
    {
        string? resumePath = null;

        // Resume upload
        if (resume != null && resume.Length > 0)
        {
            // Only PDF allowed
            if (resume.ContentType != "application/pdf")
            {
                return BadRequest(new
                {
                    message = "Only PDF files are allowed."
                });
            }

            // Maximum 5 MB
            if (resume.Length > 5 * 1024 * 1024)
            {
                return BadRequest(new
                {
                    message = "Resume size must be less than 5 MB."
                });
            }

            // Create wwwroot/resumes folder
            var resumesFolder = Path.Combine(
                _environment.WebRootPath ?? "wwwroot",
                "resumes");

            if (!Directory.Exists(resumesFolder))
            {
                Directory.CreateDirectory(resumesFolder);
            }

            // Generate unique filename
            var fileName =
                $"{Guid.NewGuid()}{Path.GetExtension(resume.FileName)}";

            var filePath = Path.Combine(
                resumesFolder,
                fileName);

            // Save file
            using (var stream = new FileStream(
                filePath,
                FileMode.Create))
            {
                await resume.CopyToAsync(stream);
            }

            // Save relative path in database
            resumePath = $"/resumes/{fileName}";
        }

        var application = new CandidateApplication
        {
            FullName = dto.FullName,
            Mobile = dto.Mobile,
            Skills = dto.Skills,
            CurrentCity = dto.CurrentCity,
            ExperienceLevel = dto.ExperienceLevel,
            ResumePath = resumePath
        };

        _context.CandidateApplications.Add(application);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Candidate application submitted successfully.",
            applicationId = application.Id,
            resumePath = application.ResumePath
        });
    }

    // =========================================================
    // ADMIN ONLY - View candidate applications
    // =========================================================
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _context.CandidateApplications
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return Ok(applications);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
    int id,
    UpdateCandidateApplicationDto dto)
    {
        var application = await _context.CandidateApplications
            .FirstOrDefaultAsync(x => x.Id == id);

        if (application == null)
        {
            return NotFound(new
            {
                message = "Candidate application not found."
            });
        }

        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            application.Status = dto.Status;
        }

        if (dto.AssignedTo != null)
        {
            application.AssignedTo = dto.AssignedTo;
        }

        if (dto.FollowUpDate.HasValue)
        {
            application.FollowUpDate = dto.FollowUpDate;
        }

        if (dto.InternalNotes != null)
        {
            application.InternalNotes = dto.InternalNotes;
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Candidate application updated successfully.",
            applicationId = application.Id
        });
    }

    // =========================================================
    // ADMIN ONLY - Delete candidate application
    // =========================================================
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var application = await _context.CandidateApplications
            .FirstOrDefaultAsync(x => x.Id == id);

        if (application == null)
        {
            return NotFound(new
            {
                message = "Candidate application not found."
            });
        }

        // Delete resume file if it exists
        if (!string.IsNullOrWhiteSpace(application.ResumePath))
        {
            var filePath = Path.Combine(
                _environment.WebRootPath ?? "wwwroot",
                application.ResumePath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString())
            );

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.CandidateApplications.Remove(application);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Candidate application deleted successfully."
        });
    }
}