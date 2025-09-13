import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const PostJobForm = ({ onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    employmentType: "Full-time",
    remote: false,
    urgent: false,
    description: "",
    requirements: [""],
    benefits: [""],
    keySkills: [""],
    questions: [""],
  });

  const handleChange = (e) =>
    setJobData({ ...jobData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (field) =>
    setJobData({ ...jobData, [field]: !jobData[field] });

  const handleArrayChange = (field, index, value) => {
    const arr = [...jobData[field]];
    arr[index] = value;
    setJobData({ ...jobData, [field]: arr });
  };

  const handleAddItem = (field) =>
    setJobData({ ...jobData, [field]: [...jobData[field], ""] });

  const handleRemoveItem = (field, index) => {
    const arr = [...jobData[field]];
    arr.splice(index, 1);
    setJobData({ ...jobData, [field]: arr });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
    setJobData({
      title: "",
      companyName: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      employmentType: "Full-time",
      remote: false,
      urgent: false,
      description: "",
      requirements: [""],
      benefits: [""],
      keySkills: [""],
      questions: [""],
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Job Title & Company */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          placeholder="Senior Frontend Developer"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={jobData.companyName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          placeholder="TechCorp Inc"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          placeholder="San Francisco, CA"
          required
        />
      </div>

      {/* Salary */}
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-1">
            Min Salary ($)
          </label>
          <input
            type="number"
            name="salaryMin"
            value={jobData.salaryMin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            placeholder="120000"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-1">
            Max Salary ($)
          </label>
          <input
            type="number"
            name="salaryMax"
            value={jobData.salaryMax}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            placeholder="160000"
          />
        </div>
      </div>

      {/* Employment Type & Flags */}
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Employment Type
        </label>
        <select
          name="employmentType"
          value={jobData.employmentType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
        >
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={jobData.remote}
            onChange={() => handleCheckboxChange("remote")}
          />
          <span>Remote Option</span>
        </label>

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={jobData.urgent}
            onChange={() => handleCheckboxChange("urgent")}
          />
          <span>Urgent Hiring</span>
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Job Description
        </label>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          placeholder="We are looking for a talented Senior Frontend Developer..."
          rows={4}
          required
        />
      </div>

      {/* Requirements */}
      <DynamicField
        label="Requirements"
        field="requirements"
        data={jobData.requirements}
        handleArrayChange={handleArrayChange}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        placeholder="5+ years of frontend development experience"
      />

      {/* Benefits */}
      <DynamicField
        label="Benefits"
        field="benefits"
        data={jobData.benefits}
        handleArrayChange={handleArrayChange}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        placeholder="Competitive salary and equity package"
      />

      {/* Key Skills */}
      <DynamicField
        label="Required Skills"
        field="keySkills"
        data={jobData.keySkills}
        handleArrayChange={handleArrayChange}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        placeholder="React.js"
      />

      {/* Questions */}
      <DynamicField
        label="Questions for Applicants"
        field="questions"
        data={jobData.questions}
        handleArrayChange={handleArrayChange}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        placeholder="What is your experience with React?"
      />

      <Button type="submit" variant="primary" className="w-full">
        Submit for Approval
      </Button>
    </form>
  );
};

// Dynamic field component to reuse for requirements, benefits, skills, questions
const DynamicField = ({
  label,
  field,
  data,
  handleArrayChange,
  handleAddItem,
  handleRemoveItem,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">
      {label}
    </label>
    {data.map((item, index) => (
      <div key={index} className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          value={item}
          onChange={(e) => handleArrayChange(field, index, e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          placeholder={`${placeholder} ${index + 1}`}
        />
        <button type="button" onClick={() => handleRemoveItem(field, index)}>
          <Icon name="X" size={16} />
        </button>
      </div>
    ))}
    <button
      type="button"
      className="text-primary flex items-center space-x-1 mt-1"
      onClick={() => handleAddItem(field)}
    >
      <Icon name="Plus" size={16} />
      <span>Add {label}</span>
    </button>
  </div>
);

export default PostJobForm;
