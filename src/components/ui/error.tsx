import React from "react";

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  showRetry?: boolean;
  showBack?: boolean;
  variant?: "default" | "card";
}

function Error({
  title = "No data available",
  message = "There's no data to display at the moment",
  onRetry,
  onBack,
  showRetry = false,
  showBack = false,
  variant = "default",
}: ErrorProps) {
  const content = (
    <>
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{message}</p>
      </div>

      {(showRetry || showBack) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {showBack && (
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          )}
          {showRetry && (
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry
            </button>
          )}
        </div>
      )}
    </>
  );

  if (variant === "card") {
    return (
      <div className="max-w-sm mx-auto border border-gray-200 rounded-xl bg-white p-6 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="max-w-xs mx-auto">{content}</div>
    </div>
  );
}

export default Error;
