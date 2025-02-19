import CountUp from "react-countup";
import { FaWarehouse, FaGifts, FaUsers, FaThumbsUp } from "react-icons/fa";

const achievements = [
  { icon: <FaWarehouse size={40} />, count: 7520, suffix: "K+", label: "Branches" },
  { icon: <FaGifts size={40} />, count: 50000000, suffix: "M+", label: "Parcel Delivered" },
  { icon: <FaUsers size={40} />, count: 400000, suffix: "L+", label: "Happy Merchant" },
  { icon: <FaThumbsUp size={40} />, count: 700, suffix: "+", label: "Positive Reviews" }
];

const AchievementSection = () => {
  return (
    <div >
      <div className="">
        <h3 className="text-3xl font-bold text-center mb-5 text-black">
          <span className="border-b-4 border-[#A31621] pb-1">Happy Achievement</span>
        </h3>
      </div>
      <div className=" ">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-black">
                <div className="p-4 bg-[#A31621] rounded-full mb-3">{item.icon}</div>
                <h2 className="text-3xl font-bold">
                  <CountUp start={0} end={item.count} duration={3} separator="," />
                  <span className="text-xl">{item.suffix}</span>
                </h2>
                <p className="text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
