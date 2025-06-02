import React, { useState } from 'react';

const StationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    status: initialData?.status || 'Active',
    powerOutput: initialData?.powerOutput || '',
    connectorType: initialData?.connectorType || '',
  });

  const [errors, setErrors] = useState({});

  const connectorTypes = ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'CCS/CHAdeMO', 'Tesla'];

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
        [name]: '',
      });
    }
  };



  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.latitude) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude must be a number between -90 and 90';
    }

    if (!formData.longitude) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude must be a number between -180 and 180';
    }

    if (!formData.powerOutput) {
      newErrors.powerOutput = 'Power output is required';
    } else if (isNaN(formData.powerOutput) || formData.powerOutput <= 0) {
      newErrors.powerOutput = 'Power output must be a positive number';
    }

    if (!formData.connectorType) {
      newErrors.connectorType = 'Connector type is required';
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

  // return (
  //   <form onSubmit={handleSubmit} className="space-y-4">
  //     <div>
  //       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
  //         Station Name
  //       </label>
  //       <input
  //         type="text"
  //         name="name"
  //         id="name"
  //         value={formData.name}
  //         onChange={handleChange}
  //         className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //       />
  //       {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
  //     </div>

  //     <div>
  //       <label htmlFor="location" className="block text-sm font-medium text-gray-700">
  //         Address/Location
  //       </label>
  //       <input
  //         type="text"
  //         name="location"
  //         id="location"
  //         value={formData.location}
  //         onChange={handleChange}
  //         className={`mt-1 block w-full border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //       />
  //       {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
  //     </div>

  //     <div className="grid grid-cols-2 gap-4">
  //       <div>
  //         <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
  //           Latitude
  //         </label>
  //         <input
  //           type="number"
  //           step="any"
  //           name="latitude"
  //           id="latitude"
  //           value={formData.latitude}
  //           onChange={handleChange}
  //           className={`mt-1 block w-full border ${errors.latitude ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //         />
  //         {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
  //       </div>

  //       <div>
  //         <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
  //           Longitude
  //         </label>
  //         <input
  //           type="number"
  //           step="any"
  //           name="longitude"
  //           id="longitude"
  //           value={formData.longitude}
  //           onChange={handleChange}
  //           className={`mt-1 block w-full border ${errors.longitude ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //         />
  //         {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
  //       </div>
  //     </div>

  //     <div>
  //       <label htmlFor="status" className="block text-sm font-medium text-gray-700">
  //         Status
  //       </label>
  //       <select
  //         id="status"
  //         name="status"
  //         value={formData.status}
  //         onChange={handleChange}
  //         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //       >
  //         <option value="Active">Active</option>
  //         <option value="Inactive">Inactive</option>
  //       </select>
  //     </div>

  //     <div>
  //       <label htmlFor="powerOutput" className="block text-sm font-medium text-gray-700">
  //         Power Output (kW)
  //       </label>
  //       <input
  //         type="number"
  //         step="0.1"
  //         name="powerOutput"
  //         id="powerOutput"
  //         value={formData.powerOutput}
  //         onChange={handleChange}
  //         className={`mt-1 block w-full border ${errors.powerOutput ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //       />
  //       {errors.powerOutput && <p className="mt-1 text-sm text-red-600">{errors.powerOutput}</p>}
  //     </div>

  //     <div>
  //       <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700">
  //         Connector Type
  //       </label>
  //       <select
  //         id="connectorType"
  //         name="connectorType"
  //         value={formData.connectorType}
  //         onChange={handleChange}
  //         className={`mt-1 block w-full border ${errors.connectorType ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  //       >
  //         <option value="">Select a connector type</option>
  //         {connectorTypes.map(type => (
  //           <option key={type} value={type}>{type}</option>
  //         ))}
  //       </select>
  //       {errors.connectorType && <p className="mt-1 text-sm text-red-600">{errors.connectorType}</p>}
  //     </div>

  //     <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200">
  //       <button
  //         type="button"
  //         onClick={onCancel}
  //         className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //       >
  //         Cancel
  //       </button>
  //       <button
  //         type="submit"
  //         className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //       >
  //         {initialData ? 'Update' : 'Add'} Station
  //       </button>
  //     </div>
  //   </form>
  // );


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Station Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'
            } text-white placeholder-gray-400`}
          placeholder="e.g. Downtown Charging Hub"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-300">
          Address/Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.location ? 'border-red-500' : 'border-gray-600'
            } text-white placeholder-gray-400`}
          placeholder="123 Main Street, City"
        />
        {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-300">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.latitude ? 'border-red-500' : 'border-gray-600'
              } text-white placeholder-gray-400`}
            placeholder="e.g. 40.7128"
          />
          {errors.latitude && <p className="mt-1 text-sm text-red-400">{errors.latitude}</p>}
        </div>

        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-300">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.longitude ? 'border-red-500' : 'border-gray-600'
              } text-white placeholder-gray-400`}
            placeholder="e.g. -74.0060"
          />
          {errors.longitude && <p className="mt-1 text-sm text-red-400">{errors.longitude}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-300">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border border-gray-600 text-white"
        >
          <option value="Active" className="bg-gray-800">Active</option>
          <option value="Inactive" className="bg-gray-800">Inactive</option>
        </select>
      </div>

      <div>
        <label htmlFor="powerOutput" className="block text-sm font-medium text-gray-300">
          Power Output (kW)
        </label>
        <input
          type="number"
          step="0.1"
          name="powerOutput"
          id="powerOutput"
          value={formData.powerOutput}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.powerOutput ? 'border-red-500' : 'border-gray-600'
            } text-white placeholder-gray-400`}
          placeholder="e.g. 50.0"
        />
        {errors.powerOutput && <p className="mt-1 text-sm text-red-400">{errors.powerOutput}</p>}
      </div>

      <div>
        <label htmlFor="connectorType" className="block text-sm font-medium text-gray-300">
          Connector Type
        </label>
        <select
          id="connectorType"
          name="connectorType"
          value={formData.connectorType}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-700 border ${errors.connectorType ? 'border-red-500' : 'border-gray-600'
            } text-white`}
        >
          <option value="" className="bg-gray-800">Select a connector type</option>
          {connectorTypes.map(type => (
            <option key={type} value={type} className="bg-gray-800">{type}</option>
          ))}
        </select>
        {errors.connectorType && <p className="mt-1 text-sm text-red-400">{errors.connectorType}</p>}
      </div>

      <div className="pt-4 flex justify-end space-x-3 border-t border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          {initialData ? 'Update' : 'Add'} Station
        </button>
      </div>
    </form>
  );
};

export default StationForm;