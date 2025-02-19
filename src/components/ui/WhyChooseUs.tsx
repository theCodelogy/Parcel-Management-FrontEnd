const services = [
    {
      id: 1,
      title: "Timely Delivery",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/timly-delivery.png",
    },
    {
      id: 2,
      title: "Limitless Pickup",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/limitless-pickup.png",
    },
    {
      id: 3,
      title: "Cash on Delivery (COD)",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/cash-on-delivery.png",
    },
    {
      id: 4,
      title: "Get Payment Any Time",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/payment.png",
    },
    {
      id: 5,
      title: "Secure Handling",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/handling.png",
    },
    {
      id: 6,
      title: "Live Tracking Update",
      image: "https://cte.fitspick.com/public/frontend/images/whycourier/live-tracking.png",
    },
  ];
  
  export default function WhyChooseUs() {
    return (
      <section className="py-12 ">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">
            <span className="border-b-4 border-[#A31621] pb-1">
              Why City & Town Express
            </span>
          </h3>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-5 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#A31621] hover:text-white"
              >
                <div className="flex justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
                <h5 className="mt-4 text-lg font-semibold">{service.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  