import { book } from '../types/book';

interface FetchBooksResponse {
  books: book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCats=${encodeURIComponent(cat)}`)
      .join('&');

    const url = `https://localhost:7000/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch prohects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
};
