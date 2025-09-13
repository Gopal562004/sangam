// import React, { useState } from 'react';
// import Button from '../../../../components/ui/Button';
// import Icon from '../../../../components/AppIcon';
// import Input from '../../../../components/ui/Input';

// const QuickDonation = ({ onQuickDonate }) => {
//   const [selectedAmount, setSelectedAmount] = useState(null);
//   const [customAmount, setCustomAmount] = useState('');
//   const [donationType, setDonationType] = useState('general');
  
//   const quickAmounts = [25, 50, 100, 250, 500, 1000];
  
//   const donationTypes = [
//     { id: 'general', label: 'General Fund', icon: 'Heart', description: 'Support where needed most' },
//     { id: 'scholarship', label: 'Scholarships', icon: 'GraduationCap', description: 'Help students achieve their dreams' },
//     { id: 'emergency', label: 'Emergency Relief', icon: 'Shield', description: 'Urgent student assistance' },
//     { id: 'infrastructure', label: 'Campus Improvements', icon: 'Building2', description: 'Enhance facilities and resources' }
//   ];

//   const handleAmountSelect = (amount) => {
//     setSelectedAmount(amount);
//     setCustomAmount('');
//   };

//   const handleCustomAmountChange = (value) => {
//     setCustomAmount(value);
//     setSelectedAmount(null);
//   };

//   const getFinalAmount = () => {
//     return selectedAmount || parseFloat(customAmount) || 0;
//   };

//   const handleDonate = () => {
//     const amount = getFinalAmount();
//     if (amount > 0) {
//       onQuickDonate?.(amount, donationType);
//     }
//   };

//   const isValidAmount = () => {
//     const amount = getFinalAmount();
//     return amount >= 5; // Minimum donation amount
//   };

//   return (
//     <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border">
//       <div className="flex items-center space-x-3 mb-6">
//         <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
//           <Icon name="Zap" size={20} className="text-primary" />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-text-primary">Quick Donation</h3>
//           <p className="text-sm text-text-secondary">Make an immediate impact with a quick donation</p>
//         </div>
//       </div>
//       {/* Donation Type Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-text-primary mb-3">Choose donation purpose:</label>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           {donationTypes?.map((type) => (
//             <button
//               key={type?.id}
//               onClick={() => setDonationType(type?.id)}
//               className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
//                 donationType === type?.id
//                   ? 'border-primary bg-primary/5' :'border-border hover:border-border/60 hover:bg-card'
//               }`}
//             >
//               <div className="flex items-start space-x-3">
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                   donationType === type?.id ? 'bg-primary text-white' : 'bg-background text-text-secondary'
//                 }`}>
//                   <Icon name={type?.icon} size={14} />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-medium text-text-primary text-sm">{type?.label}</h4>
//                   <p className="text-xs text-text-secondary mt-1">{type?.description}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Amount Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-text-primary mb-3">Select amount:</label>
//         <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
//           {quickAmounts?.map((amount) => (
//             <button
//               key={amount}
//               onClick={() => handleAmountSelect(amount)}
//               className={`p-3 rounded-lg border-2 text-center font-semibold transition-all duration-200 ${
//                 selectedAmount === amount
//                   ? 'border-primary bg-primary text-white' :'border-border hover:border-primary/50 hover:bg-primary/5 text-text-primary'
//               }`}
//             >
//               ${amount}
//             </button>
//           ))}
//         </div>

//         {/* Custom Amount Input */}
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//             <span className="text-text-secondary">$</span>
//           </div>
//           <Input
//             type="number"
//             placeholder="Enter custom amount"
//             value={customAmount}
//             onChange={(e) => handleCustomAmountChange(e?.target?.value)}
//             className="pl-8"
//             min="5"
//             step="1"
//           />
//         </div>
        
//         {!isValidAmount() && (customAmount !== '' || selectedAmount !== null) && (
//           <p className="text-xs text-error mt-2">Minimum donation amount is $5</p>
//         )}
//       </div>
//       {/* Payment Method Preview */}
//       <div className="mb-6 p-4 bg-background rounded-lg border border-border">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Icon name="CreditCard" size={16} className="text-text-secondary" />
//             <span className="text-sm text-text-primary">Secure payment processing</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Icon name="Shield" size={14} className="text-success" />
//             <span className="text-xs text-success">SSL Encrypted</span>
//           </div>
//         </div>
//       </div>
//       {/* Impact Preview */}
//       {isValidAmount() && (
//         <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
//           <div className="flex items-start space-x-3">
//             <Icon name="Heart" size={16} className="text-success mt-0.5" />
//             <div>
//               <h4 className="font-medium text-text-primary text-sm">Your Impact</h4>
//               <p className="text-xs text-text-secondary mt-1">
//                 Your ${getFinalAmount()} donation will help {
//                   donationType === 'scholarship' ? 'provide educational opportunities' :
//                   donationType === 'emergency' ? 'support students in need' :
//                   donationType === 'infrastructure'? 'improve campus facilities' : 'support various university initiatives'
//                 } for our community.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Donation Button */}
//       <div className="flex items-center space-x-3">
//         <Button
//           variant="default"
//           size="lg"
//           iconName="Heart"
//           disabled={!isValidAmount()}
//           onClick={handleDonate}
//           className="flex-1"
//         >
//           Donate ${getFinalAmount() || '0'}
//         </Button>
//         <Button variant="outline" size="lg" iconName="Share2">
//           Share
//         </Button>
//       </div>
//       {/* Tax Deductible Notice */}
//       <div className="mt-4 text-center">
//         <p className="text-xs text-text-secondary">
//           Your donation is tax-deductible. You'll receive a receipt via email.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default QuickDonation;
import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/AppIcon";
import Input from "../../../../components/ui/Input";
import DonateModal from "./DonatModal"; // Import DonateModal
import { useAuth } from "../../../../context/AuthContext";

const QuickDonation = ({ onQuickDonate }) => {
  const { user } = useAuth();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("general");
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(0);

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const donationTypes = [
    {
      id: "general",
      label: "General Fund",
      icon: "Heart",
      description: "Support where needed most",
    },
    {
      id: "scholarship",
      label: "Scholarships",
      icon: "GraduationCap",
      description: "Help students achieve their dreams",
    },
    {
      id: "emergency",
      label: "Emergency Relief",
      icon: "Shield",
      description: "Urgent student assistance",
    },
    {
      id: "infrastructure",
      label: "Campus Improvements",
      icon: "Building2",
      description: "Enhance facilities and resources",
    },
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const isValidAmount = () => {
    const amount = getFinalAmount();
    return amount >= 5;
  };

  const handleOpenModal = () => {
    const amount = getFinalAmount();
    if (amount >= 5) {
      setModalAmount(amount);
      setDonateModalOpen(true);
    }
  };

  const handleConfirmDonation = (campaignId, amount, userInfo) => {
    console.log("Quick donation confirmed:", {
      amount,
      userInfo,
      type: donationType,
    });
    setDonateModalOpen(false);
    // Trigger external handler if needed
    onQuickDonate?.(amount, donationType);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Quick Donation
            </h3>
            <p className="text-sm text-text-secondary">
              Make an immediate impact with a quick donation
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Choose donation purpose:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {donationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setDonationType(type.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                  donationType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-border/60 hover:bg-card"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      donationType === type.id
                        ? "bg-primary text-white"
                        : "bg-background text-text-secondary"
                    }`}
                  >
                    <Icon name={type.icon} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text-primary text-sm">
                      {type.label}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select amount:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`p-3 rounded-lg border-2 text-center font-semibold transition-all duration-200 ${
                  selectedAmount === amount
                    ? "border-primary bg-primary text-white"
                    : "border-border hover:border-primary/50 hover:bg-primary/5 text-text-primary"
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <span className="text-text-secondary">$</span>
            </div>
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="pl-8"
              min="5"
              step="1"
            />
          </div>

          {!isValidAmount() &&
            (customAmount !== "" || selectedAmount !== null) && (
              <p className="text-xs text-error mt-2">
                Minimum donation amount is $5
              </p>
            )}
        </div>

        <div className="mb-6 p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon
                name="CreditCard"
                size={16}
                className="text-text-secondary"
              />
              <span className="text-sm text-text-primary">
                Secure payment processing
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-xs text-success">SSL Encrypted</span>
            </div>
          </div>
        </div>

        {isValidAmount() && (
          <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Heart" size={16} className="text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary text-sm">
                  Your Impact
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  Your ${getFinalAmount()} donation will help{" "}
                  {donationType === "scholarship"
                    ? "provide educational opportunities"
                    : donationType === "emergency"
                    ? "support students in need"
                    : donationType === "infrastructure"
                    ? "improve campus facilities"
                    : "support various university initiatives"}{" "}
                  for our community.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="lg"
            iconName="Heart"
            disabled={!isValidAmount()}
            onClick={handleOpenModal}
            className="flex-1"
          >
            Donate ${getFinalAmount() || "0"}
          </Button>
          <Button variant="outline" size="lg" iconName="Share2">
            Share
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-text-secondary">
            Your donation is tax-deductible. You'll receive a receipt via email.
          </p>
        </div>
      </div>

      {isDonateModalOpen && (
        <DonateModal
          isOpen={isDonateModalOpen}
          onClose={() => setDonateModalOpen(false)}
          campaign={{ title: "Quick Donation" }} // No campaign needed for quick
          onConfirm={handleConfirmDonation}
          initialAmount={modalAmount}
        />
      )}
    </>
  );
};

export default QuickDonation;
