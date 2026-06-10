"use client";

import Lottie from "lottie-react";

export default function NoProductFound() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-center px-4">
      <Lottie 
        animationData={null} 
        path="/animations/no-data.json"
        loop={true} 
        className="w-full max-w-xs h-48"
      />
      <p className="mt-4 text-gray-600 font-medium">Product not found</p>
      <p className="mt-1 text-sm text-gray-400">The product may have been removed or is unavailable.</p>
    </div>
  );
}