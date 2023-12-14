using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class updatetablefood : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "food",
                type: "longtext",
                nullable: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "food");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8378), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8414), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8451), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8451), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8463), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 10, 17, 23, 9, 24, 556, DateTimeKind.Unspecified).AddTicks(8463), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$KjQU.eyAXtttdP3RCaCtdOYMEoRMTIZlUqQN6sA8TNvWCalaemd7.");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$8LJK02QimRcFmgZ6/cwlZemXtAvasmcHeipxatslZSWRwdIPkzRpu");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$aBlzvcAHfMRdY7Ee/jEdSO2WMpCBLxOHTnWmBnanr7KIxJWS5YtcC");
        }
    }
}
