using Backend.DTOs.Items;

namespace Backend.Interfaces
{
	public interface IItemServices
	{
		Task<List<GetItemsDto>> GetItemsWithPaginationAsync(int? subTwoId, int? subThreeId, int page = 1, int pageSize = 30);
		Task<GetItemDto?> GetItemByItemNoAsync(string itemNo);
		Task<string?> GetImageByItemNoAndImageIdAsync(string itemNo, string imageId);
		Task AddImagesToItemAsync(string itemNo, List<IFormFile>? images);
		Task<List<GetItemsDto>> SearchItemsAsync(string term, int? subTwoId = null, int? subThreeId = null, int page = 1, int pageSize = 30);
	}
}
