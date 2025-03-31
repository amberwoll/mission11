import { useEffect, useState } from 'react';

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:7000/Book/GetBookTypes'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div>
        <h5>Project Types</h5>
        {categories.map((c) => (
          <div key={c}>
            <input type="checkbox" id={c} value={c} />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryFilter;
