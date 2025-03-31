using mission11.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }
        
        
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, string sortOrder = "none")
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting if sortOrder is not "none"
            if (sortOrder.ToLower() == "asc")
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }
            else if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }

            var bookList = booksQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = bookList,
                TotalBooks = totalBooks
            });
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);


        }
    }
}