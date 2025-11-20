import React from "react";

export default function DetailSkeleton() {
  return (
    <div className="mt-4 border border-gray-300 bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-56"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-72"></div>
          <div className="h-4 bg-gray-200 rounded w-60"></div>
        </div>
      </div>
    </div>
  );
}
