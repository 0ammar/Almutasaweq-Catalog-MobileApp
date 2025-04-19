using Backend.DTOs.Items;
using Backend.Helpers;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Backend.Controllers
{
	[Route("api")]
	[ApiController]
	[ApiExplorerSettings(GroupName = "BackendAPI")]
	[Tags("Main Controller")]
	public class MainController(ICategoriesServices _categoriesServices, IItemServices _itemServices) : ControllerBase
	{
		/// <summary>
		/// Get all available product groups with images.
		/// </summary>
		[HttpGet("groups")]
		public async Task<IActionResult> GetAllGroups()
		{
			Log.Information("GET /groups started");
			try
			{
				var groups = await _categoriesServices.GetAllGroups(Request);
				return Ok(groups);
			}
			catch (Exception ex)
			{
				Log.Error(ex, "Error in GET /groups");
				return StatusCode(500, "Internal Server Error");
			}
		}

		/// <summary>
		/// Get SubOne categories for a given Group ID.
		/// </summary>
		[HttpGet("subones/{groupId}")]
		public async Task<IActionResult> GetSubOnesByGroupId(int groupId)
		{
			if (groupId <= 0) return BadRequest("Invalid Group ID");

			Log.Information("GET /subones/{GroupId} started", groupId);
			try
			{
				var result = await _categoriesServices.GetAllSubOnesByGroupId(groupId, Request);
				return Ok(result);
			}
			catch (KeyNotFoundException ex)
			{
				Log.Warning(ex, "Group not found: {GroupId}", groupId);
				return NotFound(ex.Message);
			}
			catch (Exception ex)
			{
				Log.Error(ex, "Error in GET /subones/{GroupId}");
				return StatusCode(500, "Internal Server Error");
			}
		}

		/// <summary>
		/// Get SubTwo categories for a given SubOne ID.
		/// </summary>
		[HttpGet("subtwos/{subOneId}")]
		public async Task<IActionResult> GetSubTwosBySubOneId(int subOneId)
		{
			if (subOneId <= 0) return BadRequest("Invalid SubOne ID");

			Log.Information("GET /subtwos/{SubOneId} started", subOneId);
			try
			{
				var result = await _categoriesServices.GetAllSubTwosBySubOnes(subOneId, Request);
				return Ok(result);
			}
			catch (KeyNotFoundException ex)
			{
				Log.Warning(ex, "SubOne not found: {SubOneId}", subOneId);
				return NotFound(ex.Message);
			}
			catch (Exception ex)
			{
				Log.Error(ex, "Error in GET /subtwos/{SubOneId}");
				return StatusCode(500, "Internal Server Error");
			}
		}

		/// <summary>
		/// Get SubThree categories for a given SubTwo ID.
		/// </summary>
		[HttpGet("subthrees/{subTwoId}")]
		public async Task<IActionResult> GetSubThreesBySubTwoId(int subTwoId)
		{
			if (subTwoId <= 0) return BadRequest("Invalid SubTwo ID");

			Log.Information("GET /subthrees/{SubTwoId} started", subTwoId);
			try
			{
				var result = await _categoriesServices.GetAllSubThreesBySubTwos(subTwoId, Request);
				return Ok(result);
			}
			catch (KeyNotFoundException ex)
			{
				Log.Warning(ex, "SubTwo not found: {SubTwoId}", subTwoId);
				return NotFound(ex.Message);
			}
			catch (Exception ex)
			{
				Log.Error(ex, "Error in GET /subthrees/{SubTwoId}");
				return StatusCode(500, "Internal Server Error");
			}
		}

		/// <summary>
		/// Get All Items By Searching.
		/// </summary>
		[HttpGet("items/search")]
		public async Task<IActionResult> SearchItems([FromQuery] string term, [FromQuery] int? subTwoId, [FromQuery] int? subThreeId, [FromQuery] int page = 1, [FromQuery] int pageSize = 30)
		{
			if (string.IsNullOrWhiteSpace(term)) return BadRequest("Search term is required.");
			if (page <= 0 || pageSize <= 0) return BadRequest("Page and pageSize must be positive integers.");

			var results = await _itemServices.SearchItemsAsync(term, subTwoId, subThreeId, page, pageSize);
			var resultWithUrls = (from i in results
								  select new GetItemsDto
								  {
									  ItemNo = i.ItemNo,
									  Name = i.Name,
									  FirstImage = UrlHelper.GetImageUrl(i.FirstImage, Request)
								  }).ToList();

			return Ok(resultWithUrls);
		}

		/// <summary>
		/// Get All Items.
		/// </summary>
		[HttpGet("items")]
		public async Task<IActionResult> GetItems([FromQuery] int? subTwoId, [FromQuery] int? subThreeId, [FromQuery] int page = 1)
		{
			if (subTwoId == null && subThreeId == null) return BadRequest("Please provide either SubTwoId or SubThreeId.");
			if (page <= 0) return BadRequest("Page must be positive integer.");

			var items = await _itemServices.GetItemsWithPaginationAsync(subTwoId, subThreeId, page);
			var resultWithUrls = (from i in items
								  select new GetItemsDto
								  {
									  ItemNo = i.ItemNo,
									  Name = i.Name,
									  FirstImage = UrlHelper.GetImageUrl(i.FirstImage, Request)
								  }).ToList();

			return Ok(resultWithUrls);
		}

		/// <summary>
		/// Get full details of a specific item by ItemNo.
		/// </summary>
		[HttpGet("items/{itemNo}")]
		public async Task<IActionResult> GetItemByItemNo(string itemNo)
		{
			if (string.IsNullOrWhiteSpace(itemNo)) return BadRequest("Invalid ItemNo.");

			var item = await _itemServices.GetItemByItemNoAsync(itemNo);
			if (item == null) return NotFound($"No item found with ItemNo {itemNo}.");

			return Ok(item);
		}

		/// <summary>
		/// Get an image by its item number and image id.
		/// </summary>
		[HttpGet("items/{itemNo}/images/{imageId}")]
		public async Task<IActionResult> GetItemImage(string itemNo, string imageId)
		{
			var image = await _itemServices.GetImageByItemNoAndImageIdAsync(itemNo, imageId);
			if (image == null)
				return NotFound("Image not found for this item.");

			var imageUrl = UrlHelper.GetImageUrl(image, Request);
			return Ok(new { imageUrl });
		}
	}
}
