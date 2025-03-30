import { useEffect, useState } from 'react';
import { book } from './types/book';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);

  // Fetching bowlers and filtering them based on Team Name (Marlins or Sharks)
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:7000/Book/GetBook');
      const data = await response.json();

      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      {books.map((book) => (
        <div id="bookCard" className="card" key={book.bookID}>
          <h3 className="card-title">{book.title}</h3>
          <h5>By {book.author}</h5>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Publisher:</strong> {book.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}
              </li>
              <li>
                <strong>Category/Classification:</strong>
                {book.category}/{book.classification}
              </li>
              <li>
                <strong></strong>Number of Pages: {book.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${book.price}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default BookList;
