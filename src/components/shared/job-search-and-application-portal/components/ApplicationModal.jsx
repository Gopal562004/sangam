import React, { useState, useRef } from 'react';
import Icon from '../../../AppIcon';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,
    customAnswers: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  const customQuestions = [
    {
      id: 'experience',
      question: 'How many years of relevant experience do you have?',
      type: 'select',
      options: ['0-1 years', '1-3 years', '3-5 years', '5+ years'],
      required: true
    },
    {
      id: 'availability',
      question: 'When are you available to start?',
      type: 'select',
      options: ['Immediately', '2 weeks notice', '1 month notice', 'More than 1 month'],
      required: true
    },
    {
      id: 'remote',
      question: 'Are you comfortable working remotely?',
      type: 'select',
      options: ['Yes, fully remote', 'Hybrid preferred', 'Office preferred', 'No preference'],
      required: false
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomAnswer = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      customAnswers: {
        ...prev?.customAnswers,
        [questionId]: answer
      }
    }));
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']?.includes(file?.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit?.({
      job: job,
      application: formData
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData?.firstName && formData?.lastName && formData?.email && formData?.phone;
      case 2:
        return formData?.resume;
      case 3:
        const requiredQuestions = customQuestions?.filter(q => q?.required);
        return requiredQuestions?.every(q => formData?.customAnswers?.[q?.id]);
      default:
        return true;
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">Apply for {job?.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {job?.company?.name} • {job?.location}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-6">
              {[1, 2, 3]?.map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : step < currentStep
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step < currentStep ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        step < currentStep ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Personal Info</span>
              <span>Resume</span>
              <span>Questions</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      value={formData?.firstName}
                      onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      value={formData?.lastName}
                      onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Resume Upload */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">Resume & Cover Letter</h2>
                
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resume *
                  </label>
                  <div
                    onClick={() => fileInputRef?.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    {formData?.resume ? (
                      <div className="space-y-2">
                        <Icon name="FileText" size={32} className="text-success mx-auto" />
                        <div className="text-sm font-medium text-foreground">
                          {formData?.resume?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(formData?.resume?.size / 1024 / 1024)?.toFixed(1)} MB
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            setFormData(prev => ({ ...prev, resume: null }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Icon name="Upload" size={32} className="text-muted-foreground mx-auto" />
                        <div className="text-sm font-medium text-foreground">
                          Click to upload your resume
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF, DOC, or DOCX • Max 5MB
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={formData?.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e?.target?.value)}
                    placeholder="Tell us why you're interested in this position..."
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Custom Questions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Additional Questions</h2>
                
                {customQuestions?.map((question) => (
                  <div key={question?.id} className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {question?.question} {question?.required && <span className="text-destructive">*</span>}
                    </label>
                    <select
                      value={formData?.customAnswers?.[question?.id] || ''}
                      onChange={(e) => handleCustomAnswer(question?.id, e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required={question?.required}
                    >
                      <option value="">Select an answer</option>
                      {question?.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Application Summary</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Name: {formData?.firstName} {formData?.lastName}</div>
                    <div>Email: {formData?.email}</div>
                    <div>Phone: {formData?.phone}</div>
                    <div>Resume: {formData?.resume?.name || 'Not uploaded'}</div>
                    <div>Cover Letter: {formData?.coverLetter ? 'Included' : 'Not provided'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card border-t border-border p-6">
            <div className="flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                  loading={isSubmitting}
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;