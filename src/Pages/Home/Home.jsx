import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/Products";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Home = ({ onWishlist, wishlist }) => {
  const [category, setCategory] = useState("All");

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div>
      <section className="hero">
        <div>
          <p>100% NATURAL BEAUTY</p>
          <h1>ONLINE ORGANIC BEAUTY STORE</h1>
          <h2>Pure Glow, Naturally</h2>

          <p>
            Discover beautiful skincare, haircare and body care products
            made with natural ingredients.
          </p>

          <Link to="/search" className="main-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>Shop By Category</h2>

        <div className="categories">
          {["All", "Skincare", "Haircare", "Makeup", "Body Care"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className="category-btn"
              >
                {item}
              </button>
            )
          )}
        </div>

        <h2>Featured Products</h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlist={onWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;