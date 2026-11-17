import { Link } from "react-router-dom";
import OrderCard from "../../Components/OrderCard/OrderCard";

const MyOrders = () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="section">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-box">
          <h2>No orders yet</h2>

          <Link to="/search" className="main-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <OrderCard order={order} />

            <Link
              to={`/order/${order.id}`}
              className="view-btn"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;