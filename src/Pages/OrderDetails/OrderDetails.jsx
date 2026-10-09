import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return <div className="section">Order not found.</div>;
  }

  return (
    <div className="section">
      <h1>Order Details</h1>

      <div className="order-card">
        <h2>Order #{order.id}</h2>
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        <p>Payment: {order.payment}</p>
        <p>Address: {order.address}</p>

        <h3>Products</h3>

        {order.items.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} × {item.quantity} — ₹
              {item.price * item.quantity}
            </p>
          </div>
        ))}

        <h2>Total: ₹{order.total}</h2>

        <Link to={`/invoice/${order.id}`} className="main-btn">
          View Invoice
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;