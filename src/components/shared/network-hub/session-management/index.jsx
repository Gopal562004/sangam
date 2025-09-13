import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../../ui/NavigationHeader';
import SessionCalendar from './components/SessionCalendar';
import SessionList from './components/SessionList';
import CreateSessionModal from './components/CreateSessionModal';
import SessionDetailsModal from './components/SessionDetailsModal';
import SessionFilters from './components/SessionFilters';
import Icon from '../../../AppIcon';


const SessionManagement = () => {
  const [currentView, setCurrentView] = useState('month');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    menteeId: '',
    startDate: '',
    endDate: '',
    search: '',
    quickFilter: ''
  });

  // Mock data for sessions
  const [sessions, setSessions] = useState([
    {
      id: '1',
      mentee: 'Sarah Johnson',
      menteeAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: '2025-01-15',
      time: '10:00',
      duration: 60,
      topic: 'Career Planning Discussion',
      description: 'Discussing career goals and creating a roadmap for professional development in the tech industry.',
      status: 'upcoming',
      meetingLink: 'https://meet.networkmentorship.com/session/abc123',
      preparationMaterials: `Please review the following before our session:\n1. Your current resume\n2. Job descriptions for roles you're interested in\n3. List of your top 3 career goals`,agenda: `1. Introduction and check-in (5 min)\n2. Review current career status (15 min)\n3. Discuss career goals and aspirations (20 min)\n4. Create action plan (15 min)\n5. Next steps and follow-up (5 min)`,notes: ''
    },
    {
      id: '2',mentee: 'Michael Chen',menteeAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',date: '2025-01-16',time: '14:30',duration: 45,topic: 'Technical Interview Preparation',description: 'Mock interview session focusing on system design and coding challenges.',status: 'upcoming',meetingLink: 'https://meet.networkmentorship.com/session/def456',preparationMaterials: 'Practice coding problems on LeetCode, review system design fundamentals',agenda: `1. Warm-up coding problem (10 min)\n2. System design discussion (25 min)\n3. Feedback and improvement areas (10 min)`,notes: ''
    },
    {
      id: '3',mentee: 'Emily Rodriguez',menteeAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',date: '2025-01-10',time: '16:00',duration: 60,topic: 'Leadership Skills Development',description: 'Completed session on developing leadership skills and team management techniques.',status: 'completed',meetingLink: 'https://meet.networkmentorship.com/session/ghi789',preparationMaterials: 'Read "The First 90 Days" chapters 1-3',
      agenda: `1. Discussion on leadership challenges (20 min)\n2. Role-playing exercises (25 min)\n3. Action items for next week (15 min)`,
      notes: `Great session! Emily showed excellent understanding of leadership principles. Key takeaways:\n- Focus on building trust with team members\n- Practice active listening techniques\n- Schedule regular 1:1s with direct reports\n\nNext session: Follow up on implementation of discussed strategies.`
    },
    {
      id: '4',mentee: 'David Kim',menteeAvatar: 'https://randomuser.me/api/portraits/men/4.jpg',date: '2025-01-12',time: '11:00',duration: 30,topic: 'Networking Strategies',description: 'Session was cancelled due to scheduling conflict.',status: 'cancelled',meetingLink: '',preparationMaterials: '',agenda: '',notes: ''
    },
    {
      id: '5',mentee: 'Lisa Wang',menteeAvatar: 'https://randomuser.me/api/portraits/women/5.jpg',date: '2025-01-18',time: '09:00',duration: 90,topic: 'Product Management Fundamentals',description: 'Deep dive into product management methodologies and best practices.',status: 'upcoming',meetingLink: 'https://meet.networkmentorship.com/session/jkl012',
      preparationMaterials: `Please prepare:\n1. Current product roadmap (if available)\n2. User feedback examples\n3. Questions about prioritization frameworks`,
      agenda: `1. Product strategy overview (30 min)\n2. Prioritization frameworks discussion (30 min)\n3. User research best practices (20 min)\n4. Q&A and action items (10 min)`,
      notes: ''
    }
  ]);

  // Mock data for mentees
  const mentees = [
    { id: '1', name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '3', name: 'Emily Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '4', name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: '5', name: 'Lisa Wang', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: '6', name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: '7', name: 'Anna Thompson', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' }
  ];

  // Filter sessions based on current filters
  const filteredSessions = sessions?.filter(session => {
    if (filters?.status && session?.status !== filters?.status) return false;
    if (filters?.menteeId && !session?.mentee?.includes(mentees?.find(m => m?.id === filters?.menteeId)?.name || '')) return false;
    if (filters?.startDate && session?.date < filters?.startDate) return false;
    if (filters?.endDate && session?.date > filters?.endDate) return false;
    if (filters?.search && !session?.topic?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !session?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    
    // Quick filters
    if (filters?.quickFilter) {
      const today = new Date();
      const sessionDate = new Date(session.date);
      
      switch (filters?.quickFilter) {
        case 'today':
          if (sessionDate?.toDateString() !== today?.toDateString()) return false;
          break;
        case 'thisWeek':
          const weekStart = new Date(today);
          weekStart?.setDate(today?.getDate() - today?.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd?.setDate(weekStart?.getDate() + 6);
          if (sessionDate < weekStart || sessionDate > weekEnd) return false;
          break;
        case 'thisMonth':
          if (sessionDate?.getMonth() !== today?.getMonth() || sessionDate?.getFullYear() !== today?.getFullYear()) return false;
          break;
        case 'upcoming':
          if (session?.status !== 'upcoming') return false;
          break;
      }
    }
    
    return true;
  });

  const handleCreateSession = (sessionData) => {
    setSessions(prev => [...prev, sessionData]);
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setIsDetailsModalOpen(true);
  };

  const handleSessionAction = (action, session) => {
    switch (action) {
      case 'join':
        if (session?.meetingLink) {
          window.open(session?.meetingLink, '_blank');
        }
        break;
      case 'reschedule': console.log('Reschedule session:', session);
        break;
      case 'cancel':
        setSessions(prev => 
          prev?.map(s => s?.id === session?.id ? { ...s, status: 'cancelled' } : s)
        );
        break;
      case 'delete':
        setSessions(prev => prev?.filter(s => s?.id !== session?.id));
        setIsDetailsModalOpen(false);
        break;
      case 'notes':
        setSelectedSession(session);
        setIsDetailsModalOpen(true);
        break;
      case 'saveNotes':
        setSessions(prev => 
          prev?.map(s => s?.id === session?.id ? { ...s, notes: session?.notes } : s)
        );
        break;
      case 'feedback': console.log('Add feedback for session:', session);
        break;
      case 'menu': console.log('Show session menu:', session);
        break;
      default:
        console.log('Unknown action:', action, session);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      menteeId: '',
      startDate: '',
      endDate: '',
      search: '',
      quickFilter: ''
    });
  };

  const headerActions = [
    {
      label: 'Filters',
      icon: 'Filter',
      variant: showFilters ? 'default' : 'outline',
      onClick: () => setShowFilters(!showFilters)
    },
    {
      label: 'Export',
      icon: 'Download',
      variant: 'outline',
      onClick: () => console.log('Export sessions')
    },
    {
      label: 'Create Session',
      icon: 'Plus',
      variant: 'default',
      onClick: () => setIsCreateModalOpen(true)
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      <div className="pt-16 lg:pt-5">
        <NavigationHeader
          title="Session Management"
          subtitle={`Manage your mentorship sessions and schedule new meetings`}
          actions={headerActions}
        />

        <div className="px-4 lg:px-6 py-6 space-y-6">
          {/* Filters */}
          {showFilters && (
            <SessionFilters
              filters={filters}
              onFiltersChange={setFilters}
              mentees={mentees}
              onClearFilters={handleClearFilters}
            />
          )}

          {/* Session Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-card-foreground">
                    {sessions?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-card-foreground">
                    {sessions?.filter(s => s?.status === 'upcoming')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-card-foreground">
                    {sessions?.filter(s => s?.status === 'completed')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-card-foreground">
                    {mentees?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Mentees</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <SessionCalendar
            sessions={filteredSessions}
            onSessionClick={handleSessionClick}
            onCreateSession={() => setIsCreateModalOpen(true)}
            currentView={currentView}
            onViewChange={setCurrentView}
          />

          {/* Session List */}
          <SessionList
            sessions={filteredSessions}
            onSessionAction={handleSessionAction}
            onSessionClick={handleSessionClick}
          />
        </div>
      </div>
      {/* Modals */}
      <CreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSession={handleCreateSession}
        mentees={mentees}
      />
      <SessionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        session={selectedSession}
        onSessionAction={handleSessionAction}
      />
      {/* Mobile bottom padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default SessionManagement;