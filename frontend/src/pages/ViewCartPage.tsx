import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cartItem } from '../types/cartItem';

function ViewCartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <>
      <div>
        <h2>Your cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item: cartItem) => (
                <li key={item.bookID}>
                  {item.quantity} x {item.title}: ${item.price.toFixed(2)} ||
                  Item Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button>Checkout</button>
        <button onClick={() => navigate('/')}>Continue Browsing</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </>
  );
}

export default ViewCartPage;
