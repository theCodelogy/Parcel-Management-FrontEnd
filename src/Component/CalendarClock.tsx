import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles

type Period = "AM" | "PM";

const CalendarClock: React.FC = () => {
  const now = new Date();
  
  const [date, setDate] = useState<Date>(now);
  const [hour, setHour] = useState<number>(now.getHours() % 12 || 12);
  const [minute, setMinute] = useState<number>(now.getMinutes());
  const [period, setPeriod] = useState<Period>(now.getHours() >= 12 ? "PM" : "AM");

  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      setHour(currentTime.getHours() % 12 || 12);
      setMinute(currentTime.getMinutes());
      setPeriod(currentTime.getHours() >= 12 ? "PM" : "AM");
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-6">
          {/* Calendar Section */}
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <Calendar
              onChange={(value) => setDate(value as Date)}
              value={date}
              className="border rounded-lg w-full"
            />
          </div>

          {/* Clock Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">
              {format(date, "MMMM yyyy")}
            </div>
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold">{hour.toString().padStart(2, "0")}</span>
              <span className="mx-1 text-xl font-bold">:</span>
              <span className="text-2xl font-bold">{minute.toString().padStart(2, "0")}</span>
            </div>
            <button
              className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-full"
              onClick={() => setPeriod(period === "AM" ? "PM" : "AM")}
            >
              {period}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarClock;
