import CalendarClock from "../components/CalendarClock";
import CreateDeliveryMan from "../components/CreateDeliveryMan";
import DeliveryManTable from "../components/DeliveryManTable";
import DynamicChart from "../components/DynamicChart";
import Filter from "../components/Filter";
import FilterForm from "../components/FilterBar";
import LogsDashboard from "../components/LogsDashboard";
import ParcelDashboard from "../components/ParcelDashboard";
import PayoutPage from "../components/PayoutPage";
import Statements from "../components/Statements";
import Stats from "../components/Stats";
import WalletRequest from "../components/WalletRequest";

const AdminDashboard = () => {
  return (
    <div>
      <Stats />
      <Statements />
      <DynamicChart />
      <CalendarClock />
      <CreateDeliveryMan />
      <DeliveryManTable />
      <Filter />
      <FilterForm />
      <LogsDashboard />
      <ParcelDashboard />
      <PayoutPage />
      <WalletRequest />
    </div>
  );
};

export default AdminDashboard;
