import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewCartPage from './pages/ViewCartPage';
import AddCartPage from './pages/AddCartPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />}></Route>
          <Route path="/addcart/:title" element={<AddCartPage />}></Route>
          <Route path="/viewcart" element={<ViewCartPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
