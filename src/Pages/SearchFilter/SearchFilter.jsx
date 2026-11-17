import { useState } from "react";
import products from "../../data/Products";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Filter from "../../Components/Filter/Filter";

const SearchFilter = ({ onWishlist, wishlist }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const result = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="section">
      <h1>Search & Filter</h1>

      <div className="search-area">
        <SearchBar value={search} onChange={setSearch} />
        <Filter category={category} setCategory={setCategory} />
      </div>

      <div className="product-grid">
        {result.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlist={onWishlist}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
          />
        ))}
      </div>

      {result.length === 0 && <p>No products found.</p>}
    </div>
  );
};

export default SearchFilter;