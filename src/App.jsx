import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [cart, setCart] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [lastOrder, setLastOrder] = useState(null);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const onWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  const props = {
    cart,
    wishlist,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    onWishlist,
    loggedIn,
    setLoggedIn,
    lastOrder,
    setLastOrder
  };

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        wishlistCount={wishlist.length}
      />

      <main>
        <AppRoutes {...props} />
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;