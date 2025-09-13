import React, { useState, useEffect } from 'react';
import Icon from '../../../AppIcon';
import Button from '../../../ui/Button';

const JobDetailsModal = ({ job, isOpen, onClose, onApply, onSave, isSaved = false }) => {
  const [saved, setSaved] = useState(isSaved);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(job?.id, !saved);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${(min/1000)}k - $${(max/1000)}k per year`;
    if (min) return `$${(min/1000)}k+ per year`;
    return 'Competitive salary';
  };

  const formatPostedTime = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted today';
    if (diffDays <= 7) return `Posted ${diffDays} days ago`;
    if (diffDays <= 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return 'Posted over a month ago';
  };

  const similarJobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'San Francisco, CA', salary: { min: 120000, max: 160000 } },
    { id: 2, title: 'React Developer', company: 'StartupXYZ', location: 'Remote', salary: { min: 90000, max: 130000 } },
    { id: 3, title: 'Full Stack Engineer', company: 'BigTech Inc', location: 'Seattle, WA', salary: { min: 130000, max: 180000 } }
  ];

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  {job?.company?.logo ? (
                    <img
                      src={job?.company?.logo}
                      alt={job?.company?.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <Icon name="Building" size={24} className="text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">{job?.title}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <span className="font-medium">{job?.company?.name}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>{job?.location}</span>
                    </div>
                    <span>{formatPostedTime(job?.postedDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Icon
                    name={saved ? "Bookmark" : "BookmarkPlus"}
                    size={24}
                    className={saved ? "text-primary fill-current" : "text-muted-foreground"}
                  />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Icon name="X" size={24} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <div className="text-lg font-semibold text-foreground">
                  {formatSalary(job?.salary?.min, job?.salary?.max)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {job?.employmentType}
                  </span>
                  {job?.remote && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">
                      Remote
                    </span>
                  )}
                  {job?.urgent && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                      Urgent Hiring
                    </span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onApply?.(job)}
                size="lg"
                className="px-8"
              >
                Apply Now
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 mt-4">
              {['description', 'company', 'similar']?.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'similar' ? 'Similar Jobs' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{job?.description || 'No description available.'}</p>
                  </div>
                </div>

                {/* Requirements */}
                {job?.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job?.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job?.benefits && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {job?.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="Star" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {job?.keyRequirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job?.keyRequirements?.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-6">
                {/* Company Info */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">About {job?.company?.name}</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{job?.company?.description || 'No company description available.'}</p>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {job?.company?.size || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Employees</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {job?.company?.founded || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {job?.company?.industry || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Industry</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {job?.company?.rating || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">Similar Positions</h3>
                {similarJobs?.map((similarJob) => (
                  <div
                    key={similarJob?.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{similarJob?.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{similarJob?.company}</span>
                          <span>•</span>
                          <span>{similarJob?.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          {formatSalary(similarJob?.salary?.min, similarJob?.salary?.max)}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Job
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card border-t border-border p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Ready to apply? Submit your application today!
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  onClick={() => onApply?.(job)}
                  size="lg"
                  className="px-8"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;