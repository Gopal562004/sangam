import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Image from '../../../../AppImage';

const SessionDetailsModal = ({ isOpen, onClose, session, onSessionAction }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [notes, setNotes] = useState(session?.notes || '');

  if (!isOpen || !session) return null;

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'agenda', label: 'Agenda', icon: 'List' },
    { id: 'materials', label: 'Materials', icon: 'BookOpen' },
    { id: 'notes', label: 'Notes', icon: 'FileText' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return { icon: 'Clock', color: 'text-primary', bg: 'bg-primary/20' };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success', bg: 'bg-success/20' };
      case 'cancelled':
        return { icon: 'XCircle', color: 'text-error', bg: 'bg-error/20' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground', bg: 'bg-muted' };
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const statusInfo = getStatusIcon(session?.status);

  const handleSaveNotes = () => {
    onSessionAction('saveNotes', { ...session, notes });
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Session Info */}
      <div className="flex items-start space-x-4">
        <Image
          src={session?.menteeAvatar}
          alt={session?.mentee}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground">
            {session?.topic}
          </h3>
          <p className="text-muted-foreground">with {session?.mentee}</p>
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusInfo?.bg} ${statusInfo?.color}`}>
            <Icon name={statusInfo?.icon} size={14} />
            <span className="capitalize">{session?.status}</span>
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{formatDate(session?.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">{formatTime(session?.time)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Timer" size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{session?.duration} minutes</p>
            </div>
          </div>
          
          {session?.meetingLink && (
            <div className="flex items-center space-x-3">
              <Icon name="Video" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Meeting Link</p>
                <a 
                  href={session?.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Join Meeting
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {session?.description && (
        <div>
          <h4 className="font-medium text-card-foreground mb-2">Description</h4>
          <p className="text-muted-foreground">{session?.description}</p>
        </div>
      )}
    </div>
  );

  const renderAgendaTab = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-card-foreground">Session Agenda</h4>
      {session?.agenda ? (
        <div className="bg-muted rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
            {session?.agenda}
          </pre>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="List" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No agenda set for this session</p>
        </div>
      )}
    </div>
  );

  const renderMaterialsTab = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-card-foreground">Preparation Materials</h4>
      {session?.preparationMaterials ? (
        <div className="bg-muted rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
            {session?.preparationMaterials}
          </pre>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="BookOpen" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No preparation materials provided</p>
        </div>
      )}
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-card-foreground">Session Notes</h4>
        {session?.status === 'completed' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveNotes}
            iconName="Save"
            iconPosition="left"
          >
            Save Notes
          </Button>
        )}
      </div>
      
      <textarea
        value={notes}
        onChange={(e) => setNotes(e?.target?.value)}
        placeholder="Add your session notes here..."
        rows={8}
        className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        disabled={session?.status !== 'completed'}
      />
      
      {session?.status !== 'completed' && (
        <p className="text-sm text-muted-foreground">
          Notes can be added after the session is completed
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            Session Details
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'agenda' && renderAgendaTab()}
          {activeTab === 'materials' && renderMaterialsTab()}
          {activeTab === 'notes' && renderNotesTab()}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <div className="flex space-x-2">
            {session?.status === 'upcoming' && (
              <>
                <Button
                  variant="default"
                  onClick={() => onSessionAction('join', session)}
                  iconName="Video"
                  iconPosition="left"
                >
                  Join Session
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onSessionAction('reschedule', session)}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Reschedule
                </Button>
              </>
            )}
            
            {session?.status === 'completed' && (
              <Button
                variant="outline"
                onClick={() => onSessionAction('feedback', session)}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Add Feedback
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => onSessionAction('delete', session)}
              iconName="Trash2"
              className="text-error hover:text-error"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsModal;