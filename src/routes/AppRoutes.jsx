import { Routes, Route } from "react-router-dom";

import CoverPage from "../Pages/CoverPage/CoverPage";
import Registration from "../Pages/Registration/Registration";
import Home from "../Pages/Home/Home";
import SearchFilter from "../Pages/SearchFilter/SearchFilter";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Login from "../Pages/Login/Login";
import Checkout from "../Pages/Checkout/Checkout";
import OrderConfirmation from "../Pages/OrderConfirmation/OrderConfirmation";
import MyOrders from "../Pages/MyOrders/MyOrders";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import Invoice from "../Pages/Invoice/Invoice";
import Profile from "../Pages/Profile/Profile";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />

      <Route
        path="/register"
        element={<Registration />}
      />

      <Route
        path="/login"
        element={<Login {...props} />}
      />

      <Route
        path="/home"
        element={<Home {...props} />}
      />

      <Route
        path="/search"
        element={<SearchFilter {...props} />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails {...props} />}
      />

      <Route
        path="/cart"
        element={<Cart {...props} />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist {...props} />}
      />

      <Route
        path="/checkout"
        element={<Checkout {...props} />}
      />

      <Route
        path="/order-confirmation"
        element={<OrderConfirmation {...props} />}
      />

      <Route
        path="/orders"
        element={<MyOrders />}
      />

      <Route
        path="/order/:id"
        element={<OrderDetails />}
      />

      <Route
        path="/invoice/:id"
        element={<Invoice />}
      />

      <Route
        path="/profile"
        element={<Profile {...props} />}
      />
    </Routes>
  );
};

export default AppRoutes;