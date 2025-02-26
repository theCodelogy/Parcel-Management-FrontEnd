import CalendarClock from "../components/CalendarClock";
import DynamicChart from "../components/DynamicChart";
import Statements from "../components/Statements";
import Stats from "../components/Stats";

const AdminDashboard = () => {
  return (
    <div>
      <Stats />
      <Statements />
      <DynamicChart />
      <CalendarClock />
    </div>
  );
};

export default AdminDashboard;
