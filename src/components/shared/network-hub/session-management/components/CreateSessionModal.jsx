import React, { useState } from 'react';
import Icon from '../../../../AppIcon';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';

const CreateSessionModal = ({ isOpen, onClose, onCreateSession, mentees = [] }) => {
  const [formData, setFormData] = useState({
    menteeId: '',
    date: '',
    time: '',
    duration: '60',
    topic: '',
    description: '',
    meetingLink: '',
    preparationMaterials: '',
    agenda: ''
  });

  const [errors, setErrors] = useState({});
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const generateMeetingLink = async () => {
    setIsGeneratingLink(true);
    
    // Simulate API call to generate meeting link
    setTimeout(() => {
      const meetingId = Math.random()?.toString(36)?.substring(2, 15);
      const link = `https://meet.networkmentorship.com/session/${meetingId}`;
      handleInputChange('meetingLink', link);
      setIsGeneratingLink(false);
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.menteeId) newErrors.menteeId = 'Please select a mentee';
    if (!formData?.date) newErrors.date = 'Please select a date';
    if (!formData?.time) newErrors.time = 'Please select a time';
    if (!formData?.topic?.trim()) newErrors.topic = 'Please enter a session topic';
    
    // Validate date is not in the past
    const selectedDate = new Date(formData.date + ' ' + formData.time);
    const now = new Date();
    if (selectedDate <= now) {
      newErrors.date = 'Session date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    const selectedMentee = mentees?.find(m => m?.id === formData?.menteeId);
    
    const sessionData = {
      id: Date.now()?.toString(),
      mentee: selectedMentee?.name || 'Unknown',
      menteeAvatar: selectedMentee?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
      date: formData?.date,
      time: formData?.time,
      duration: parseInt(formData?.duration),
      topic: formData?.topic,
      description: formData?.description,
      meetingLink: formData?.meetingLink,
      preparationMaterials: formData?.preparationMaterials,
      agenda: formData?.agenda,
      status: 'upcoming',
      createdAt: new Date()?.toISOString()
    };
    
    onCreateSession(sessionData);
    onClose();
    
    // Reset form
    setFormData({
      menteeId: '',
      date: '',
      time: '',
      duration: '60',
      topic: '',
      description: '',
      meetingLink: '',
      preparationMaterials: '',
      agenda: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            Create New Session
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Mentee Selection */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Select Mentee *
            </label>
            <select
              value={formData?.menteeId}
              onChange={(e) => handleInputChange('menteeId', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a mentee...</option>
              {mentees?.map(mentee => (
                <option key={mentee?.id} value={mentee?.id}>
                  {mentee?.name}
                </option>
              ))}
            </select>
            {errors?.menteeId && (
              <p className="text-error text-sm mt-1">{errors?.menteeId}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date *"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              error={errors?.date}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
            
            <Input
              label="Time *"
              type="time"
              value={formData?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              error={errors?.time}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Duration
            </label>
            <select
              value={formData?.duration}
              onChange={(e) => handleInputChange('duration', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {durationOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <Input
            label="Session Topic *"
            type="text"
            placeholder="e.g., Career Planning Discussion"
            value={formData?.topic}
            onChange={(e) => handleInputChange('topic', e?.target?.value)}
            error={errors?.topic}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Brief description of what will be covered in this session..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Meeting Link
            </label>
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="https://meet.example.com/session-id"
                value={formData?.meetingLink}
                onChange={(e) => handleInputChange('meetingLink', e?.target?.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateMeetingLink}
                loading={isGeneratingLink}
                iconName="Link"
              >
                Generate
              </Button>
            </div>
          </div>

          {/* Preparation Materials */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Preparation Materials
            </label>
            <textarea
              value={formData?.preparationMaterials}
              onChange={(e) => handleInputChange('preparationMaterials', e?.target?.value)}
              placeholder="List any materials or resources the mentee should review before the session..."
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Session Agenda
            </label>
            <textarea
              value={formData?.agenda}
              onChange={(e) => handleInputChange('agenda', e?.target?.value)}
              placeholder={`1. Introduction and check-in (5 min)\n2. Review previous action items (10 min)\n3. Main discussion topics (35 min)\n4. Next steps and action items (10 min)`}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Calendar"
              iconPosition="left"
            >
              Create Session
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionModal;