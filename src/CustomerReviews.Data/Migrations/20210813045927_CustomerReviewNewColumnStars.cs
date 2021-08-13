using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerReviews.Data.Migrations
{
    public partial class CustomerReviewNewColumnStars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stars",
                table: "CustomerReview",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stars",
                table: "CustomerReview");
        }
    }
}
