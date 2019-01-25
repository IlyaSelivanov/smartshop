using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartShop.WebUI.Migrations
{
    public partial class ShopRenameAddressField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Shops",
                newName: "Address");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Shops",
                newName: "Adress");
        }
    }
}
