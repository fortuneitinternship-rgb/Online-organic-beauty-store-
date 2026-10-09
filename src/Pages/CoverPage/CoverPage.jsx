import { Link } from "react-router-dom";

const CoverPage = () => {
  return (
    <div className="cover-page">
      <div className="cover-content">
        <p className="small-title">WELCOME TO</p>

        <h1>PURE GLOW</h1>

        <h2>Organic Beauty Store</h2>

        <p>
          Natural beauty products carefully selected for your everyday
          skincare, haircare and body care.
        </p>

        <Link to="/home" className="main-btn">
          Explore Store
        </Link>
      </div>
    </div>
  );
};

export default CoverPage;