import React, { lazy, Suspense } from 'react';

// Dynamically import the ReviewForm component
const ReviewForm = lazy(() => import('./ReviewForm'));

// Loading component to show while ReviewForm is being loaded
const ReviewFormLoader = () => (
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

// Dynamic ReviewForm component with Suspense fallback
const DynamicReviewForm = (props) => {
  return (
    <Suspense fallback={<ReviewFormLoader />}>
      <ReviewForm {...props} />
    </Suspense>
  );
};

export default DynamicReviewForm;