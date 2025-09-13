// import React, { useState } from "react";
// import Button from "../../../../components/ui/Button";
// import Icon from "../../../../components/AppIcon";
// import { BiDollar } from "react-icons/bi";
// import { User, Mail, CreditCard } from "lucide-react";
// import { useAuth } from "../../../../context/AuthContext"; // import context

// const DonateModal = ({ isOpen, onClose, campaign, onConfirm }) => {
//   const { user } = useAuth(); // get logged-in user
//   const [amount, setAmount] = useState(50);
//   const [paymentMethod, setPaymentMethod] = useState("credit");

//   if (!isOpen) return null;

//   const handleDonate = () => {
//     onConfirm(campaign?.id, amount, {
//       name: user?.name,
//       email: user?.email,
//       paymentMethod,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
//       <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg transform transition-transform duration-300 scale-100">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           <Icon name="X" size={20} />
//         </button>

//         {/* Modal Header */}
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           Donate to {campaign?.title}
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Your contribution helps make a difference!
//         </p>

//         {/* Form Fields */}
//         <div className="space-y-4">
//           {/* Amount Field */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Amount
//             </label>
//             <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
//               <BiDollar size={22} className="ml-3 text-gray-500" />
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 className="w-full p-2 outline-none"
//                 placeholder="Enter donation amount"
//               />
//             </div>
//           </div>

//           {/* Name Field (Read-only from context) */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <div className="flex items-center border border-border rounded-lg overflow-hidden bg-gray-100">
//               <User size={20} className="ml-3 text-gray-500" />
//               <input
//                 type="text"
//                 value={user?.name || ""}
//                 className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
//                 readOnly
//               />
//             </div>
//           </div>

//           {/* Email Field (Read-only from context) */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="flex items-center border border-border rounded-lg overflow-hidden bg-gray-100">
//               <Mail size={20} className="ml-3 text-gray-500" />
//               <input
//                 type="email"
//                 value={user?.email || ""}
//                 className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
//                 readOnly
//               />
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               Payment Method
//             </label>
//             <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
//               <CreditCard size={20} className="ml-3 text-gray-500" />
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full p-2 outline-none"
//               >
//                 <option value="credit">Credit Card</option>
//                 <option value="debit">Debit Card</option>
//                 <option value="paypal">PayPal</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Confirm Button */}
//         <Button
//           className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
//           onClick={handleDonate}
//         >
//           Confirm Donation
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DonateModal;
import React, { useState, useEffect } from "react";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/AppIcon";
import { BiDollar } from "react-icons/bi";
import { User, Mail, CreditCard } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";

const DonateModal = ({
  isOpen,
  onClose,
  campaign,
  onConfirm,
  initialAmount,
}) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(initialAmount || 50);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Update amount if initialAmount changes
  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  if (!isOpen) return null;

  const handleDonate = () => {
    onConfirm(campaign.id, amount, {
      name: user?.name,
      email: user?.email,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <Icon name="X" size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Donate to {campaign.title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your contribution helps make a difference!
        </p>

        {/* Amount */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <BiDollar size={22} className="ml-3 text-gray-500" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 outline-none"
              placeholder="Enter donation amount"
            />
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
            <User size={20} className="ml-3 text-gray-500" />
            <input
              type="text"
              value={user?.name || ""}
              className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="flex items-center border border-border rounded-lg bg-gray-100 overflow-hidden">
            <Mail size={20} className="ml-3 text-gray-500" />
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 outline-none bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        </div>

        {/* Payment */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <div className="flex items-center border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <CreditCard size={20} className="ml-3 text-gray-500" />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 outline-none"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        {/* Confirm */}
        <Button
          className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={handleDonate}
        >
          Confirm Donation
        </Button>
      </div>
    </div>
  );
};

export default DonateModal;
