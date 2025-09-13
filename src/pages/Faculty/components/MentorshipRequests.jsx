import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MentorshipRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      student: {
        name: "Sarah Johnson",
        email: "sarah.johnson@university.edu",
        year: "Junior",
        department: "Computer Science",
        avatar:
          "https://annemariesegal.com/wp-content/uploads/2017/04/adobestock_86346713-cropped-young-woman-in-suit.jpg?w=840",
      },
      message: `Hi! I'm a junior studying Computer Science and I'm really interested in learning more about software engineering careers. I've seen your profile and your experience at tech companies really inspires me. Would you be willing to mentor me?`,
      skills: ["JavaScript", "React", "Python"],
      requestedDate: "2025-01-05",
      status: "pending",
    },
    {
      id: 2,
      student: {
        name: "Michael Chen",
        email: "michael.chen@university.edu",
        year: "Senior",
        department: "Computer Science",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      message: `Hello! I'm a senior preparing for my job search in the tech industry. I would love to get guidance on interview preparation and career advice from someone with your background.`,
      skills: ["Java", "Spring Boot", "AWS"],
      requestedDate: "2025-01-04",
      status: "pending",
    },
    {
      id: 3,
      student: {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@university.edu",
        year: "Sophomore",
        department: "Computer Science",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      message: `Hi there! I'm exploring different areas in tech and would appreciate mentorship in understanding various career paths in software development.`,
      skills: ["HTML", "CSS", "JavaScript"],
      requestedDate: "2025-01-03",
      status: "pending",
    },
  ]);

  const handleRequestAction = (requestId, action) => {
    setRequests(prev => prev?.map(req => 
      req?.id === requestId 
        ? { ...req, status: action }
        : req
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="UserPlus" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Mentorship Requests</h2>
            <p className="text-sm text-muted-foreground">Students seeking your guidance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            {requests?.filter(r => r?.status === 'pending')?.length} New
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {requests?.map((request) => (
          <div key={request?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow duration-200">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-start space-x-3 flex-1">
                <Image
                  src={request?.student?.avatar}
                  alt={request?.student?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-card-foreground">{request?.student?.name}</h3>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {request?.student?.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {request?.student?.department} • {request?.student?.email}
                  </p>
                  <p className="text-sm text-card-foreground mb-3 line-clamp-3">
                    {request?.message}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {request?.skills?.map((skill, index) => (
                      <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Clock" size={14} className="mr-1" />
                    <span>Requested on {formatDate(request?.requestedDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:flex-col lg:flex-row">
                {request?.status === 'pending' ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      onClick={() => handleRequestAction(request?.id, 'accepted')}
                      className="flex-1 sm:flex-none"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      onClick={() => handleRequestAction(request?.id, 'declined')}
                      className="flex-1 sm:flex-none"
                    >
                      Decline
                    </Button>
                  </>
                ) : (
                  <div className={`px-3 py-2 rounded-md text-sm font-medium ${
                    request?.status === 'accepted' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                  }`}>
                    {request?.status === 'accepted' ? 'Accepted' : 'Declined'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
          Browse All Students
        </Button>
      </div>
    </div>
  );
};

export default MentorshipRequests;