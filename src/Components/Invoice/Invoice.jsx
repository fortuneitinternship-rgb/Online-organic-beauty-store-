const Invoice = ({ order }) => {
  return (
    <div className="invoice">
      <h2>PURE GLOW</h2>
      <h3>Invoice</h3>

      <p>Order ID: #{order?.id || "PG001"}</p>
      <p>Date: {order?.date || "2026-10-08"}</p>

      <hr />

      <p>Total Amount: ₹{order?.total || 0}</p>

      <button onClick={() => window.print()} className="main-btn">
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;