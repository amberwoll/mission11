import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { cartItem } from '../types/cartItem';
import { useState } from 'react';

function AddCartPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: cartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity,
    };
    addToCart(newItem);
    navigate('/viewcart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} to Cart</h2>
      <div>
        <label htmlFor="bookQuantity">Enter quantity: </label>
        <input
          id="bookQuantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}

export default AddCartPage;
