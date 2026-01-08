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
    price: initialData?.price || "",
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
    if (!formData.price) newErrors.price = "Price is required";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Station Name */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Station Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
            placeholder="e.g. Downtown Charging Hub"
          />
          {errors.name && <p className="text-[9px] text-red-400 flex items-center gap-1.5 font-bold uppercase tracking-widest ml-1"><AlertCircle size={10} /> {errors.name}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Address/Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full bg-white/[0.03] border ${errors.location ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
            placeholder="123 Main Street, City"
          />
          {errors.location && <p className="text-[9px] text-red-400 flex items-center gap-1.5 font-bold uppercase tracking-widest ml-1"><AlertCircle size={10} /> {errors.location}</p>}
        </div>

        {/* Coordinates Group */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className={`w-full bg-white/[0.03] border ${errors.latitude ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
              placeholder="e.g. 40.7128"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className={`w-full bg-white/[0.03] border ${errors.longitude ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
              placeholder="e.g. -74.0060"
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-all duration-300 cursor-pointer font-medium"
          >
            <option value="Active" className="bg-midnight">Active</option>
            <option value="Inactive" className="bg-midnight">Inactive</option>
          </select>
        </div>

        {/* Power Output */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Power Output (kW)
          </label>
          <input
            type="number"
            step="0.1"
            name="powerOutput"
            value={formData.powerOutput}
            onChange={handleChange}
            className={`w-full bg-white/[0.03] border ${errors.powerOutput ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
            placeholder="e.g. 50.0"
          />
        </div>

        {/* Connector Type */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Connector Type
          </label>
          <select
            name="connectorType"
            value={formData.connectorType}
            onChange={handleChange}
            className={`w-full bg-white/[0.03] border ${errors.connectorType ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[13px] text-white focus:outline-none focus:border-brand-primary transition-all duration-300 cursor-pointer font-medium`}
          >
            <option value="" className="bg-midnight">Select a connector type</option>
            {connectorTypes.map((type) => (
              <option key={type} value={type} className="bg-midnight">{type}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Price
          </label>
          <input
            type="number"
            step="any"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full bg-white/[0.03] border ${errors.price ? 'border-red-500/30' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all duration-300 font-medium`}
            placeholder="e.g. 5.0"
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {amenitiesOptions.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityChange(amenity)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 flex items-center gap-2 ${formData.amenities.includes(amenity)
                ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary shadow-lg shadow-brand-primary/5"
                : "bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:border-white/20"
                }`}
            >
              {formData.amenities.includes(amenity) && <Check size={12} />}
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-6 flex justify-end gap-3 border-t border-white/5">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary !rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary !rounded-full px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest shadow-2xl shadow-brand-primary/20"
        >
          {initialData ? "Update Station" : "Add Station"}
        </button>
      </div>
    </form>
  );
};

export default StationForm;
