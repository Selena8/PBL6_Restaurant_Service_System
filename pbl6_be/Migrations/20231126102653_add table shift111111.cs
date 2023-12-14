using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pbl6_be.Migrations
{
    /// <inheritdoc />
    public partial class addtableshift111111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "feed_back",
                table: "request");

            migrationBuilder.DropColumn(
                name: "priority",
                table: "request");

            migrationBuilder.DropColumn(
                name: "request_date",
                table: "request");

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6152), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6183), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6250), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6251), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6271), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 26, 17, 26, 52, 882, DateTimeKind.Unspecified).AddTicks(6271), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$DAjqnjNpiHGY1XBQEy2Cr.Iw4i/AtDBWZAJHnl.l/GNCLe./lMbi6");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$kFaUuhu/oWkSnvUZYzAbIOgfRDvcfJrQMVQTP/nZcblv6uXobdNn.");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$1Z8Bg4S5d1jfCNHvBvBxdeQTxl7Izc42oOciqmRKZW89Biqcc71li");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "feed_back",
                table: "request",
                type: "varchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "priority",
                table: "request",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "request_date",
                table: "request",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9493), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9534), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9639), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9641), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "role",
                keyColumn: "id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9664), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 11, 25, 2, 19, 53, 707, DateTimeKind.Unspecified).AddTicks(9665), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$GjtMQTjAKzonc6gdZa.nQerZXFVYQzNy25nBwqdHvcs1aqAVtaLKm");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$wDp4ylvSFL1hHuOyhl2WDOPZfMyKC2J8l51zxGwomJoe.Fjq2GxuK");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$11$Y26Et.UwBH5dGK9WY7nWMO5AqVu3paVy6TZ.OOdHWL494NHIS5uby");
        }
    }
}
