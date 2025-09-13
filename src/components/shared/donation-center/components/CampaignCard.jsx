// import React from 'react';
// import Button from '../../../../components/ui/Button';
// import Icon from '../../../../components/AppIcon';

// const CampaignCard = ({ 
//   campaign, 
//   onDonate, 
//   onViewDetails,
//   formatCurrency: formatCurrencyProp, 
//   calculateProgress, 
//   compact = false 
// }) => {
//   const progress = calculateProgress(campaign?.raised, campaign?.goal);
//   const remaining = campaign?.goal - campaign?.raised;

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'text-error';
//       case 'medium': return 'text-warning';
//       case 'low': return 'text-success';
//       default: return 'text-text-secondary';
//     }
//   };

//   const getPriorityBg = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-error/10';
//       case 'medium': return 'bg-warning/10';
//       case 'low': return 'bg-success/10';
//       default: return 'bg-muted';
//     }
//   };

//   const progressPercentage = (campaign?.raisedAmount / campaign?.targetAmount) * 100;
  
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Education': 'bg-primary/10 text-primary',
//       'Infrastructure': 'bg-accent/10 text-accent',
//       'Emergency': 'bg-error/10 text-error',
//       'Programs': 'bg-success/10 text-success'
//     };
//     return colors?.[category] || 'bg-gray-100 text-gray-600';
//   };

//   const getUrgencyIndicator = (days) => {
//     if (days <= 7) return { color: 'text-error', icon: 'AlertCircle' };
//     if (days <= 14) return { color: 'text-warning', icon: 'Clock' };
//     return { color: 'text-success', icon: 'Calendar' };
//   };

//   const urgency = getUrgencyIndicator(campaign?.daysRemaining);

//   if (compact) {
//     return (
//       <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
//         <div className="relative">
//           <img
//             src={campaign?.image}
//             alt={campaign?.title}
//             className="w-full h-48 object-cover"
//           />
//           <div className="absolute top-3 right-3">
//             <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBg(campaign?.priority)} ${getPriorityColor(campaign?.priority)}`}>
//               {campaign?.category}
//             </span>
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="font-semibold text-text-primary mb-2">{campaign?.title}</h3>
//           <p className="text-sm text-text-secondary mb-4 line-clamp-2">
//             {campaign?.description}
//           </p>
          
//           {/* Progress */}
//           <div className="mb-4">
//             <div className="flex justify-between text-sm mb-1">
//               <span className="text-text-secondary">Progress</span>
//               <span className="font-medium text-text-primary">{progress?.toFixed(1)}%</span>
//             </div>
//             <div className="w-full bg-muted rounded-full h-2">
//               <div 
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
          
//           {/* Stats */}
//           <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//             <div>
//               <p className="text-text-secondary">Raised</p>
//               <p className="font-semibold text-text-primary">{formatCurrency(campaign?.raised)}</p>
//             </div>
//             <div>
//               <p className="text-text-secondary">Goal</p>
//               <p className="font-semibold text-text-primary">{formatCurrency(campaign?.goal)}</p>
//             </div>
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4 text-xs text-text-secondary">
//               <span className="flex items-center">
//                 <Icon name="Users" size={12} className="mr-1" />
//                 {campaign?.donorCount} donors
//               </span>
//               <span className="flex items-center">
//                 <Icon name="Clock" size={12} className="mr-1" />
//                 {campaign?.daysRemaining}d left
//               </span>
//             </div>
            
//             <Button
//               size="sm"
//               onClick={() => onDonate(campaign)}
//               iconName="Heart"
//               iconPosition="left"
//             >
//               Donate
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-card rounded-lg border border-border overflow-hidden hover:elevation-2 transition-all duration-200">
//       {/* Campaign Image */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={campaign?.image}
//           alt={campaign?.title}
//           className="w-full h-full object-cover"
//         />
//         {campaign?.featured && (
//           <div className="absolute top-3 left-3">
//             <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
//               Featured
//             </span>
//           </div>
//         )}
//         <div className="absolute top-3 right-3">
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(campaign?.category)}`}>
//             {campaign?.category}
//           </span>
//         </div>
//       </div>

//       {/* Campaign Content */}
//       <div className="p-6">
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
//             {campaign?.title}
//           </h3>
//           <p className="text-sm text-text-secondary line-clamp-2">
//             {campaign?.description}
//           </p>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-text-primary">
//               {formatCurrency(campaign?.raisedAmount)} raised
//             </span>
//             <span className="text-sm text-text-secondary">
//               of {formatCurrency(campaign?.targetAmount)}
//             </span>
//           </div>
//           <div className="w-full bg-background rounded-full h-2">
//             <div 
//               className="bg-primary h-2 rounded-full transition-all duration-300" 
//               style={{ width: `${Math.min(progressPercentage, 100)}%` }}
//             ></div>
//           </div>
//           <div className="text-xs text-text-secondary mt-1">
//             {progressPercentage.toFixed(1)}% of goal reached
//           </div>
//         </div>

//         {/* Campaign Stats */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="text-center">
//             <div className="text-lg font-bold text-text-primary">{campaign?.donorCount}</div>
//             <div className="text-xs text-text-secondary">Donors</div>
//           </div>
//           <div className="text-center">
//             <div className={`text-lg font-bold ${urgency?.color}`}>
//               {campaign?.daysRemaining}
//             </div>
//             <div className="text-xs text-text-secondary">Days Left</div>
//           </div>
//         </div>

//         {/* Time Remaining Alert */}
//         {campaign?.daysRemaining <= 14 && (
//           <div className={`flex items-center space-x-2 mb-4 p-3 rounded-lg ${
//             campaign?.daysRemaining <= 7 ? 'bg-error/10' : 'bg-warning/10'
//           }`}>
//             <Icon name={urgency?.icon} size={16} className={urgency?.color} />
//             <span className={`text-sm font-medium ${urgency?.color}`}>
//               {campaign?.daysRemaining <= 7 
//                 ? `Urgent: Only ${campaign?.daysRemaining} days left!` 
//                 : `Time sensitive: ${campaign?.daysRemaining} days remaining`
//               }
//             </span>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex space-x-3">
//           <Button
//             variant="default"
//             size="sm"
//             iconName="Heart"
//             className="flex-1"
//             onClick={() => onDonate?.(campaign?.id, 50)}
//           >
//             Donate Now
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             iconName="Eye"
//             onClick={() => onViewDetails?.(campaign?.id)}
//           >
//             View
//           </Button>
//         </div>

//         {/* Quick Donation Amounts */}
//         <div className="mt-3 pt-3 border-t border-border">
//           <div className="text-xs text-text-secondary mb-2">Quick amounts:</div>
//           <div className="flex space-x-2">
//             {[25, 50, 100, 250].map((amount) => (
//               <button
//                 key={amount}
//                 onClick={() => onDonate?.(campaign?.id, amount)}
//                 className="px-3 py-1 text-xs bg-background hover:bg-primary hover:text-white rounded-full border border-border transition-colors duration-200"
//               >
//                 ${amount}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignCard;
import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/AppIcon";
import DonateModal from "./DonatModal"; // external modal

const CampaignCard = ({
  campaign,
  onDonate,
  onViewDetails,
  formatCurrency: formatCurrencyProp,
  calculateProgress,
  compact = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = calculateProgress(campaign?.raised, campaign?.goal);
  const remaining = campaign?.goal - campaign?.raised;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-error";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-text-secondary";
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case "high":
        return "bg-error/10";
      case "medium":
        return "bg-warning/10";
      case "low":
        return "bg-success/10";
      default:
        return "bg-muted";
    }
  };

  const progressPercentage =
    (campaign?.raisedAmount / campaign?.targetAmount) * 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Education: "bg-primary/10 text-primary",
      Infrastructure: "bg-accent/10 text-accent",
      Emergency: "bg-error/10 text-error",
      Programs: "bg-success/10 text-success",
    };
    return colors?.[category] || "bg-gray-100 text-gray-600";
  };

  const getUrgencyIndicator = (days) => {
    if (days <= 7) return { color: "text-error", icon: "AlertCircle" };
    if (days <= 14) return { color: "text-warning", icon: "Clock" };
    return { color: "text-success", icon: "Calendar" };
  };

  const urgency = getUrgencyIndicator(campaign?.daysRemaining);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmDonation = (campaignId, amount, details) => {
    console.log("Donation confirmed:", campaignId, amount, details);
    setIsModalOpen(false);
  };

  if (compact) {
    return (
      <>
        <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="relative">
            <img
              src={campaign?.image}
              alt={campaign?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBg(
                  campaign?.priority
                )} ${getPriorityColor(campaign?.priority)}`}
              >
                {campaign?.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-text-primary mb-2">
              {campaign?.title}
            </h3>
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {campaign?.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Progress</span>
                <span className="font-medium text-text-primary">
                  {progress?.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-text-secondary">Raised</p>
                <p className="font-semibold text-text-primary">
                  {formatCurrency(campaign?.raised)}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Goal</p>
                <p className="font-semibold text-text-primary">
                  {formatCurrency(campaign?.goal)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {campaign?.donorCount} donors
                </span>
                <span className="flex items-center">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {campaign?.daysRemaining}d left
                </span>
              </div>

              <Button
                size="sm"
                onClick={handleOpenModal} // modal triggered
                iconName="Heart"
                iconPosition="left"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>

        {/* External Modal */}
        {isModalOpen && (
          <DonateModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            campaign={campaign}
            onConfirm={handleConfirmDonation}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:elevation-2 transition-all duration-200">
        {/* Campaign Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign?.image}
            alt={campaign?.title}
            className="w-full h-full object-cover"
          />
          {campaign?.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                campaign?.category
              )}`}
            >
              {campaign?.category}
            </span>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
              {campaign?.title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2">
              {campaign?.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(campaign?.raisedAmount)} raised
              </span>
              <span className="text-sm text-text-secondary">
                of {formatCurrency(campaign?.targetAmount)}
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {progressPercentage.toFixed(1)}% of goal reached
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">
                {campaign?.donorCount}
              </div>
              <div className="text-xs text-text-secondary">Donors</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${urgency?.color}`}>
                {campaign?.daysRemaining}
              </div>
              <div className="text-xs text-text-secondary">Days Left</div>
            </div>
          </div>

          {/* Time Remaining Alert */}
          {campaign?.daysRemaining <= 14 && (
            <div
              className={`flex items-center space-x-2 mb-4 p-3 rounded-lg ${
                campaign?.daysRemaining <= 7 ? "bg-error/10" : "bg-warning/10"
              }`}
            >
              <Icon name={urgency?.icon} size={16} className={urgency?.color} />
              <span className={`text-sm font-medium ${urgency?.color}`}>
                {campaign?.daysRemaining <= 7
                  ? `Urgent: Only ${campaign?.daysRemaining} days left!`
                  : `Time sensitive: ${campaign?.daysRemaining} days remaining`}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="default"
              size="sm"
              iconName="Heart"
              className="flex-1"
              onClick={handleOpenModal} // modal triggered
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              onClick={() => onViewDetails?.(campaign?.id)}
            >
              View
            </Button>
          </div>

          {/* Quick Donation Amounts */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-xs text-text-secondary mb-2">
              Quick amounts:
            </div>
            <div className="flex space-x-2">
              {[25, 50, 100, 250].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleOpenModal()}
                  className="px-3 py-1 text-xs bg-background hover:bg-primary hover:text-white rounded-full border border-border transition-colors duration-200"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* External Modal */}
      {isModalOpen && (
        <DonateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          campaign={campaign}
          onConfirm={handleConfirmDonation}
        />
      )}
    </>
  );
};

export default CampaignCard;
