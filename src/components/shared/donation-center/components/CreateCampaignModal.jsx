import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import { File, Image, Video, Calendar, Tag, X } from "lucide-react";
import { BiMoney } from "react-icons/bi";

const CreateCampaignModal = ({ isOpen, onClose, onSubmit }) => {
  const [campaignName, setCampaignName] = useState("");
  const [reason, setReason] = useState("");
  const [problem, setProblem] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (setter) => (e) => {
    setter(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    if (!campaignName || !reason || !problem) {
      alert("Please fill in all required fields!");
      return;
    }
    onSubmit({
      campaignName,
      reason,
      problem,
      images,
      videos,
      documents,
      category,
      startDate,
      endDate,
      budget,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto scrollbar-hide">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative transform transition-transform duration-300 scale-100 mx-4 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create New Campaign
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to launch your campaign.
        </p>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          {/* Campaign Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag size={18} className="mr-2 text-gray-500" />
              Campaign Name <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                placeholder="Enter campaign name"
              />
            </div>
          </div>

          {/* Reason / Purpose */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <File size={18} className="mr-2 text-gray-500" />
              Campaign Reason <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex justify-center">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                rows={3}
                placeholder="Describe the purpose of the campaign"
              />
            </div>
          </div>

          {/* Problem Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <File size={18} className="mr-2 text-gray-500" />
              Problem Description <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex justify-center">
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                rows={3}
                placeholder="Describe the problem your campaign is addressing"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Image size={18} className="mr-2 text-gray-500" /> Upload Images
            </label>
            <div className="flex justify-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange(setImages)}
                className="w-full max-w-[95%] border border-border rounded-lg p-1.5 cursor-pointer text-sm"
              />
            </div>
            {images.length > 0 && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                {images.map((f) => f.name).join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Video size={18} className="mr-2 text-gray-500" /> Upload Videos
            </label>
            <div className="flex justify-center">
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleFileChange(setVideos)}
                className="w-full max-w-[95%] border border-border rounded-lg p-1.5 cursor-pointer text-sm"
              />
            </div>
            {videos.length > 0 && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                {videos.map((f) => f.name).join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <File size={18} className="mr-2 text-gray-500" /> Upload Documents
            </label>
            <div className="flex justify-center">
              <input
                type="file"
                multiple
                onChange={handleFileChange(setDocuments)}
                className="w-full max-w-[95%] border border-border rounded-lg p-1.5 cursor-pointer text-sm"
              />
            </div>
            {documents.length > 0 && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                {documents.map((f) => f.name).join(", ")}
              </p>
            )}
          </div>

          {/* Category / Tags */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag size={18} className="mr-2 text-gray-500" /> Category / Tags
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                placeholder="Enter category or tags"
              />
            </div>
          </div>

          {/* Optional Dates & Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar size={18} className="mr-2 text-gray-500" /> Start Date
              </label>
              <div className="flex justify-center">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar size={18} className="mr-2 text-gray-500" /> End Date
              </label>
              <div className="flex justify-center">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <BiMoney size={18} className="mr-2 text-gray-500" /> Budget / Goal
              (USD)
            </label>
            <div className="flex justify-center">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full max-w-[95%] p-1.5 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"
                placeholder="Enter budget / goal amount"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="mt-6 w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          onClick={handleSubmit}
        >
          Create Campaign
        </Button>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
