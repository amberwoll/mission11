import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { title } = useParams();

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} to Cart</h2>
      <div>
        <label htmlFor="bookQuantity">Enter quantity: </label>
        <input id="bookQuantity" type="number" defaultValue={1} min={1} />
        <button>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}

export default CartPage;
