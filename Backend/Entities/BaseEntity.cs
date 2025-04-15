namespace Backend.Entities
{
	public class BaseEntity
	{
		public int Id { get; set; }
		public DateTime CreationDate { get; set; }
		public bool IsDeleted { get; set; }
	}
}
