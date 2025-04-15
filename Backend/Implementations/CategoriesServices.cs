using Backend.DbContexts;
using Backend.DTOs.Categories;
using Backend.Helpers;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Implementations
{
	public class CategoriesServices : ICategoriesServices
	{
		private readonly CatalogContext _context;
		private readonly string _imagesFolderPath;

		public CategoriesServices(CatalogContext context, IWebHostEnvironment env)
		{
			_context = context;
			_imagesFolderPath = Path.Combine(env.WebRootPath, "UploadedImages");

			if (!Directory.Exists(_imagesFolderPath))
				Directory.CreateDirectory(_imagesFolderPath);
		}


		// Read Services
		public async Task<List<GroupDto>> GetAllGroups(HttpRequest request)
		{
			var groups = await _context.Groups.AsNoTracking().ToListAsync();
			return groups.Select(g => new GroupDto
			{
				Id = g.Id,
				Name = g.Name,
				ImageUrl = UrlHelper.GetImageUrl(g.Image, request)
			}).ToList();
		}

		public async Task<List<SubOneDto>> GetAllSubOnesByGroupId(int groupId, HttpRequest request)
		{
			if (!await _context.Groups.AnyAsync(g => g.Id == groupId))
				throw new KeyNotFoundException("Group not found");

			var subOnes = await _context.SubOnes.Where(s => s.GroupId == groupId).AsNoTracking().ToListAsync();
			return subOnes.Select(s => new SubOneDto
			{
				Id = s.Id,
				Name = s.Name,
				ImageUrl = UrlHelper.GetImageUrl(s.Image, request)
			}).ToList();
		}

		public async Task<List<SubTwoDto>> GetAllSubTwosBySubOnes(int subOneId, HttpRequest request)
		{
			var exists = await _context.SubOnes.AnyAsync(s => s.Id == subOneId).ConfigureAwait(false);
			if (!exists)
				throw new KeyNotFoundException("SubOne not found");

			var subTwos = await _context.SubTwos
				.Where(s => s.SubOneId == subOneId)
				.AsNoTracking()
				.ToListAsync()
				.ConfigureAwait(false);

			return subTwos.Select(st => new SubTwoDto
			{
				Id = st.Id,
				Name = st.Name,
				ImageUrl = UrlHelper.GetImageUrl(st.Image, request)
			}).ToList();
		}

		public async Task<List<SubThreeDto>> GetAllSubThreesBySubTwos(int subTwoId, HttpRequest request)
		{
			var exists = await _context.SubTwos.AnyAsync(s => s.Id == subTwoId).ConfigureAwait(false);
			if (!exists)
				throw new KeyNotFoundException("SubTwo not found");

			var subThrees = await _context.SubThrees
				.Where(s => s.SubTwoId == subTwoId)
				.AsNoTracking()
				.ToListAsync()
				.ConfigureAwait(false);

			return subThrees.Select(st => new SubThreeDto
			{
				Id = st.Id,
				Name = st.Name,
				ImageUrl = UrlHelper.GetImageUrl(st.Image, request)
			}).ToList();
		}


		// Add Images Services
		public async Task UploadGroupImageAsync(int id, IFormFile file)
		{
			var group = await _context.Groups.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("Group doesn't exist");

			if (!string.IsNullOrEmpty(group.Image))
				throw new InvalidOperationException("Group already has image");

			group.Image = await UploadCategoryImageAsync(file);
			await _context.SaveChangesAsync().ConfigureAwait(false);
		}

		public async Task UploadSubOneImageAsync(int id, IFormFile file)
		{
			var subOne = await _context.SubOnes.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubOne doesn't exist");

			if (!string.IsNullOrEmpty(subOne.Image))
				throw new InvalidOperationException("SubOne already has image");

			subOne.Image = await UploadCategoryImageAsync(file);
			await _context.SaveChangesAsync().ConfigureAwait(false);
		}

		public async Task UploadSubTwoImageAsync(int id, IFormFile file)
		{
			var subTwo = await _context.SubTwos.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubTwo doesn't exist");

			if (!string.IsNullOrEmpty(subTwo.Image))
				throw new InvalidOperationException("SubTwo already has image");

			subTwo.Image = await UploadCategoryImageAsync(file);
			await _context.SaveChangesAsync().ConfigureAwait(false);
		}

		public async Task UploadSubThreeImageAsync(int id, IFormFile file)
		{
			var subThree = await _context.SubThrees.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubThree doesn't exist");

			if (!string.IsNullOrEmpty(subThree.Image))
				throw new InvalidOperationException("SubThree already has image");

			subThree.Image = await UploadCategoryImageAsync(file);
			await _context.SaveChangesAsync().ConfigureAwait(false);
		}

		// Delete Images Services
		public async Task<bool> DeleteGroupImageAsync(int id, string imageUrl)
		{
			var group = await _context.Groups.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("Group doesn't exist");

			if (string.IsNullOrEmpty(group.Image) || group.Image != imageUrl)
				throw new InvalidOperationException("Image not found or doesn't match");

			DeleteCategoryImage(group.Image);
			group.Image = null!;
			await _context.SaveChangesAsync().ConfigureAwait(false);
			return true;
		}

		public async Task<bool> DeleteSubOneImageAsync(int id, string imageUrl)
		{
			var subOne = await _context.SubOnes.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubOne doesn't exist");

			if (string.IsNullOrEmpty(subOne.Image) || subOne.Image != imageUrl)
				throw new InvalidOperationException("Image not found or doesn't match");

			DeleteCategoryImage(subOne.Image);
			subOne.Image = null!;
			await _context.SaveChangesAsync().ConfigureAwait(false);
			return true;
		}

		public async Task<bool> DeleteSubTwoImageAsync(int id, string imageUrl)
		{
			var subTwo = await _context.SubTwos.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubTwo doesn't exist");

			if (string.IsNullOrEmpty(subTwo.Image) || subTwo.Image != imageUrl)
				throw new InvalidOperationException("Image not found or doesn't match");

			DeleteCategoryImage(subTwo.Image);
			subTwo.Image = null!;
			await _context.SaveChangesAsync().ConfigureAwait(false);
			return true;
		}

		public async Task<bool> DeleteSubThreeImageAsync(int id, string imageUrl)
		{
			var subThree = await _context.SubThrees.FindAsync(id).ConfigureAwait(false)
				?? throw new KeyNotFoundException("SubThree doesn't exist");

			if (string.IsNullOrEmpty(subThree.Image) || subThree.Image != imageUrl)
				throw new InvalidOperationException("Image not found or doesn't match");

			DeleteCategoryImage(subThree.Image);
			subThree.Image = null!;
			await _context.SaveChangesAsync().ConfigureAwait(false);
			return true;
		}

		private async Task<string> UploadCategoryImageAsync(IFormFile file)
		{
			var fileName = FileHelper.GenerateImageFileName(file);
			var savePath = FileHelper.GetImageSavePath(_imagesFolderPath, fileName);
			await ImageHelper.CompressAndSaveAsync(file, savePath).ConfigureAwait(false);
			return fileName;
		}

		private void DeleteCategoryImage(string? fileName)
		{
			if (string.IsNullOrEmpty(fileName)) return;

			var path = Path.Combine(_imagesFolderPath, fileName);
			if (File.Exists(path))
				File.Delete(path);
		}
	}
}
