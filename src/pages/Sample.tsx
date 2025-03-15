import {
  useAddParcelMutation,
  useDeleteParcelMutation,
  useGetAllParcelQuery,
  useGetSingleParcelQuery,
  useUpdateParcelMutation,
} from "@/redux/features/parcel/parcelApi";

const Sample = () => {
  const params = [
    { name: "TrakingId", value: "CQBD0423203494" },
    { name: "merchant", value: "GroceryExpfgdfresgfdfsdgs" },
  ];
  // const { data,refetch,isError,isLoading } = useGetAllParcelQuery(params);
  // const {data} = useGetSingleParcelQuery("CQBD0423203494")

  // create parcel
  const [addParcel] = useAddParcelMutation();
  const sampleParcel = {
    TrakingId: "TRK123456789",
    merchant: "Grocery Express",
    pickupPoints: "North Hub",
    pickupPhone: "+16667778888",
    pickupAddress: "Market Street, Greenfield",
    cashCollection: 1200,
    sellingPrice: 1000,
    invoice: "INV-006",
    deliveryType: "Same Day",
    Weight: 3.5,
    customerName: "Sophia Green",
    customerPhone: "+1333444555",
    customerAddress: "12 Garden Lane, Downtown",
    note: "Deliver before 6 PM",
    packaging: "Poly",
    priority: "Normal",
    paymentMethod: "COD",
    deliveryCharge: 55,
    liquidORFragile: 1,
    codCharge: 20,
    totalCharge: 75,
    vat: 8,
    netPayable: 1117,
    advance: 0,
    currentPayable: 717,
  };

  const createHandle = async () => {
    try {
      const res = await addParcel(sampleParcel).unwrap();
      console.log("Parcel added:", res);
    } catch (error) {
      console.error("Failed to add parcel:", error);
    }
  };

  //   update parcel
  const [updateParcel] = useUpdateParcelMutation();
  const arg = {
    id: "67d47f364a09bea975a6c3fb",
    data: {
      pickupPoints: "Nowa Khali",
      pickupPhone: "+16667778888",
      pickupAddress: "Market Street, Greenfield",
      cashCollection: 2000,
    },
  };
  const updateHandle = async () => {
    try {
      const res = await updateParcel(arg).unwrap();
      console.log("Parcel update:", res);
    } catch (error) {
      console.error("Failed update:", error);
    }
  };

// delete parcel
const [deletparcel]= useDeleteParcelMutation()
const deleteHandle = async () => {
    try {
      const res = await deletparcel('67d47f364a09bea975a6c3fb').unwrap();
      console.log("Parcel deleted:", res);
    } catch (error) {
      console.error("Failed delete:", error);
    }
  };

  return (
    <div>
      <button className="mr-4" onClick={createHandle}>Create</button>
      <button className="mr-4"  onClick={updateHandle}>update</button>
      <button onClick={deleteHandle}>delete</button>
    </div>
  );
};

export default Sample;
