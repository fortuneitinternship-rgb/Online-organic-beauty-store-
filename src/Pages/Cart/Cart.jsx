import { Link } from "react-router-dom";

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="section">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-box">
          <h2>Your cart is empty</h2>
          <Link to="/search" className="main-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <button onClick={() => updateQuantity(item.id, -1)}>
                  -
                </button>

                <span className="quantity">{item.quantity}</span>

                <button onClick={() => updateQuantity(item.id, 1)}>
                  +
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ₹{total}</h2>

            <Link to="/checkout" className="main-btn">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;