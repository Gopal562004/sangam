// import React, { useState } from 'react';
// import Icon from '../../../../AppIcon';
// import Image from '../../../../AppImage';
// import Button from '../../../../ui/Button';

// const MenteeTable = ({ mentees, onMessage, onScheduleSession, onViewProfile }) => {
//   const [sortBy, setSortBy] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [filterStatus, setFilterStatus] = useState('all');

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//   };

//   const filteredAndSortedMentees = mentees?.filter(mentee => filterStatus === 'all' || mentee?.status === filterStatus)?.sort((a, b) => {
//       let aValue = a?.[sortBy];
//       let bValue = b?.[sortBy];
      
//       if (sortBy === 'lastInteraction') {
//         aValue = new Date(aValue);
//         bValue = new Date(bValue);
//       }
      
//       if (sortOrder === 'asc') {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//   const formatDate = (dateString) => {
//     return new Date(dateString)?.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       active: { color: 'bg-success text-success-foreground', label: 'Active' },
//       inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
//       completed: { color: 'bg-accent text-accent-foreground', label: 'Completed' }
//     };
    
//     const config = statusConfig?.[status] || statusConfig?.active;
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
//         {config?.label}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-card border border-border rounded-lg shadow-elevation-1">
//       {/* Header with filters */}
//       <div className="p-6 border-b border-border">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h3 className="text-lg font-semibold text-card-foreground">My Mentees</h3>
          
//           <div className="flex items-center space-x-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e?.target?.value)}
//               className="px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="completed">Completed</option>
//             </select>
            
//             <Button variant="outline" size="sm" iconName="Filter">
//               Filter
//             </Button>
//           </div>
//         </div>
//       </div>
//       {/* Desktop Table */}
//       <div className="hidden lg:block overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-muted/50">
//             <tr>
//               <th className="text-left p-4 font-medium text-muted-foreground">
//                 <button
//                   onClick={() => handleSort('name')}
//                   className="flex items-center space-x-1 hover:text-foreground transition-smooth"
//                 >
//                   <span>Mentee</span>
//                   <Icon name="ArrowUpDown" size={14} />
//                 </button>
//               </th>
//               <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
//               <th className="text-left p-4 font-medium text-muted-foreground">
//                 <button
//                   onClick={() => handleSort('startDate')}
//                   className="flex items-center space-x-1 hover:text-foreground transition-smooth"
//                 >
//                   <span>Start Date</span>
//                   <Icon name="ArrowUpDown" size={14} />
//                 </button>
//               </th>
//               <th className="text-left p-4 font-medium text-muted-foreground">
//                 <button
//                   onClick={() => handleSort('lastInteraction')}
//                   className="flex items-center space-x-1 hover:text-foreground transition-smooth"
//                 >
//                   <span>Last Interaction</span>
//                   <Icon name="ArrowUpDown" size={14} />
//                 </button>
//               </th>
//               <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
//               <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAndSortedMentees?.map((mentee) => (
//               <tr key={mentee?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
//                 <td className="p-4">
//                   <div className="flex items-center space-x-3">
//                     <Image
//                       src={mentee?.avatar}
//                       alt={mentee?.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-medium text-card-foreground">{mentee?.name}</p>
//                       <p className="text-sm text-muted-foreground">{mentee?.expertise}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   <p className="text-sm text-card-foreground">{mentee?.email}</p>
//                   <p className="text-sm text-muted-foreground">{mentee?.phone}</p>
//                 </td>
//                 <td className="p-4 text-sm text-card-foreground">
//                   {formatDate(mentee?.startDate)}
//                 </td>
//                 <td className="p-4 text-sm text-card-foreground">
//                   {formatDate(mentee?.lastInteraction)}
//                 </td>
//                 <td className="p-4">
//                   {getStatusBadge(mentee?.status)}
//                 </td>
//                 <td className="p-4">
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => onMessage(mentee)}
//                       className="h-8 w-8"
//                     >
//                       <Icon name="MessageCircle" size={16} />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => onScheduleSession(mentee)}
//                       className="h-8 w-8"
//                     >
//                       <Icon name="Calendar" size={16} />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => onViewProfile(mentee)}
//                       className="h-8 w-8"
//                     >
//                       <Icon name="Eye" size={16} />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Mobile Cards */}
//       <div className="lg:hidden">
//         {filteredAndSortedMentees?.map((mentee) => (
//           <div key={mentee?.id} className="p-4 border-b border-border last:border-b-0">
//             <div className="flex items-start space-x-3 mb-3">
//               <Image
//                 src={mentee?.avatar}
//                 alt={mentee?.name}
//                 className="w-12 h-12 rounded-full object-cover flex-shrink-0"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h4 className="font-medium text-card-foreground">{mentee?.name}</h4>
//                     <p className="text-sm text-muted-foreground">{mentee?.expertise}</p>
//                   </div>
//                   {getStatusBadge(mentee?.status)}
//                 </div>
                
//                 <div className="mt-2 space-y-1">
//                   <p className="text-sm text-card-foreground">{mentee?.email}</p>
//                   <p className="text-xs text-muted-foreground">
//                     Started: {formatDate(mentee?.startDate)} • Last: {formatDate(mentee?.lastInteraction)}
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onMessage(mentee)}
//                 iconName="MessageCircle"
//                 iconPosition="left"
//                 className="flex-1"
//               >
//                 Message
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => onScheduleSession(mentee)}
//                 iconName="Calendar"
//                 iconPosition="left"
//                 className="flex-1"
//               >
//                 Schedule
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => onViewProfile(mentee)}
//               >
//                 <Icon name="Eye" size={16} />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {filteredAndSortedMentees?.length === 0 && (
//         <div className="p-8 text-center">
//           <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
//           <h3 className="text-lg font-medium text-card-foreground mb-2">No mentees found</h3>
//           <p className="text-muted-foreground">
//             {filterStatus === 'all' 
//               ? "You don't have any mentees yet." 
//               : `No mentees with ${filterStatus} status.`}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenteeTable;
import React, { useState } from "react";
import Icon from "../../../../AppIcon";
import Image from "../../../../AppImage";
import Button from "../../../../ui/Button";

const MenteeTable = ({
  mentees = [],
  onMessage,
  onScheduleSession,
  onViewProfile,
}) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedMentees = [...mentees]
    .filter(
      (mentee) => filterStatus === "all" || mentee?.status === filterStatus
    )
    .sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (sortBy === "startDate" || sortBy === "lastInteraction") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "-";

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Completed" },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      label: "Unknown",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Header Filters */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">My Mentees</h3>

        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring focus:ring-blue-200"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>

          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 hover:text-gray-800"
                >
                  Mentee <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-gray-600">
                Contact
              </th>
              <th className="text-left p-3 font-medium text-gray-600">
                <button
                  onClick={() => handleSort("startDate")}
                  className="flex items-center space-x-1 hover:text-gray-800"
                >
                  Start Date <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-gray-600">
                <button
                  onClick={() => handleSort("lastInteraction")}
                  className="flex items-center space-x-1 hover:text-gray-800"
                >
                  Last Interaction <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left p-3 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedMentees.map((mentee) => (
              <tr
                key={mentee.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center space-x-3">
                  <Image
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{mentee.name}</p>
                    <p className="text-sm text-gray-500">{mentee.expertise}</p>
                  </div>
                </td>

                <td className="p-3">
                  <p className="text-sm text-gray-800">{mentee.email}</p>
                  <p className="text-sm text-gray-500">{mentee.phone}</p>
                </td>

                <td className="p-3 text-sm text-gray-800">
                  {formatDate(mentee.startDate)}
                </td>

                <td className="p-3 text-sm text-gray-800">
                  {formatDate(mentee.lastInteraction)}
                </td>

                <td className="p-3">{getStatusBadge(mentee.status)}</td>

                <td className="p-3 space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMessage(mentee)}
                  >
                    <Icon name="MessageCircle" size={16} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onScheduleSession(mentee)}
                  >
                    <Icon name="Calendar" size={16} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewProfile(mentee)}
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {filteredAndSortedMentees.map((mentee) => (
          <div
            key={mentee.id}
            className="p-4 border-b last:border-b-0 space-y-3"
          >
            <div className="flex items-start space-x-3">
              <Image
                src={mentee.avatar}
                alt={mentee.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800">{mentee.name}</h4>
                <p className="text-sm text-gray-500">{mentee.expertise}</p>
                <p className="text-xs text-gray-500">
                  Started: {formatDate(mentee.startDate)} • Last:{" "}
                  {formatDate(mentee.lastInteraction)}
                </p>
              </div>
              {getStatusBadge(mentee.status)}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMessage(mentee)}
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1"
              >
                Message
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onScheduleSession(mentee)}
                iconName="Calendar"
                iconPosition="left"
                className="flex-1"
              >
                Schedule
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewProfile(mentee)}
              >
                <Icon name="Eye" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedMentees.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-800">
            No mentees found
          </h3>
          <p className="text-gray-500">
            {filterStatus === "all"
              ? "You don't have any mentees yet."
              : `No mentees with status "${filterStatus}".`}
          </p>
        </div>
      )}
    </div>
  );
};

export default MenteeTable;
