using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartShop.WebUI.Migrations
{
    public partial class NewName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NewDescription",
                table: "Products",
                newName: "NewName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Products",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NewName",
                table: "Products",
                newName: "NewDescription");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "Name");
        }
    }
}
