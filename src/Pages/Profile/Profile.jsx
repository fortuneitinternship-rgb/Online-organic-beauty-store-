import { useNavigate } from "react-router-dom";

const Profile = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="section">
      <div className="profile-box">
        <h1>My Profile</h1>

        <div className="profile-icon">👤</div>

        <h2>{user?.name || "Guest User"}</h2>
        <p>{user?.email || "Please login"}</p>

        <button className="main-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;