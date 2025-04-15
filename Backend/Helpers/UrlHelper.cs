namespace Backend.Helpers
{
	public static class UrlHelper
	{
		public static string GetImageUrl(string? imageFileName, HttpRequest request)
		{
			var baseUrl = $"{request.Scheme}://{request.Host}";
			var finalImage = string.IsNullOrEmpty(imageFileName) ? "no-image.png" : imageFileName;
			return $"{baseUrl}/UploadedImages/{finalImage}";
		}
	}
}
