import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex gap-2">
      <div className="h-5 w-5 animate-pulse rounded-full bg-blue-600"></div>
      <div className="h-5 w-5 animate-pulse rounded-full bg-blue-600"></div>
      <div className="h-5 w-5 animate-pulse rounded-full bg-blue-600"></div>
      <div className="h-5 w-5 animate-pulse rounded-full bg-blue-600"></div>
      <div className="h-5 w-5 animate-pulse rounded-full bg-blue-600"></div>
    </div>
  );
};

export default LoadingDots;
