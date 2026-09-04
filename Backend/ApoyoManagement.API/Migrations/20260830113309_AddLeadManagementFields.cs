using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApoyoManagement.API.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadManagementFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedTo",
                table: "CorporateLeads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FollowUpDate",
                table: "CorporateLeads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InternalNotes",
                table: "CorporateLeads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedTo",
                table: "CandidateApplications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FollowUpDate",
                table: "CandidateApplications",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InternalNotes",
                table: "CandidateApplications",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedTo",
                table: "CorporateLeads");

            migrationBuilder.DropColumn(
                name: "FollowUpDate",
                table: "CorporateLeads");

            migrationBuilder.DropColumn(
                name: "InternalNotes",
                table: "CorporateLeads");

            migrationBuilder.DropColumn(
                name: "AssignedTo",
                table: "CandidateApplications");

            migrationBuilder.DropColumn(
                name: "FollowUpDate",
                table: "CandidateApplications");

            migrationBuilder.DropColumn(
                name: "InternalNotes",
                table: "CandidateApplications");
        }
    }
}
