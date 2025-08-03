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
      className="space-y-5 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100 shadow-sm"
    >
      {/* Station Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Station Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.name ? "border-red-400" : "border-orange-200"
            } text-gray-900 placeholder-orange-300 transition-all duration-200`}
          placeholder="e.g. Downtown Charging Hub"
        />
        {errors.name && (
          <p className="mt-2 text-xs font-medium text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Address/Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.location ? "border-red-400" : "border-orange-200"
            } text-gray-900 placeholder-orange-300 transition-all duration-200`}
          placeholder="123 Main Street, City"
        />
        {errors.location && (
          <p className="mt-2 text-xs font-medium text-red-500">
            {errors.location}
          </p>
        )}
      </div>

      {/* Coordinates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.latitude ? "border-red-400" : "border-orange-200"
              } text-gray-900 placeholder-orange-300 transition-all duration-200`}
            placeholder="e.g. 40.7128"
          />
          {errors.latitude && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.latitude}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.longitude ? "border-red-400" : "border-orange-200"
              } text-gray-900 placeholder-orange-300 transition-all duration-200`}
            placeholder="e.g. -74.0060"
          />
          {errors.longitude && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.longitude}
            </p>
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm font-medium rounded-xl border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white text-gray-900 transition-all duration-200"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Power Output */}
      <div>
        <label
          htmlFor="powerOutput"
          className="block text-sm font-medium text-gray-700 mb-2"
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
          className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.powerOutput ? "border-red-400" : "border-orange-200"
            } text-gray-900 placeholder-orange-300 transition-all duration-200`}
          placeholder="e.g. 50.0"
        />
        {errors.powerOutput && (
          <p className="mt-2 text-xs font-medium text-red-500">
            {errors.powerOutput}
          </p>
        )}
      </div>

      {/* Connector Type */}
      <div>
        <label
          htmlFor="connectorType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Connector Type
        </label>
        <select
          id="connectorType"
          name="connectorType"
          value={formData.connectorType}
          onChange={handleChange}
          className={`w-full px-4 py-3 text-sm font-medium rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-300 bg-white ${errors.connectorType ? "border-red-400" : "border-orange-200"
            } text-gray-900 transition-all duration-200`}
        >
          <option value="">Select a connector type</option>
          {connectorTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.connectorType && (
          <p className="mt-2 text-xs font-medium text-red-500">
            {errors.connectorType}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="pt-5 flex justify-end space-x-3 border-t border-orange-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium rounded-xl border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow-orange-200"
        >
          {initialData ? "Update Station" : "Add Station"}
        </button>
      </div>
    </form>
  );
};

export default StationForm;
