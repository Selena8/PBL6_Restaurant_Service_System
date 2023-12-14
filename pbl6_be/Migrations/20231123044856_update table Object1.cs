using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class updatetableObject1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "path",
                table: "object",
                type: "longtext",
                nullable: false);

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9270), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9310), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9382), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9384), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9408), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 11, 48, 54, 462, DateTimeKind.Unspecified).AddTicks(9409), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$XSUVj7czHcAvl/3xo5HXCe2zWY3FK7Qs3YWD.mCttPe0lziXV4QDe");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$OGhXw4A3MlbUSpGT3Lkgp.tLoCbOmgsRbLSZIxUKbPJS0CGqUKmba");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$wtTDReELVkQdmpRWxwO3cO9Jj0L9wx98GKS0.W83yc6DUzRzzTcNi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "path",
                table: "object");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3862), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3897), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3957), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3958), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3977), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 22, 22, 43, 18, 97, DateTimeKind.Unspecified).AddTicks(3978), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$D5dYUAk3bQr6ZtS4uK3cJ.oR7fz2KkAdnSbb0rKLBS/hYVfnMWvWW");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$g3RR.gHg1fP1oygHUIMnW.zpVt76UXe33ptUqeZZdHNKdUDRaCrTi");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$4D5putjYUn3bo5dadDtkEeml0RbDboJ4iCzBi0WA4A39Q/Np8gmVa");
        }
    }
}
