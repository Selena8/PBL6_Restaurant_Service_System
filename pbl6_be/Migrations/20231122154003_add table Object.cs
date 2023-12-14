using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class addtableObject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "object",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(255)", nullable: false),
                    rotation = table.Column<double>(type: "double", nullable: false),
                    type = table.Column<int>(type: "int", nullable: false),
                    width = table.Column<double>(type: "double", nullable: false),
                    height = table.Column<double>(type: "double", nullable: false),
                    depth = table.Column<double>(type: "double", nullable: false),
                    x = table.Column<double>(type: "double", nullable: false),
                    y = table.Column<double>(type: "double", nullable: false),
                    z = table.Column<double>(type: "double", nullable: false),
                    color = table.Column<string>(type: "longtext", nullable: false),
                    text = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_object", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8187), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8219), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8283), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8284), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8304), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 40, 3, 46, DateTimeKind.Unspecified).AddTicks(8305), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$0mEK5yORzUm/613.nHu4..0eZ9h5EfPvr21B1zehfX63MPxesPj/2");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$C7n1gjwBIcPoRbahMx.vruEqP3jcTUxgfALrZdo2pOvQHs/mHE1Oi");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$3EfcBl4z4Ob6ymCLOZD4du3d1WnOwAOmB3WyFXKRdJOo0k3WCzrye");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "object");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7162), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7201), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7271), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7272), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7295), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 14, 23, 17, 25, 741, DateTimeKind.Unspecified).AddTicks(7296), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$o95bXP4PO.Sn4g98pZbZaOmPLr.lvxIfwHCSbuuVDbKf3Q4G9d6l.");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$RSF/QOTtksXjCBcjg2sNferw3eFML6DTCMgUEjqFr3BB4LnABqlFC");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$YlrVctatLCrzt.5im5Xux.0twKZNplPIgpEjEHtEmj9C1lXK7RwWu");
        }
    }
}
