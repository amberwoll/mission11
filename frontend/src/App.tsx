import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewCartPage from './pages/ViewCartPage';
import AddCartPage from './pages/AddCartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />}></Route>
            <Route
              path="/addcart/:title/:bookID/:price"
              element={<AddCartPage />}
            ></Route>
            <Route path="/viewcart" element={<ViewCartPage />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
