import { useEffect, useState } from 'react';
import { book } from '../types/book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading bookstore...</p>;
  if (error) return <p className="text-red-500">Error: {error} </p>;

  return (
    <>
      <label>Sort order:</label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="none">Default</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/addcart/${book.title}/${book.bookID}/${book.price}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <br />
      <label>Results per page: </label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
    </>
  );
}

export default BookList;
