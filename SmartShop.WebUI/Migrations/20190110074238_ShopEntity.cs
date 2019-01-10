using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartShop.WebUI.Migrations
{
    public partial class ShopEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Location_Lat",
                table: "Shops",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Location_Lng",
                table: "Shops",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "ShopProduct",
                columns: table => new
                {
                    ShopId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopProduct", x => new { x.ShopId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ShopProduct_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShopProduct_Shops_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "Description", "Name" },
                values: new object[] { 3, null, null, "Fruits" });

            migrationBuilder.CreateIndex(
                name: "IX_ShopProduct_ProductId",
                table: "ShopProduct",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopProduct");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Location_Lat",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "Location_Lng",
                table: "Shops");
        }
    }
}
