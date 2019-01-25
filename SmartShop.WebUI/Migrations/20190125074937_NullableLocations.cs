using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartShop.WebUI.Migrations
{
    public partial class NullableLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location_Lng",
                table: "Shops",
                newName: "Lng");

            migrationBuilder.RenameColumn(
                name: "Location_Lat",
                table: "Shops",
                newName: "Lat");

            migrationBuilder.AlterColumn<double>(
                name: "Lng",
                table: "Shops",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.AlterColumn<double>(
                name: "Lat",
                table: "Shops",
                nullable: true,
                oldClrType: typeof(double));

            migrationBuilder.InsertData(
                table: "Shops",
                columns: new[] { "Id", "Adress", "Lat", "Lng", "Name" },
                values: new object[,]
                {
                    { 1, "ул. Парковая", null, null, "АТБ" },
                    { 2, "ул. Дворцовая", null, null, "АТБ" },
                    { 3, "ул. Дворцовая", null, null, "Prostor" },
                    { 4, "Mira ave.", null, null, "Квартал" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Shops",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Shops",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Shops",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Shops",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.RenameColumn(
                name: "Lng",
                table: "Shops",
                newName: "Location_Lng");

            migrationBuilder.RenameColumn(
                name: "Lat",
                table: "Shops",
                newName: "Location_Lat");

            migrationBuilder.AlterColumn<double>(
                name: "Location_Lng",
                table: "Shops",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Location_Lat",
                table: "Shops",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);
        }
    }
}
