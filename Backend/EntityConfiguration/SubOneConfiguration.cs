using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.EntityConfiguration
{
	public class SubOneConfiguration : IEntityTypeConfiguration<SubOne>
	{
		public void Configure(EntityTypeBuilder<SubOne> builder)
		{
			builder.ToTable("SubOnes");
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Id).IsRequired();

			builder.Property(u => u.IsDeleted).HasDefaultValue(false);
			builder.Property(u => u.CreationDate).IsRequired().HasDefaultValueSql("GETDATE()");

			builder.Property(x => x.Name).IsRequired(true).IsUnicode(false).HasMaxLength(50);
			builder.HasIndex(x => x.Name).IsUnique(true);
			builder.ToTable(x => x.HasCheckConstraint("CH_Name_Length", "Len(Name) >= 3"));

			builder.Property(x => x.Image)
				.HasMaxLength(1000)
				.IsRequired(false);

			builder.HasMany<SubTwo>().WithOne().HasForeignKey(x => x.SubOneId).OnDelete(DeleteBehavior.NoAction);
		}
	}
}