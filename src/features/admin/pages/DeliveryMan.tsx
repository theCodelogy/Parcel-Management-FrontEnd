import DeliveryManTable from "../components/DeliveryManTable";
import FilterForm from "../components/FilterBar";

const DeliveryMan = () => {
  return (
    <div>
      <FilterForm />
      <DeliveryManTable />
    </div>
  );
};

export default DeliveryMan;
