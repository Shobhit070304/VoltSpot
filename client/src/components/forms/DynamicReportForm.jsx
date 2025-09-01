import React, { lazy, Suspense } from 'react';

// Dynamically import the ReportForm component
const ReportForm = lazy(() => import('./ReportForm'));

// Loading component to show while ReportForm is being loaded
const ReportFormLoader = () => (
  <div className="max-w-md p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100 shadow-sm">
    <div className="animate-pulse">
      <div className="h-6 bg-orange-100 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-orange-100 rounded w-full mb-4"></div>
      <div className="h-24 bg-orange-100 rounded w-full mb-6"></div>
      <div className="flex space-x-3">
        <div className="h-10 bg-orange-100 rounded w-1/3"></div>
        <div className="h-10 bg-orange-100 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

// Dynamic ReportForm component with Suspense fallback
const DynamicReportForm = (props) => {
  return (
    <Suspense fallback={<ReportFormLoader />}>
      <ReportForm {...props} />
    </Suspense>
  );
};

export default DynamicReportForm;