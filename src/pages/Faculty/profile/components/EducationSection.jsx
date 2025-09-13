import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '../../../../components/ui/Button';

const EducationSection = ({ education, isEditing, isOwner, onUpdate }) => {
  const [editEducation, setEditEducation] = useState(education || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: [],
    relevantCoursework: []
  });

  const degreeTypes = [
    'Associate Degree',
    'Bachelor of Science',
    'Bachelor of Arts',
    'Master of Science',
    'Master of Arts',
    'Master of Business Administration',
    'Doctor of Philosophy',
    'Juris Doctor',
    'Other'
  ];

  const handleAddEducation = () => {
    const educationToAdd = {
      ...newEducation,
      id: Date.now(),
      honors: newEducation?.honors?.filter(Boolean),
      relevantCoursework: newEducation?.relevantCoursework?.filter(Boolean)
    };
    
    const updated = [...editEducation, educationToAdd];
    setEditEducation(updated);
    onUpdate(updated);
    setNewEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
      relevantCoursework: []
    });
    setShowAddForm(false);
  };

  const handleUpdateEducation = (index, updatedEdu) => {
    const updated = [...editEducation];
    updated[index] = updatedEdu;
    setEditEducation(updated);
    onUpdate(updated);
    setEditingIndex(-1);
  };

  const handleDeleteEducation = (index) => {
    const updated = editEducation?.filter((_, i) => i !== index);
    setEditEducation(updated);
    onUpdate(updated);
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return 'Present';
    
    const start = format(new Date(startDate), 'yyyy');
    if (!endDate) return `${start} - Present`;
    
    const end = format(new Date(endDate), 'yyyy');
    return `${start} - ${end}`;
  };

  const EducationForm = ({ educationData, onSave, onCancel, isNew = false }) => {
    const [formData, setFormData] = useState(educationData);
    const [honors, setHonors] = useState(educationData?.honors || ['']);
    const [coursework, setCoursework] = useState(educationData?.relevantCoursework || ['']);

    const handleHonorChange = (index, value) => {
      const updated = [...honors];
      updated[index] = value;
      setHonors(updated);
      setFormData(prev => ({ ...prev, honors: updated }));
    };

    const addHonor = () => {
      setHonors([...honors, '']);
    };

    const removeHonor = (index) => {
      const updated = honors?.filter((_, i) => i !== index);
      setHonors(updated);
      setFormData(prev => ({ ...prev, honors: updated }));
    };

    const handleCourseworkChange = (index, value) => {
      const updated = [...coursework];
      updated[index] = value;
      setCoursework(updated);
      setFormData(prev => ({ ...prev, relevantCoursework: updated }));
    };

    const addCoursework = () => {
      setCoursework([...coursework, '']);
    };

    const removeCoursework = (index) => {
      const updated = coursework?.filter((_, i) => i !== index);
      setCoursework(updated);
      setFormData(prev => ({ ...prev, relevantCoursework: updated }));
    };

    return (
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Institution
            </label>
            <input
              type="text"
              value={formData?.institution || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Stanford University"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Degree
            </label>
            <select
              value={formData?.degree || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select degree type</option>
              {degreeTypes?.map(degree => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Field of Study
            </label>
            <input
              type="text"
              value={formData?.field || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, field: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              GPA (Optional)
            </label>
            <input
              type="text"
              value={formData?.gpa || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, gpa: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., 3.8"
            />
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
              End Date (Expected)
            </label>
            <input
              type="month"
              value={formData?.endDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e?.target?.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-text-primary">
              Honors & Awards
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={addHonor}
              iconName="Plus"
              iconPosition="left"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {honors?.map((honor, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={honor}
                  onChange={(e) => handleHonorChange(index, e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Dean's List, Magna Cum Laude"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeHonor(index)}
                  iconName="X"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-text-primary">
              Relevant Coursework
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={addCoursework}
              iconName="Plus"
              iconPosition="left"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {coursework?.map((course, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => handleCourseworkChange(index, e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Data Structures & Algorithms"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCoursework(index)}
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
            {isNew ? 'Add Education' : 'Save Changes'}
          </Button>
        </div>
      </div>
    );
  };

  if (isEditing && isOwner) {
    return (
      <div className="bg-card rounded-lg elevation-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Education</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Education
          </Button>
        </div>

        <div className="space-y-6">
          {showAddForm && (
            <EducationForm
              educationData={newEducation}
              onSave={handleAddEducation}
              onCancel={() => setShowAddForm(false)}
              isNew
            />
          )}

          {editEducation?.map((edu, index) => (
            <div key={edu?.id} className="border border-border rounded-lg p-4">
              {editingIndex === index ? (
                <EducationForm
                  educationData={edu}
                  onSave={(data) => handleUpdateEducation(index, data)}
                  onCancel={() => setEditingIndex(-1)}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">
                        {edu?.degree} in {edu?.field}
                      </h3>
                      <p className="text-text-secondary">
                        {edu?.institution}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {formatDateRange(edu?.startDate, edu?.endDate)}
                        {edu?.gpa && ` • GPA: ${edu?.gpa}`}
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
                        onClick={() => handleDeleteEducation(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {edu?.honors?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-text-primary mb-1">Honors & Awards:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu?.honors?.map((honor, honorIndex) => (
                          <span key={honorIndex} className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                            {honor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu?.relevantCoursework?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-text-primary mb-1">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu?.relevantCoursework?.map((course, courseIndex) => (
                          <span key={courseIndex} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
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
      <h2 className="text-xl font-semibold text-text-primary mb-6">Education</h2>
      
      {education?.length > 0 ? (
        <div className="space-y-6">
          {education?.map((edu) => (
            <div key={edu?.id} className="flex gap-4">
              {/* Institution Logo Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-text-secondary">
                    🎓
                  </span>
                </div>
              </div>

              {/* Education Details */}
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">
                  {edu?.degree} in {edu?.field}
                </h3>
                <p className="text-text-secondary">
                  {edu?.institution}
                </p>
                <p className="text-sm text-text-secondary">
                  {formatDateRange(edu?.startDate, edu?.endDate)}
                  {edu?.gpa && ` • GPA: ${edu?.gpa}`}
                </p>

                {edu?.honors?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-text-primary mb-2">Honors & Awards:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu?.honors?.map((honor, index) => (
                        <span key={index} className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                          {honor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu?.relevantCoursework?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-text-primary mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu?.relevantCoursework?.map((course, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎓</div>
          <p className="text-text-secondary">
            {isOwner ? 'Add your educational background to showcase your academic achievements' : 'No education information available'}
          </p>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {/* Handle edit mode activation */}}
            >
              Add Education
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationSection;