import React, { useState } from "react";

const StationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    status: initialData?.status || "Active",
    powerOutput: initialData?.powerOutput || "",
    connectorType: initialData?.connectorType || "",
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

  // Handle change & clear error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required";
    } else if (
      isNaN(formData.latitude) ||
      formData.latitude < -90 ||
      formData.latitude > 90
    ) {
      newErrors.latitude = "Latitude must be a number between -90 and 90";
    }

    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required";
    } else if (
      isNaN(formData.longitude) ||
      formData.longitude < -180 ||
      formData.longitude > 180
    ) {
      newErrors.longitude = "Longitude must be a number between -180 and 180";
    }

    if (!formData.powerOutput) {
      newErrors.powerOutput = "Power output is required";
    } else if (isNaN(formData.powerOutput) || formData.powerOutput <= 0) {
      newErrors.powerOutput = "Power output must be a positive number";
    }

    if (!formData.connectorType) {
      newErrors.connectorType = "Connector type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert numeric fields
      const submissionData = {
        name: formData.name,
        location: formData.location,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        status: formData.status,
        powerOutput: parseFloat(formData.powerOutput),
        connectorType: formData.connectorType,
      };

      onSubmit(submissionData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 rounded-xl bg-gray-900/70 backdrop-blur-lg border border-gray-800/50 shadow-xl"
    >
      {/* Station Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-light tracking-wide text-gray-300 mb-2"
        >
          Station Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
            errors.name ? "border-red-500/70" : "border-gray-800/50"
          } text-white placeholder-gray-500 transition-all duration-200`}
          placeholder="e.g. Downtown Charging Hub"
        />
        {errors.name && (
          <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
            {errors.name}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-light tracking-wide text-gray-300 mb-2"
        >
          Address/Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
            errors.location ? "border-red-500/70" : "border-gray-800/50"
          } text-white placeholder-gray-500 transition-all duration-200`}
          placeholder="123 Main Street, City"
        />
        {errors.location && (
          <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
            {errors.location}
          </p>
        )}
      </div>

      {/* Coordinates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-light tracking-wide text-gray-300 mb-2"
          >
            Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
              errors.latitude ? "border-red-500/70" : "border-gray-800/50"
            } text-white placeholder-gray-500 transition-all duration-200`}
            placeholder="e.g. 40.7128"
          />
          {errors.latitude && (
            <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
              {errors.latitude}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-light tracking-wide text-gray-300 mb-2"
          >
            Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
              errors.longitude ? "border-red-500/70" : "border-gray-800/50"
            } text-white placeholder-gray-500 transition-all duration-200`}
            placeholder="e.g. -74.0060"
          />
          {errors.longitude && (
            <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
              {errors.longitude}
            </p>
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-light tracking-wide text-gray-300 mb-2"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border border-gray-800/50 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 text-white transition-all duration-200"
        >
          <option value="Active" className="bg-gray-800">
            Active
          </option>
          <option value="Inactive" className="bg-gray-800">
            Inactive
          </option>
        </select>
      </div>

      {/* Power Output */}
      <div>
        <label
          htmlFor="powerOutput"
          className="block text-sm font-light tracking-wide text-gray-300 mb-2"
        >
          Power Output (kW)
        </label>
        <input
          type="number"
          step="0.1"
          name="powerOutput"
          id="powerOutput"
          value={formData.powerOutput}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
            errors.powerOutput ? "border-red-500/70" : "border-gray-800/50"
          } text-white placeholder-gray-500 transition-all duration-200`}
          placeholder="e.g. 50.0"
        />
        {errors.powerOutput && (
          <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
            {errors.powerOutput}
          </p>
        )}
      </div>

      {/* Connector Type */}
      <div>
        <label
          htmlFor="connectorType"
          className="block text-sm font-light tracking-wide text-gray-300 mb-2"
        >
          Connector Type
        </label>
        <select
          id="connectorType"
          name="connectorType"
          value={formData.connectorType}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-900/50 ${
            errors.connectorType ? "border-red-500/70" : "border-gray-800/50"
          } text-white transition-all duration-200`}
        >
          <option value="" className="bg-gray-800">
            Select a connector type
          </option>
          {connectorTypes.map((type) => (
            <option key={type} value={type} className="bg-gray-800">
              {type}
            </option>
          ))}
        </select>
        {errors.connectorType && (
          <p className="mt-2 text-xs font-light tracking-wide text-red-400/90">
            {errors.connectorType}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="pt-5 flex justify-end space-x-3 border-t border-gray-800/30">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-light tracking-wide rounded-lg border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-light tracking-wide rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
        >
          {initialData ? "Update Station" : "Add Station"}
        </button>
      </div>
    </form>
  );
};

export default StationForm;
