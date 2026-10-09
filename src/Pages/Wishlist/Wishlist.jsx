import { Link } from "react-router-dom";

const Wishlist = ({ wishlist, onWishlist }) => {
  return (
    <div className="section">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-box">
          <h2>Your wishlist is empty</h2>
          <p>Add products you love to your wishlist.</p>

          <Link to="/search" className="main-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <h3>₹{product.price}</h3>

              <Link
                to={`/product/${product.id}`}
                className="view-btn"
              >
                View Product
              </Link>

              <button
                className="remove-btn"
                onClick={() => onWishlist(product)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;