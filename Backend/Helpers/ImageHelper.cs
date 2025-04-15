using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace Backend.Helpers
{
	public static class ImageHelper
	{
		public static async Task CompressAndSaveAsync(IFormFile file, string path)
		{
			using var image = await Image.LoadAsync(file.OpenReadStream());

			image.Mutate(x => x.Resize(new ResizeOptions
			{
				Mode = ResizeMode.Max,
				Size = new Size(800, 800)
			}));
			await image.SaveAsync(path);
		}
	}

	public static class FileHelper
	{
		public static string GenerateImageFileName(IFormFile file)
			=> $"{Guid.NewGuid()}_{file.FileName}";

		public static string GetImageSavePath(string folder, string fileName)
			=> Path.Combine(folder, fileName);
	}
}
