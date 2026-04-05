const ContactPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1
        className="text-4xl font-semibold"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Contact Us
      </h1>

      <p className="mt-4 text-gray-600">
        For orders and inquiries, contact Kabayan Shop Saudi through WhatsApp.
      </p>

      <div className="mt-8 space-y-3 text-sm text-gray-800">
        <p><strong>WhatsApp:</strong> +966 XXX XXX XXX</p>
        <p><strong>Delivery:</strong> All over Saudi Arabia</p>
        <p><strong>Payment:</strong> COD / STC PAY on delivery</p>
      </div>
    </div>
  );
};

export default ContactPage;