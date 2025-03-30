import { useEffect, useState } from 'react';
import { book } from './types/book';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Fetching bowlers and filtering them based on Team Name (Marlins or Sharks)
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:7000/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  return (
    <>
      {books.map((book) => (
        <div id="bookCard" className="card" key={book.bookID}>
          <h3 className="card-title">{book.title}</h3>
          <h5>By: {book.author}</h5>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Publisher:</strong> {book.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}
              </li>
              <li>
                <strong>Category/Classification: </strong>
                {book.category}/{book.classification}
              </li>
              <li>
                <strong>Number of Pages:</strong> {book.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${book.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <br />
      <label>Results per page: </label>
      <select
        value={pageSize}
        onChange={(p) => setPageSize(Number(p.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <button>Previous</button>

      <button></button>

      <button>Next</button>
    </>
  );
}

export default BookList;
