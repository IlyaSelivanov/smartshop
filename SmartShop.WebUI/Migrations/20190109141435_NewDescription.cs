using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartShop.WebUI.Migrations
{
    public partial class NewDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "NewDescription");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NewDescription",
                table: "Products",
                newName: "Description");
        }
    }
}
