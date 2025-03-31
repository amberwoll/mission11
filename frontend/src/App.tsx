import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />}></Route>
          <Route path="/donate/:title" element={<CartPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
