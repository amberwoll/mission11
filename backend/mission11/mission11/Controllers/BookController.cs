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
        public IEnumerable<Book> Get()
        {
            var bookList = _bookContext.Books
                .ToList(); // makes list of teams
    
            return bookList;
        }

    }
}