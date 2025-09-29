import React, { useState, useEffect, Suspense } from 'react';

const CostEstimatorLoader = () => (
  <div className="p-6 bg-white shadow rounded-2xl max-w-md mx-auto mt-[7%]">
    <div className="animate-pulse">
      <div className="h-8 bg-orange-100 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-orange-100 rounded w-full mb-6"></div>
      <div className="space-y-3">
        <div className="h-10 bg-orange-100 rounded w-full"></div>
        <div className="h-10 bg-orange-100 rounded w-full"></div>
        <div className="h-10 bg-orange-100 rounded w-full"></div>
        <div className="h-10 bg-orange-100 rounded w-full"></div>
      </div>
      <div className="h-12 bg-orange-100 rounded w-full mt-6"></div>
    </div>
  </div>
);

const DynamicCostEstimator = (props) => {
  const [CostEstimator, setCostEstimator] = useState(null);

  useEffect(() => {
    // Dynamically import the CostEstimator component only when needed
    const loadComponent = async () => {
      try {
        const module = await import('./CostEstimator');
        setCostEstimator(() => module.default);
      } catch (error) {
        setError(true);
      }};
    
    loadComponent();
  }, []);

  if (!CostEstimator) {
    return <CostEstimatorLoader />;
  }

  return <CostEstimator {...props} />;
};

export default DynamicCostEstimator;