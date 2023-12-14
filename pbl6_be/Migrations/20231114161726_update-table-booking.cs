using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class updatetablebooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfPeople",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SpecialRequest",
                table: "Booking",
                type: "longtext",
                nullable: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfPeople",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "SpecialRequest",
                table: "Booking");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(3936), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(3978), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(4049), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(4051), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(4074), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 11, 22, 37, 11, 786, DateTimeKind.Unspecified).AddTicks(4075), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$5yRYl1r5s0jIaLgIZnJUn./wuezrBuH7QrRTfjZ7TbrVjvMbZYrzG");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$cqwG2pozEYiVdF1Yq2B6iuuyWzmAcSr6Cbv/MATX9Kvmhrbbz3p0a");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$BCtbO1tI2KJg8nD26z3au.UqfBUxjq56q1hq.T7sOADJoEvr0tGje");
        }
    }
}
