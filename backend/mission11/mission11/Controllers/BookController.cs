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
        public IActionResult GetBooks(int pageHowMany, int pageNum)
        {
            var bookList = _bookContext.Books
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList(); // makes list of books
            
            var totalBooks = _bookContext.Books.Count();
            // OK converts it to json
            return Ok(new
            {
                Books = bookList,
                TotalBooks = totalBooks
            });
        }

    }
}