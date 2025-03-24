import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaUsers,
  FaCreditCard,
  FaHandshake,
  FaWarehouse,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { fetchdeliveryManApi } from "../services/deliveryManApi";

const Stats = () => {
  const [deliveryManCount, setDeliveryManCount] = useState(0);

  useEffect(() => {
    const getDeliveryMen = async () => {
      try {
        const data = await fetchdeliveryManApi();
        setDeliveryManCount(data.length);
      } catch (error) {
        console.error("Error fetching delivery man data:", error);
      }
    };

    getDeliveryMen();
  }, []);

  const cards = [
    {
      title: "Total Parcel",
      count: 0,
      link: "https://cte.fitspick.com/admin/parcel/index",
      icon: <FaBoxOpen size={30} />,
    },
    {
      title: "Total User",
      count: 2,
      link: "https://cte.fitspick.com/admin/users",
      icon: <FaUsers size={30} />,
    },
    {
      title: "Total Merchant",
      count: 2,
      link: "https://cte.fitspick.com/admin/merchant/index",
      icon: <FaUsers size={30} />,
    },
    {
      title: "Total Delivery Man",
      count: deliveryManCount,
      link: "/admin/delivery-man",
      icon: <FiUsers size={30} />,
    },
    {
      title: "Total Branch",
      count: 0,
      link: "https://cte.fitspick.com/admin/hubs",
      icon: <FaWarehouse size={30} />,
    },
    {
      title: "Total Accounts",
      count: 0,
      link: "https://cte.fitspick.com/admin/accounts/index",
      icon: <FaCreditCard size={30} />,
    },
    {
      title: "Total Partial Delivered",
      count: 0,
      link: "https://cte.fitspick.com/admin/parcel/filter?parcel_status=32",
      icon: <FaHandshake size={30} />,
    },
    {
      title: "Total Parcels Delivered",
      count: 0,
      link: "https://cte.fitspick.com/admin/parcel/filter?parcel_status=9",
      icon: <FaHandshake size={30} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <a
          key={index}
          href={card.link}
          className="block bg-white p-4 rounded-lg shadow-md hover:scale-105 transition"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 text-[#7E0095] rounded-full">{card.icon}</div>
            <div>
              <h5 className="text-[#7E0095]">{card.title}</h5>
              <h1 className="text-[#7E0095] text-2xl font-bold">
                {card.count}
              </h1>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Stats;
