import React, { useState } from "react";
import { AlertCircle, Check, X } from "lucide-react";

const amenitiesOptions = ["WiFi", "Restroom", "Parking", "Cafe", "Shopping"];

const StationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    status: initialData?.status || "Active",
    powerOutput: initialData?.powerOutput || "",
    connectorType: initialData?.connectorType || "",
    amenities: initialData?.amenities || [],
  });

  const [errors, setErrors] = useState({});

  const connectorTypes = [
    "Type 1",
    "Type 2",
    "CCS",
    "CHAdeMO",
    "CCS/CHAdeMO",
    "Tesla",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    if (!formData.powerOutput) newErrors.powerOutput = "Power output is required";
    if (!formData.connectorType) newErrors.connectorType = "Connector type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      if (prev.amenities.includes(amenity)) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) };
      }
      return { ...prev, amenities: [...prev.amenities, amenity] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        powerOutput: parseFloat(formData.powerOutput),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Station Name */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Station Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-reflect-muted/20 focus:outline-none focus:border-blue-500 transition-all duration-300`}
            placeholder="e.g. Downtown Charging Hub"
          />
          {errors.name && <p className="text-[10px] text-red-400 flex items-center gap-1.5 font-bold uppercase tracking-widest"><AlertCircle size={12} /> {errors.name}</p>}
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Address/Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.location ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-reflect-muted/20 focus:outline-none focus:border-blue-500 transition-all duration-300`}
            placeholder="123 Main Street, City"
          />
          {errors.location && <p className="text-[10px] text-red-400 flex items-center gap-1.5 font-bold uppercase tracking-widest"><AlertCircle size={12} /> {errors.location}</p>}
        </div>

        {/* Coordinates */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.latitude ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-reflect-muted/20 focus:outline-none focus:border-blue-500 transition-all duration-300`}
            placeholder="e.g. 40.7128"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.longitude ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-reflect-muted/20 focus:outline-none focus:border-blue-500 transition-all duration-300`}
            placeholder="e.g. -74.0060"
          />
        </div>

        {/* Status */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all duration-300 cursor-pointer"
          >
            <option value="Active" className="bg-midnight">Active</option>
            <option value="Inactive" className="bg-midnight">Inactive</option>
          </select>
        </div>

        {/* Power Output */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Power Output (kW)
          </label>
          <input
            type="number"
            step="0.1"
            name="powerOutput"
            value={formData.powerOutput}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.powerOutput ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white placeholder:text-reflect-muted/20 focus:outline-none focus:border-blue-500 transition-all duration-300`}
            placeholder="e.g. 50.0"
          />
        </div>

        {/* Connector Type */}
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
            Connector Type
          </label>
          <select
            name="connectorType"
            value={formData.connectorType}
            onChange={handleChange}
            className={`w-full bg-white/5 border ${errors.connectorType ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all duration-300 cursor-pointer`}
          >
            <option value="" className="bg-midnight">Select a connector type</option>
            {connectorTypes.map((type) => (
              <option key={type} value={type} className="bg-midnight">{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-reflect-muted">
          Amenities
        </label>
        <div className="flex flex-wrap gap-3">
          {amenitiesOptions.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityChange(amenity)}
              className={`px-5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 flex items-center gap-2.5 ${formData.amenities.includes(amenity)
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10"
                : "bg-white/5 border-white/10 text-reflect-muted hover:bg-white/10 hover:border-white/20"
                }`}
            >
              {formData.amenities.includes(amenity) && <Check size={14} />}
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-10 flex justify-end gap-4 border-t border-white/5">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary !rounded-full px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary !rounded-full px-10 py-3.5 text-[15px] font-bold uppercase tracking-widest shadow-2xl shadow-blue-500/20"
        >
          {initialData ? "Update Station" : "Add Station"}
        </button>
      </div>
    </form>
  );
};

export default StationForm;
