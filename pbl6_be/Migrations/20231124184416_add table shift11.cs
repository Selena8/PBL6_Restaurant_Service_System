using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class addtableshift11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5264), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5303), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5355), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5356), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5371), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 1, 44, 15, 628, DateTimeKind.Unspecified).AddTicks(5372), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$H2insA5Lu20ZOAIquWp.X.VswCMsiD9B7pPxhkosIu//6wDiUz1si");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$b3pDOMF1.cbVrTKC1R6UpOew1tVtl5V4wg/PrcaSc1Sz/nDrJEE7a");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$9fEHwCrlXjht971.qWoTBe4pB1V46sRADQGlQO.hWKaSFwOuDVo5m");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3640), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3683), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3758), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3759), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3783), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 23, 12, 2, 15, 209, DateTimeKind.Unspecified).AddTicks(3785), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$tADJ0higr02uoqkwHIqwXOspri9gCyY/n6qCfc9vNzdxRqfAHZJEm");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$9G/UhUn5K6uZYASUR/5eN.ZrOK3LOWeRQGwXIDysGUqUhxoj.7LUe");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$iPkI2v0260gTIY.Jyu3Kfu70zDfayh11vR5FKhvImqq7xiWnOHWOu");
        }
    }
}
