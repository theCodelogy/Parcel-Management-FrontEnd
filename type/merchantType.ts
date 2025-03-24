export type TMerchant = {
    codCharge: {
      insideCity: number;
      subCity: number;
      outsideCity: number;
    };
    _id: string;
    businessName: string;
    name: string;
    email: string;
    phone: string;
    role: "Merchant";
    openingBalance: number;
    password: string;
    vat: number;
    hub: string;
    nid: string;
    status: "Pending" | "Active" | "Inactive";
    tradeLicense: string;
    image: string;
    referenceName: string;
    referencePhone: string;
    paymentPeriod: number;
    walletUseActivation: boolean;
    address: string;
    returnCharges: number;
    createdAt: string;
    updatedAt: string;
  };
  