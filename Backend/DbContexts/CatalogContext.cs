using Backend.Entities;
using Backend.EntityConfiguration;
using Microsoft.EntityFrameworkCore;

namespace Backend.DbContexts
{
	public class CatalogContext : DbContext
	{
		public DbSet<Group> Groups { get; set; }
		public DbSet<SubOne> SubOnes { get; set; }
		public DbSet<SubTwo> SubTwos { get; set; }
		public DbSet<SubThree> SubThrees { get; set; }
		public DbSet<Item> Items { get; set; }

		public CatalogContext(DbContextOptions options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new GroupConfiguration());
			modelBuilder.ApplyConfiguration(new SubOneConfiguration());
			modelBuilder.ApplyConfiguration(new SubTwoConfiguration());
			modelBuilder.ApplyConfiguration(new SubThreeConfiguration());
			modelBuilder.ApplyConfiguration(new ItemConfiguration());


			base.OnModelCreating(modelBuilder);
		}
	}
}
