import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        PURE GLOW
        <span>Pure Glow, Naturally</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Shop</Link>
        <Link to="/wishlist">
          Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
        </Link>
        <Link to="/cart">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;