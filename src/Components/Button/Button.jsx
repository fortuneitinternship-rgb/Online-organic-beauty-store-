const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button type={type} className="main-btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;