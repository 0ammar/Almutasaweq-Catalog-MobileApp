using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace Backend.EntityConfiguration
{
	public class ItemConfiguration : IEntityTypeConfiguration<Item>
	{
		public void Configure(EntityTypeBuilder<Item> builder)
		{
			builder.HasKey(x => x.ItemNo);
			builder.Property(x => x.ItemNo)
				   .ValueGeneratedNever();
			builder.HasIndex(x => x.ItemNo)
				   .IsUnique();

			builder.Property(x => x.Images)
				   .HasConversion(
				   v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null!),
				   v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null!)!)
				   .IsRequired(false);

			builder.Property(u => u.IsDeleted).HasDefaultValue(false);
			builder.Property(u => u.CreationDate)
				   .IsRequired()
				   .HasDefaultValueSql("GETDATE()");

			builder.Property(x => x.Name)
				   .HasMaxLength(255)
				   .IsRequired();

			builder.HasIndex(x => x.Name).IsUnique();

			builder.Property(x => x.Description)
				   .HasMaxLength(255)
				   .IsRequired(false);

			builder.HasOne<SubTwo>()
				   .WithMany()
				   .HasForeignKey(x => x.SubTwoId)
				   .OnDelete(DeleteBehavior.NoAction);

			builder.HasOne<SubThree>()
				   .WithMany()
				   .HasForeignKey(x => x.SubThreeId)
				   .OnDelete(DeleteBehavior.NoAction);
		}
	}
}