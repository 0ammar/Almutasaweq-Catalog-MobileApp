namespace Backend.Entities
{
	public class Item
	{
		public string ItemNo { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public List<string> Images { get; set; }
		public DateTime CreationDate { get; set; }
		public bool IsDeleted { get; set; }
		public int? SubTwoId { get; set; }
		public int? SubThreeId { get; set; }
	}
}
