using ApoyoManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ApoyoManagement.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<CorporateLead> CorporateLeads { get; set; }

    public DbSet<CandidateApplication> CandidateApplications { get; set; }

    public DbSet<User> Users { get; set; }
}