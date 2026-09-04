using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApoyoManagement.API.Data;
using ApoyoManagement.API.DTOs;
using ApoyoManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ApoyoManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AdminController(
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(AdminLoginDto dto)
    {
        var admin = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.Email == dto.Email &&
                x.Role == "Admin");

        if (admin == null ||
            !BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash))
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var token = GenerateJwtToken(
            admin.Email,
            admin.Name,
            admin.Role);

        return Ok(new
        {
            message = "Login successful.",
            name = admin.Name,
            email = admin.Email,
            role = admin.Role,
            token = token
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateAdmin(
        CreateAdminUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name) ||
            string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new
            {
                message = "Name, email and password are required."
            });
        }

        var emailExists = await _context.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (emailExists)
        {
            return BadRequest(new
            {
                message = "An account with this email already exists."
            });
        }

        var admin = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(admin);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Admin user created successfully.",
            adminId = admin.Id,
            name = admin.Name,
            email = admin.Email,
            role = admin.Role
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAdmins()
    {
        var admins = await _context.Users
            .Where(x => x.Role == "Admin")
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.Email,
                x.Role,
                x.CreatedAt
            })
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        return Ok(admins);
    }

    private string GenerateJwtToken(
        string email,
        string name,
        string role)
    {
        var key = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException(
                "JWT Key is missing.");

        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, name),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role)
        };

        var securityKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key));

        var credentials =
            new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                _configuration.GetValue<int>(
                    "Jwt:ExpiryMinutes")),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}