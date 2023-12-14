using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class updatetableuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "user",
                type: "longtext",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9063), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9097), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9150), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9151), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9170), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 21, 40, 23, 636, DateTimeKind.Unspecified).AddTicks(9171), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Avatar", "Password" },
                values: new object[] { null, "$2a$11$KLUGpfmOKWkuw0g.0nG5ROjEWftnmiizxl6kcJJp7YRpetaYop4Fq" });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Avatar", "Password" },
                values: new object[] { null, "$2a$11$yGPoSZcCNZIKqdooVO9ym.PZJDLmzK/T/D4W05pRbUNnU9fQ4Ei.O" });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Avatar", "Password" },
                values: new object[] { null, "$2a$11$P2EiB46bElDhBNeP4J4fg.IIZ3Vi5XfR8MNwd.vgOcrrJdsauX2sm" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "user");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8275), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8320), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8381), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8383), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8410), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 5, 13, 24, 23, 195, DateTimeKind.Unspecified).AddTicks(8411), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$8RKfg8viP2gNl8AXVSwUG.pcElORphuDJsbVyz0cKgZ4RMD90kGyO");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$.mCS0Fr4HNqb4WqoYXhQVeORcdgpLd5DGL9iKAWIIZgUTSGVzS70K");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$DkglFtbSkrpevMbLfgWD7uautXxj/LFe0GXH6hj79Lhhlg2QscBR.");
        }
    }
}
