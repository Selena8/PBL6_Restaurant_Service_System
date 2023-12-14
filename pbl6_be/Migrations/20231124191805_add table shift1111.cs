using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class addtableshift1111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(7976), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(8017), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(8073), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(8074), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(8092), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 18, 4, 543, DateTimeKind.Unspecified).AddTicks(8093), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$Ou/U2qk3q4A8DC4M4jFjFeyG9dLgVINg3uypuDDeVInEBos6X7.FS");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$qYrwPX4.mdSqo06RZASDyOzYba/rfxqs/EJdHoNbIjvSHDIyYofVu");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$X1qcnbDopV8Psha1UzgMCukapYfDcXK26S6Giyk58UjvAZ2RqmY2q");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4170), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4204), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4262), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4263), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4281), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 4, 32, 818, DateTimeKind.Unspecified).AddTicks(4282), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$cPQrTY5tatd8yxfosNA2HOlwMLeRlHSwl9faSxZxZCwQbe5XbLNIO");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$cUL.wrjOH9KoUjtXY8Ygc.X9XC5MqQZ6U.gbIWgGhvbwURKPSs2HO");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$CeaCJTRS94XrIETOj8Euk.WZqtaXjU5EIxpidh2bX0W/Usim3kJ5a");
        }
    }
}
