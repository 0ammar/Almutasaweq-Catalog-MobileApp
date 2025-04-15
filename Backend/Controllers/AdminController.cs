using Backend.DTOs.Items;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace AlmutasaweqCatalog.Controllers
{
	[Route("api")]
	[ApiController]
	[ApiExplorerSettings(GroupName = "BackendAPI")]
	[Tags("Admin Controller")]
	public class AdminController(ICategoriesServices _categoriesServices, IItemServices _itemServices) : ControllerBase
	{
		// ========== POST ==========

		/// <summary>
		/// Upload an image for a Group category.
		/// </summary>
		[HttpPost("group/{id}")]
		public async Task<IActionResult> UploadGroupImage(int id, IFormFile file)
		{
			if (id <= 0 || file == null) return BadRequest("Invalid input.");
			Log.Information("Uploading image for Group ID {Id}", id);

			try
			{
				await _categoriesServices.UploadGroupImageAsync(id, file);
				return Ok("Image uploaded successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Upload an image for a SubOne category.
		/// </summary>
		[HttpPost("subone/{id}")]
		public async Task<IActionResult> UploadSubOneImage(int id, IFormFile file)
		{
			if (id <= 0 || file == null) return BadRequest("Invalid input.");
			Log.Information("Uploading image for SubOne ID {Id}", id);

			try
			{
				await _categoriesServices.UploadSubOneImageAsync(id, file);
				return Ok("Image uploaded successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Upload an image for a SubTwo category.
		/// </summary>
		[HttpPost("subtwo/{id}")]
		public async Task<IActionResult> UploadSubTwoImage(int id, IFormFile file)
		{
			if (id <= 0 || file == null) return BadRequest("Invalid input.");
			Log.Information("Uploading image for SubTwo ID {Id}", id);

			try
			{
				await _categoriesServices.UploadSubTwoImageAsync(id, file);
				return Ok("Image uploaded successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Upload an image for a SubThree category.
		/// </summary>
		[HttpPost("subthree/{id}")]
		public async Task<IActionResult> UploadSubThreeImage(int id, IFormFile file)
		{
			if (id <= 0 || file == null) return BadRequest("Invalid input.");
			Log.Information("Uploading image for SubThree ID {Id}", id);

			try
			{
				await _categoriesServices.UploadSubThreeImageAsync(id, file);
				return Ok("Image uploaded successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Add new images and/or description to an existing item.
		/// </summary>
		[HttpPost("items/{itemNo}/images")]
		public async Task<IActionResult> AddImagesToItem(string itemNo, [FromForm] UploadImagesDto? dto)
		{
			if (string.IsNullOrWhiteSpace(itemNo)) return BadRequest("Invalid ItemNo.");

			try
			{
				await _itemServices.AddImagesToItemAsync(itemNo, dto?.NewImages);
				return Ok("Added successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
			catch (Exception ex) { return StatusCode(500, ex.InnerException?.Message); }
		}

		// ========== DELETE ==========

		/// <summary>
		/// Delete the image of a Group category.
		/// </summary>
		[HttpDelete("group/{id}")]
		public async Task<IActionResult> DeleteGroupImage(int id, [FromQuery] string imageUrl)
		{
			if (id <= 0 || string.IsNullOrWhiteSpace(imageUrl)) return BadRequest("Invalid input.");
			Log.Information("Deleting image for Group ID {Id}", id);

			try
			{
				await _categoriesServices.DeleteGroupImageAsync(id, imageUrl);
				return Ok("Image deleted successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Delete the image of a SubOne category.
		/// </summary>
		[HttpDelete("subone/{id}")]
		public async Task<IActionResult> DeleteSubOneImage(int id, [FromQuery] string imageUrl)
		{
			if (id <= 0 || string.IsNullOrWhiteSpace(imageUrl)) return BadRequest("Invalid input.");
			Log.Information("Deleting image for SubOne ID {Id}", id);

			try
			{
				await _categoriesServices.DeleteSubOneImageAsync(id, imageUrl);
				return Ok("Image deleted successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Delete the image of a SubTwo category.
		/// </summary>
		[HttpDelete("subtwo/{id}")]
		public async Task<IActionResult> DeleteSubTwoImage(int id, [FromQuery] string imageUrl)
		{
			if (id <= 0 || string.IsNullOrWhiteSpace(imageUrl)) return BadRequest("Invalid input.");
			Log.Information("Deleting image for SubTwo ID {Id}", id);

			try
			{
				await _categoriesServices.DeleteSubTwoImageAsync(id, imageUrl);
				return Ok("Image deleted successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}

		/// <summary>
		/// Delete the image of a SubThree category.
		/// </summary>
		[HttpDelete("subthree/{id}")]
		public async Task<IActionResult> DeleteSubThreeImage(int id, [FromQuery] string imageUrl)
		{
			if (id <= 0 || string.IsNullOrWhiteSpace(imageUrl)) return BadRequest("Invalid input.");
			Log.Information("Deleting image for SubThree ID {Id}", id);

			try
			{
				await _categoriesServices.DeleteSubThreeImageAsync(id, imageUrl);
				return Ok("Image deleted successfully.");
			}
			catch (KeyNotFoundException ex) { return NotFound(ex.Message); }
			catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
		}
	}
}
