// import React from "react";

// interface OwnerInformation {
//   ownerName: string;
//   mobileNumber: string;
//   ownerEmail: string;
//   ownerImage: File | null;
// }

// interface PickupMethod {
//   address: string;
//   area: string;
// }

// interface PaymentMethod {
//   defaultPayment: string;
//   withdrawal: string;
// }

// interface BankAccount {
//   nameOfBank: string;
//   branch: string;
//   accountHolderName: string;
//   bankAccountNo: string;
// }

// interface OtherAccount {
//   bkash: string;
//   rocket: string;
//   nagad: string;
// }

// type SettingsData =
//   | OwnerInformation
//   | PickupMethod
//   | PaymentMethod
//   | BankAccount
//   | OtherAccount;

// interface SettingsProps {
//   onSubmit?: (data: SettingsData) => void;
// }

// const Settings: React.FC<SettingsProps> = ({ onSubmit }) => {
//   const [activeTab, setActiveTab] = React.useState<number>(0);

//   const [ownerName, setOwnerName] = React.useState<string>("");
//   const [mobileNumber, setMobileNumber] = React.useState<string>("");
//   const [ownerEmail, setOwnerEmail] = React.useState<string>("");
//   const [ownerImage, setOwnerImage] = React.useState<File | null>(null);

//   const [address, setAddress] = React.useState<string>(
//     "Banani Old DOHS Road-6House-76,Apt - 2"
//   );
//   const [area, setArea] = React.useState<string>("Banani");

//   const [defaultPayment, setDefaultPayment] = React.useState<string>("Bank");
//   const [withdrawal, setWithdrawal] = React.useState<string>("Daily");

//   const [nameOfBank, setNameOfBank] = React.useState<string>("");
//   const [branch, setBranch] = React.useState<string>("");
//   const [accountHolderName, setAccountHolderName] = React.useState<string>("");
//   const [bankAccountNo, setBankAccountNo] = React.useState<string>("");

//   const [bkash, setBkash] = React.useState<string>("1320697657");
//   const [rocket, setRocket] = React.useState<string>("");
//   const [nagad, setNagad] = React.useState<string>("");

//   const handleSubmitOwnerInformation = () => {
//     onSubmit?.({
//       ownerName,
//       mobileNumber,
//       ownerEmail,
//       ownerImage,
//     });
//   };

//   const handleSubmitPickupMethod = () => {
//     onSubmit?.({ address, area });
//   };

//   const handleSubmitPaymentMethod = () => {
//     onSubmit?.({ defaultPayment, withdrawal });
//   };

//   const handleSubmitBankAccount = () => {
//     onSubmit?.({
//       nameOfBank,
//       branch,
//       accountHolderName,
//       bankAccountNo,
//     });
//   };

//   const handleSubmitOtherAccount = () => {
//     onSubmit?.({ bkash, rocket, nagad });
//   };

//   const tabs = [
//     "Company Information",
//     "Owner Information",
//     "Pickup Method",
//     "Payment Method",
//     "Bank Account",
//     "Other Account",
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 0:
//         return (
//           <div>
//             <h3 className="mb-2.5">Business Information</h3>
//             <div className="mb-2.5 max-w-xs flex gap-2 items-center">
//               <h3 className="block text-sm font-bold mb-1.25">Company Name</h3>
//               <p>Beargrass</p>
//             </div>
//           </div>
//         );

//       case 1:
//         return (
//           <div>
//             <h3 className="mb-2.5">Owner Information</h3>
//             <div className="mb-2.5 max-w-md">
//               <label className="block text-sm font-bold mb-1.25">Name</label>
//               <input
//                 type="text"
//                 value={ownerName}
//                 onChange={(e) => setOwnerName(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-2.5 max-w-md">
//               <label className="block text-sm font-bold mb-1.25">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-2.5 max-w-md">
//               <label className="block text-sm font-bold mb-1.25">Email</label>
//               <input
//                 type="email"
//                 value={ownerEmail}
//                 onChange={(e) => setOwnerEmail(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-2.5 max-w-md">
//               <label className="block text-sm font-bold mb-1.25">Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files.length > 0) {
//                     setOwnerImage(e.target.files[0]);
//                   }
//                 }}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//               />
//               <div className="mt-1.25 text-sm">
//                 {ownerImage ? ownerImage.name : "No file chosen"}
//               </div>
//             </div>
//             <button
//               onClick={handleSubmitOwnerInformation}
//               className="px-5 py-2.5 bg-purple-500 text-white rounded-md cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="flex flex-row gap-5 items-center">
//             <div className="flex-2">
//               <label className="block text-sm font-bold mb-1.25">
//                 Pickup Address
//               </label>
//               <textarea
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded resize-none"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-bold mb-1.25">
//                 Pickup Area
//               </label>
//               <select
//                 value={area}
//                 onChange={(e) => setArea(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               >
//                 <option value="Banani">Banani</option>
//                 <option value="Gulshan">Gulshan</option>
//                 <option value="Dhanmondi">Dhanmondi</option>
//               </select>
//             </div>
//             <div className="flex-1 mt-6.25">
//               <button
//                 onClick={handleSubmitPickupMethod}
//                 className="w-full p-2.5 bg-purple-500 text-white rounded cursor-pointer"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div>
//             <h3 className="mb-2.5">Payment Method</h3>
//             <div className="mb-2.5 max-w-xs">
//               <label className="block text-sm font-bold mb-1.25">
//                 Default Payment
//               </label>
//               <select
//                 value={defaultPayment}
//                 onChange={(e) => setDefaultPayment(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               >
//                 <option value="Bank">Bank</option>
//                 <option value="Cash on Delivery">Cash on Delivery</option>
//                 <option value="Mobile Banking">Mobile Banking</option>
//               </select>
//             </div>
//             <div className="mb-5 max-w-xs">
//               <label className="block text-sm font-bold mb-1.25">
//                 Withdrawal
//               </label>
//               <select
//                 value={withdrawal}
//                 onChange={(e) => setWithdrawal(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               >
//                 <option value="Daily">Daily</option>
//                 <option value="Weekly">Weekly</option>
//                 <option value="Monthly">Monthly</option>
//               </select>
//             </div>
//             <button
//               onClick={handleSubmitPaymentMethod}
//               className="px-5 py-2.5 bg-purple-500 text-white rounded cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         );

//       case 4:
//         return (
//           <div>
//             <h3 className="mb-2.5">Bank Account</h3>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">
//                 Name Of Bank
//               </label>
//               <input
//                 type="text"
//                 value={nameOfBank}
//                 onChange={(e) => setNameOfBank(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">Branch</label>
//               <input
//                 type="text"
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">
//                 A/C Holder Name
//               </label>
//               <input
//                 type="text"
//                 value={accountHolderName}
//                 onChange={(e) => setAccountHolderName(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">
//                 Bank A/C No
//               </label>
//               <input
//                 type="text"
//                 value={bankAccountNo}
//                 onChange={(e) => setBankAccountNo(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded"
//               />
//             </div>
//             <button
//               onClick={handleSubmitBankAccount}
//               className="px-5 py-2.5 bg-purple-500 text-white border-none rounded cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         );

//       case 5:
//         return (
//           <div>
//             <h3 className="mb-2.5">Other Account</h3>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">Bkash</label>
//               <input
//                 type="text"
//                 value={bkash}
//                 onChange={(e) => setBkash(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">Rocket</label>
//               <input
//                 type="text"
//                 value={rocket}
//                 onChange={(e) => setRocket(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-2.5">
//               <label className="block text-sm font-bold mb-1.25">Nagad</label>
//               <input
//                 type="text"
//                 value={nagad}
//                 onChange={(e) => setNagad(e.target.value)}
//                 className="w-full p-2.5 border border-gray-300 rounded-md"
//               />
//             </div>
//             <button
//               onClick={handleSubmitOtherAccount}
//               className="px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer"
//             >
//               Update
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-5 border border-gray-300 rounded-lg">
//       <div className="flex gap-2.5 overflow-x-auto mb-5">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveTab(index)}
//             className={`px-4 py-2 rounded-md cursor-pointer ${
//               activeTab === index
//                 ? "bg-purple-500 text-white"
//                 : "bg-gray-300 text-black"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       <div className="p-5 border border-gray-300 rounded-lg">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card className="glass-panel shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="merchant-name">Merchant Name</Label>
                  <Input id="merchant-name" defaultValue="John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="merchant-id">Merchant ID</Label>
                  <Input id="merchant-id" defaultValue="MS-7829301" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.smith@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-panel shadow-sm">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="Smith Electronics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" defaultValue="US123456789" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Commerce St, Suite 100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" defaultValue="94103" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-panel shadow-sm">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "new-order", label: "New Orders" },
                    { id: "order-update", label: "Order Status Updates" },
                    { id: "payment-received", label: "Payment Received" },
                    { id: "return-request", label: "Return Requests" },
                    { id: "low-stock", label: "Low Stock Alerts" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="font-normal">
                        {item.label}
                      </Label>
                      <Switch id={item.id} defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Mobile Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "mobile-new-order", label: "New Orders" },
                    { id: "mobile-payment", label: "Payment Received" },
                    { id: "mobile-return", label: "Return Requests" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="font-normal">
                        {item.label}
                      </Label>
                      <Switch id={item.id} defaultChecked={item.id === "mobile-new-order"} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-panel shadow-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-panel shadow-sm">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Secure your account with two-factor authentication.
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="text-center py-10 text-muted-foreground">
          <p>Billing details will appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;