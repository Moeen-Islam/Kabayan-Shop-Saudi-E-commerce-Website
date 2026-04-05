const HeroBanner = () => {
  return (
    <section
      className="relative h-[80vh] min-h-[500px] w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Kabayan Shop Saudi
          </h1>

          <p className="mt-4 text-base md:text-xl">
            Stylish women clothing for Saudi Arabia. Easy order, fast checkout,
            COD and STC PAY on delivery.
          </p>

          <button
            onClick={() => {
              const section = document.getElementById("products");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 rounded-md bg-[#4F39F6] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;