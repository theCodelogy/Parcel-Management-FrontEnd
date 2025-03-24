export type TDeliveryMan = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "Delivery Man";
    deliveryCharge: number;
    returnCharge: number;
    pickupCharge: number;
    openingBalance: number;
    password: string;
    salary: number;
    status: "Active" | "Inactive" | "Pending";
    hub: string;
    drivingLicence: string;
    image: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  