import { Link, useParams } from "react-router-dom";

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border p-8 text-center">
        <h1 className="text-3xl font-bold text-success">Order Placed Successfully</h1>
        <p className="mt-4 text-lg">Your order number is:</p>
        <p className="mt-2 text-2xl font-bold text-primary">{orderNumber}</p>

        <div className="mt-8">
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;