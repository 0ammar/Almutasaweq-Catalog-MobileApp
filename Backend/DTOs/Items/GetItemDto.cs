namespace Backend.DTOs.Items
{
	public class GetItemDto
	{
		public string ItemNo { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public List<string>? Images { get; set; }
	}
}
