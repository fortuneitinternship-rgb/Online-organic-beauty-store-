import { Link } from "react-router-dom";

const ProductCard = ({ product, onWishlist, isWishlisted }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />

        <button
          className="wishlist-btn"
          onClick={() => onWishlist(product)}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>⭐ {product.rating}</p>
        <h3>₹{product.price}</h3>

        <Link to={`/product/${product.id}`} className="view-btn">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;