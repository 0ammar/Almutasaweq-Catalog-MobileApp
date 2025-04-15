using Backend.DbContexts;
using Backend.DTOs.Items;
using Backend.Helpers;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Implementations
{
	public class ItemServices : IItemServices
	{
		private readonly CatalogContext _context;
		private readonly string _imagesFolderPath;

		public ItemServices(CatalogContext context, IWebHostEnvironment env)
		{
			_context = context;
			_imagesFolderPath = Path.Combine(env.WebRootPath, "UploadedImages");

			if (!Directory.Exists(_imagesFolderPath))
				Directory.CreateDirectory(_imagesFolderPath);
		}

		public async Task<List<GetItemsDto>> GetItemsWithPaginationAsync(int? subTwoId, int? subThreeId, int page = 1, int pageSize = 30)
		{
			var query = _context.Items.AsQueryable();

			if (subThreeId.HasValue)
				query = query.Where(i => i.SubThreeId == subThreeId.Value);
			else if (subTwoId.HasValue)
				query = query.Where(i => i.SubTwoId == subTwoId.Value && i.SubThreeId == null);

			var items = await query
				.OrderBy(i => i.ItemNo)
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.AsNoTracking()
				.ToListAsync()
				.ConfigureAwait(false);

			return items.Select(i => new GetItemsDto
			{
				ItemNo = i.ItemNo,
				Name = i.Name,
				FirstImage = i.Images?.FirstOrDefault() ?? "no-image.png"
			}).ToList();
		}

		public async Task<List<GetItemsDto>> SearchItemsAsync(string term, int? subTwoId = null, int? subThreeId = null, int page = 1, int pageSize = 30)
		{
			var lowered = term.Trim().ToLower();

			var query = _context.Items
				.AsNoTracking()
				.Where(i =>
					EF.Functions.Like(i.ItemNo.ToLower(), $"%{lowered}%") ||
					EF.Functions.Like(i.Name.ToLower(), $"%{lowered}%"));

			if (subThreeId.HasValue)
				query = query.Where(i => i.SubThreeId == subThreeId);
			else if (subTwoId.HasValue)
				query = query.Where(i => i.SubTwoId == subTwoId && i.SubThreeId == null);

			var pagedItems = await query
				.OrderBy(i => i.ItemNo)
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToListAsync()
				.ConfigureAwait(false);

			return pagedItems.Select(i => new GetItemsDto
			{
				ItemNo = i.ItemNo,
				Name = i.Name,
				FirstImage = i.Images?.FirstOrDefault() ?? "no-image.png"
			}).ToList();
		}

		public async Task<GetItemDto?> GetItemByItemNoAsync(string itemNo)
		{
			var item = await _context.Items.FindAsync(itemNo).ConfigureAwait(false);
			if (item == null) return null;

			return new GetItemDto
			{
				ItemNo = item.ItemNo,
				Name = item.Name,
				Description = item.Description,
				Images = item.Images
			};
		}

		public async Task<string?> GetImageByItemNoAndImageIdAsync(string itemNo, string imageId)
		{
			var item = await _context.Items
				.AsNoTracking()
				.FirstOrDefaultAsync(x => x.ItemNo == itemNo)
				.ConfigureAwait(false);

			if (item == null)
				return null;

			var image = item.Images?.FirstOrDefault(img => img == imageId);
			return image;
		}

		public async Task AddImagesToItemAsync(string itemNo, List<IFormFile>? images)
		{
			var item = await _context.Items.FindAsync(itemNo).ConfigureAwait(false)
				?? throw new KeyNotFoundException("Item not found.");

			item.Images ??= [];

			if (images?.Any() == true)
			{
				foreach (var image in images)
				{
					var fileName = FileHelper.GenerateImageFileName(image);
					var savePath = FileHelper.GetImageSavePath(_imagesFolderPath, fileName);

					await ImageHelper.CompressAndSaveAsync(image, savePath).ConfigureAwait(false);

					item.Images.Add(fileName);
				}
			}

			await _context.SaveChangesAsync().ConfigureAwait(false);
		}
	}
}
