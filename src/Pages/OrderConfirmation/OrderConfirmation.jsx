import { Link } from "react-router-dom";

const OrderConfirmation = ({ lastOrder }) => {
  return (
    <div className="success-page">
      <div className="success-box">
        <div className="success-icon">✓</div>

        <h1>Order Confirmed!</h1>

        <p>Thank you for shopping with Pure Glow.</p>

        <h3>Order ID: #{lastOrder?.id}</h3>
        <p>Total: ₹{lastOrder?.total}</p>
        <p>Payment: {lastOrder?.payment}</p>

        <Link to="/orders" className="main-btn">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;