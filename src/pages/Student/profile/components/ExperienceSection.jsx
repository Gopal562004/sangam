import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '../../../../components/ui/Button';

const ExperienceSection = ({ experiences, isEditing, isOwner, onUpdate }) => {
  const [editExperiences, setEditExperiences] = useState(experiences || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: []
  });

  const experienceTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const handleAddExperience = () => {
    const experienceToAdd = {
      ...newExperience,
      id: Date.now(),
      achievements: newExperience?.achievements?.filter(Boolean)
    };
    
    const updated = [...editExperiences, experienceToAdd];
    setEditExperiences(updated);
    onUpdate(updated);
    setNewExperience({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    });
    setShowAddForm(false);
  };

  const handleUpdateExperience = (index, updatedExp) => {
    const updated = [...editExperiences];
    updated[index] = updatedExp;
    setEditExperiences(updated);
    onUpdate(updated);
    setEditingIndex(-1);
  };

  const handleDeleteExperience = (index) => {
    const updated = editExperiences?.filter((_, i) => i !== index);
    setEditExperiences(updated);
    onUpdate(updated);
  };

  const formatDateRange = (startDate, endDate, current) => {
    if (!startDate) return 'Present';
    
    const start = format(new Date(startDate), 'MMM yyyy');
    if (current) return `${start} - Present`;
    if (!endDate) return start;
    
    const end = format(new Date(endDate), 'MMM yyyy');
    return `${start} - ${end}`;
  };

  const ExperienceForm = ({ experience, onSave, onCancel, isNew = false }) => {
    const [formData, setFormData] = useState(experience);
    const [achievements, setAchievements] = useState(experience?.achievements || ['']);

    const handleAchievementChange = (index, value) => {
      const updated = [...achievements];
      updated[index] = value;
      setAchievements(updated);
      setFormData(prev => ({ ...prev, achievements: updated }));
    };

    const addAchievement = () => {
      setAchievements([...achievements, '']);
    };

    const removeAchievement = (index) => {
      const updated = achievements?.filter((_, i) => i !== index);
      setAchievements(updated);
      setFormData(prev => ({ ...prev, achievements: updated }));
    };

    return (
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={formData?.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData?.company || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Google"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData?.location || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Employment Type
            </label>
            <select
              value={formData?.type || 'full-time'}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {experienceTypes?.map(type => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Start Date
            </label>
            <input
              type="month"
              value={formData?.startDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              End Date
            </label>
            <input
              type="month"
              value={formData?.endDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e?.target?.value }))}
              disabled={formData?.current}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="current"
            checked={formData?.current || false}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              current: e?.target?.checked,
              endDate: e?.target?.checked ? '' : prev?.endDate
            }))}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          <label htmlFor="current" className="ml-2 text-sm text-text-primary">
            I currently work here
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Description
          </label>
          <textarea
            value={formData?.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            placeholder="Describe your role and responsibilities..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-text-primary">
              Key Achievements
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={addAchievement}
              iconName="Plus"
              iconPosition="left"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {achievements?.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Improved system performance by 30%"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAchievement(index)}
                  iconName="X"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>
            {isNew ? 'Add Experience' : 'Save Changes'}
          </Button>
        </div>
      </div>
    );
  };

  if (isEditing && isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Experience</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Experience
          </Button>
        </div>

        <div className="space-y-6">
          {showAddForm && (
            <ExperienceForm
              experience={newExperience}
              onSave={handleAddExperience}
              onCancel={() => setShowAddForm(false)}
              isNew
            />
          )}

          {editExperiences?.map((experience, index) => (
            <div key={experience?.id} className="border border-border rounded-lg p-4">
              {editingIndex === index ? (
                <ExperienceForm
                  experience={experience}
                  onSave={(data) => handleUpdateExperience(index, data)}
                  onCancel={() => setEditingIndex(-1)}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {experience?.title}
                      </h3>
                      <p className="text-text-secondary">
                        {experience?.company} • {experience?.location}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {formatDateRange(experience?.startDate, experience?.endDate, experience?.current)} • {experience?.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setEditingIndex(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleDeleteExperience(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {experience?.description && (
                    <p className="text-text-primary mt-3 text-sm leading-relaxed">
                      {experience?.description}
                    </p>
                  )}

                  {experience?.achievements?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-text-primary mb-2">Key Achievements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {experience?.achievements?.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-text-secondary">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg elevation-2 p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Experience</h2>
      
      {experiences?.length > 0 ? (
        <div className="space-y-6">
          {experiences?.map((experience) => (
            <div key={experience?.id} className="flex gap-4">
              {/* Company Logo Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-text-secondary">
                    {experience?.company?.substring(0, 1)}
                  </span>
                </div>
              </div>

              {/* Experience Details */}
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">
                  {experience?.title}
                </h3>
                <p className="text-text-secondary">
                  {experience?.company} • {experience?.location}
                </p>
                <p className="text-sm text-text-secondary">
                  {formatDateRange(experience?.startDate, experience?.endDate, experience?.current)} • {experience?.type}
                </p>

                {experience?.description && (
                  <p className="text-text-primary mt-3 text-sm leading-relaxed">
                    {experience?.description}
                  </p>
                )}

                {experience?.achievements?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-text-primary mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {experience?.achievements?.map((achievement, index) => (
                        <li key={index} className="text-sm text-text-secondary">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">💼</div>
          <p className="text-text-secondary">
            {isOwner ? 'Add your work experience to showcase your career journey' : 'No experience information available'}
          </p>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {/* Handle edit mode activation */}}
            >
              Add Experience
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;