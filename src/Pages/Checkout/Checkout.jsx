import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, clearCart, setLastOrder }) => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const order = {
      id: "PG" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString(),
      total,
      status: "Order Placed",
      address,
      payment,
      items: cart
    };

    setLastOrder(order);

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...oldOrders, order])
    );

    clearCart();

    navigate("/order-confirmation");
  };

  return (
    <div className="section">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={placeOrder}>
        <h2>Delivery Address</h2>

        <textarea
          placeholder="Enter your full address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>Payment Method</h2>

        <label>
          <input
            type="radio"
            value="Cash on Delivery"
            checked={payment === "Cash on Delivery"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="UPI"
            checked={payment === "UPI"}
            onChange={(e) => setPayment(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="Card"
            checked={payment === "Card"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <h2>Total: ₹{total}</h2>

        <button className="main-btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;