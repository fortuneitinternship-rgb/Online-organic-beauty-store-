import { useParams } from "react-router-dom";
import InvoiceComponent from "../../Components/Invoice/Invoice";

const Invoice = () => {
  const { id } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find((item) => item.id === id);

  return (
    <div className="section">
      <InvoiceComponent order={order} />
    </div>
  );
};

export default Invoice;