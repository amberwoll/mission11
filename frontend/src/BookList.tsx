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
        <div id="bookCard">
          <h3>{book.title}</h3>
          <h4>By {book.author}</h4>
          <ul>
            <li>Publisher: {book.publisher}</li>
            <li>ISBN: {book.isbn}</li>
            <li>
              Category/Classification: {book.category}/{book.classification}
            </li>
            <li>Number of Pages: {book.pageCount}</li>
            <li>Price: ${book.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
