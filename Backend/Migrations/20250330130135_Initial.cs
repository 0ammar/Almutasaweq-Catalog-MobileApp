using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                    table.CheckConstraint("CH_Name_Length", "LEN(Name) >= 3");
                });

            migrationBuilder.CreateTable(
                name: "SubOnes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubOnes", x => x.Id);
                    table.CheckConstraint("CH_Name_Length1", "Len(Name) >= 3");
                    table.ForeignKey(
                        name: "FK_SubOnes_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubTwos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    SubOneId = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubTwos", x => x.Id);
                    table.CheckConstraint("CH_Name_Length3", "Len(Name) >= 3");
                    table.ForeignKey(
                        name: "FK_SubTwos_SubOnes_SubOneId",
                        column: x => x.SubOneId,
                        principalTable: "SubOnes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubThrees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    SubTwoId = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubThrees", x => x.Id);
                    table.CheckConstraint("CH_Name_Length2", "Len(Name) >= 3");
                    table.ForeignKey(
                        name: "FK_SubThrees_SubTwos_SubTwoId",
                        column: x => x.SubTwoId,
                        principalTable: "SubTwos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Images = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SubTwoId = table.Column<int>(type: "int", nullable: true),
                    SubThreeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemNo);
                    table.ForeignKey(
                        name: "FK_Items_SubThrees_SubThreeId",
                        column: x => x.SubThreeId,
                        principalTable: "SubThrees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Items_SubTwos_SubTwoId",
                        column: x => x.SubTwoId,
                        principalTable: "SubTwos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Groups_Name",
                table: "Groups",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemNo",
                table: "Items",
                column: "ItemNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_Name",
                table: "Items",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_SubThreeId",
                table: "Items",
                column: "SubThreeId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_SubTwoId",
                table: "Items",
                column: "SubTwoId");

            migrationBuilder.CreateIndex(
                name: "IX_SubOnes_GroupId",
                table: "SubOnes",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_SubOnes_Name",
                table: "SubOnes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubThrees_Name",
                table: "SubThrees",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubThrees_SubTwoId",
                table: "SubThrees",
                column: "SubTwoId");

            migrationBuilder.CreateIndex(
                name: "IX_SubTwos_Name",
                table: "SubTwos",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubTwos_SubOneId",
                table: "SubTwos",
                column: "SubOneId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "SubThrees");

            migrationBuilder.DropTable(
                name: "SubTwos");

            migrationBuilder.DropTable(
                name: "SubOnes");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
