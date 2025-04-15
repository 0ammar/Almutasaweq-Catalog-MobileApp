using Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.EntityConfiguration
{
	public class GroupConfiguration : IEntityTypeConfiguration<Group>
	{
		public void Configure(EntityTypeBuilder<Group> builder)
		{
			builder.ToTable("Groups", t => t.HasCheckConstraint("CH_Name_Length", "LEN(Name) >= 3"));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Id)
				.IsRequired();

			builder.Property(u => u.IsDeleted)
				.HasDefaultValue(false);

			builder.Property(u => u.CreationDate)
				.IsRequired()
				.HasDefaultValueSql("GETDATE()");

			builder.Property(x => x.Name)
				.IsRequired()
				.IsUnicode(false)
				.HasMaxLength(50);

			builder.HasIndex(x => x.Name)
				.IsUnique();

			builder.Property(x => x.Image)
				.HasMaxLength(1000)
				.IsRequired(false);

			builder.HasMany<SubOne>()
				.WithOne()
				.HasForeignKey(x => x.GroupId)
				.OnDelete(DeleteBehavior.NoAction);
		}
	}
}
