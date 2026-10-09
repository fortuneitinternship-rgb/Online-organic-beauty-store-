import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/Products";

const ProductDetails = ({ addToCart, onWishlist, wishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2 className="section">Product not found</h2>;
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div>
        <p>{product.category}</p>
        <h1>{product.name}</h1>
        <h2>₹{product.price}</h2>
        <p>⭐ {product.rating}</p>

        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Ingredients</h3>
        <p>{product.ingredients}</p>

        <button
          className="main-btn"
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>

        <button
          className="secondary-btn"
          onClick={() => onWishlist(product)}
        >
          {isWishlisted ? "♥ Remove Wishlist" : "♡ Add to Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;