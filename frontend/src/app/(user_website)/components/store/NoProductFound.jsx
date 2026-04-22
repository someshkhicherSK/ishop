"use client";

import Lottie from "lottie-react";

export default function NoProductFound() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-center">
      <Lottie 
        animationData={null} 
        path="/animations/no-data.json"   // ✅ THIS IS KEY
        loop={true} 
        className="w-full h-full"
      />
    </div>
  );
}