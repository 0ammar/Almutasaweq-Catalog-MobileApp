using Backend.DTOs.Categories;

namespace Backend.Interfaces
{
	public interface ICategoriesServices
	{
		Task<List<GroupDto>> GetAllGroups(HttpRequest request);
		Task<List<SubOneDto>> GetAllSubOnesByGroupId(int input, HttpRequest request);
		Task<List<SubTwoDto>> GetAllSubTwosBySubOnes(int input, HttpRequest request);
		Task<List<SubThreeDto>> GetAllSubThreesBySubTwos(int input, HttpRequest request);

		Task UploadGroupImageAsync(int id, IFormFile file);
		Task UploadSubOneImageAsync(int id, IFormFile file);
		Task UploadSubTwoImageAsync(int id, IFormFile file);
		Task UploadSubThreeImageAsync(int id, IFormFile file);

		Task<bool> DeleteGroupImageAsync(int id, string imageUrl);
		Task<bool> DeleteSubOneImageAsync(int id, string imageUrl);
		Task<bool> DeleteSubTwoImageAsync(int id, string imageUrl);
		Task<bool> DeleteSubThreeImageAsync(int id, string imageUrl);
	}
}
