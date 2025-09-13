import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NetworkingOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      type: "Alumni Spotlight",
      title: "Featured Alumni: Dr. Jennifer Martinez",
      description: "CEO of TechInnovate Solutions, Class of 2010. Connect with Jennifer to learn about entrepreneurship in the tech industry.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      action: "Connect",
      category: "Featured",
      department: "Computer Science",
      graduationYear: "2010"
    },
    {
      id: 2,
      type: "Industry Group",
      title: "Healthcare Alumni Network",
      description: "Join 150+ alumni working in healthcare. Share experiences, job opportunities, and industry insights.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      action: "Join Group",
      category: "Group",
      members: 152
    },
    {
      id: 3,
      type: "Regional Chapter",
      title: "San Francisco Bay Area Chapter",
      description: "Connect with local alumni in the SF Bay Area. Monthly meetups, professional events, and social gatherings.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop",
      action: "Join Chapter",
      category: "Regional",
      members: 89,
      location: "San Francisco, CA"
    },
    {
      id: 4,
      type: "Mentorship Match",
      title: "Recommended Mentee: Alex Thompson",
      description: "Junior studying Business Administration. Looking for guidance in marketing and brand management.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      action: "View Profile",
      category: "Mentorship",
      department: "Business Administration",
      year: "Junior"
    }
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      'Featured': 'Star',
      'Group': 'Users',
      'Regional': 'MapPin',
      'Mentorship': 'UserPlus'
    };
    return icons?.[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Featured': 'bg-accent/10 text-accent',
      'Group': 'bg-primary/10 text-primary',
      'Regional': 'bg-secondary/10 text-secondary',
      'Mentorship': 'bg-success/10 text-success'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="Network" size={24} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Networking Opportunities</h2>
            <p className="text-sm text-muted-foreground">Expand your professional network</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {opportunities?.map((opportunity) => (
          <div key={opportunity?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow duration-200">
            <div className="flex items-start space-x-3">
              <Image
                src={opportunity?.image}
                alt={opportunity?.title}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(opportunity?.category)}`}>
                    <Icon name={getCategoryIcon(opportunity?.category)} size={12} className="inline mr-1" />
                    {opportunity?.type}
                  </span>
                </div>
                
                <h3 className="font-medium text-card-foreground mb-2 line-clamp-1">
                  {opportunity?.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {opportunity?.description}
                </p>

                <div className="space-y-1 mb-3">
                  {opportunity?.department && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="GraduationCap" size={12} className="mr-1" />
                      <span>{opportunity?.department}</span>
                      {opportunity?.graduationYear && <span> • Class of {opportunity?.graduationYear}</span>}
                      {opportunity?.year && <span> • {opportunity?.year}</span>}
                    </div>
                  )}
                  {opportunity?.members && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Users" size={12} className="mr-1" />
                      <span>{opportunity?.members} members</span>
                    </div>
                  )}
                  {opportunity?.location && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      <span>{opportunity?.location}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName={opportunity?.category === 'Featured' ? 'UserPlus' : 
                           opportunity?.category === 'Group' ? 'Users' :
                           opportunity?.category === 'Regional' ? 'MapPin' : 'Eye'}
                  iconPosition="left"
                >
                  {opportunity?.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="outline" iconName="Search" iconPosition="left">
            Browse Alumni Directory
          </Button>
          <Button variant="outline" iconName="Users" iconPosition="left">
            Explore Groups
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkingOpportunities;