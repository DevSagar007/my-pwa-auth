"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PWARefreshBackButton() {
  const router = useRouter();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Check for service worker updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);

        // Check for updates periodically
        const interval = setInterval(() => {
          reg.update();
        }, 60000); // Check every minute

        // Listen for controller change (new service worker activated)
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          setUpdateAvailable(false);
          setIsRefreshing(false);
          window.location.reload();
        });

        // Listen for new service worker waiting
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });

        return () => clearInterval(interval);
      });
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (registration && registration.waiting) {
      // Tell the service worker to skip waiting
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      setUpdateAvailable(false);
    } else {
      // Manual refresh if no update available
      window.location.reload();
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section - Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition text-blue-600 hover:text-blue-700"
            title="Go back"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Center Section - App Title */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-gray-900">My App</h1>
        </div>

        {/* Right Section - Refresh Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
              isRefreshing
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-100 hover:text-blue-700"
            } ${updateAvailable ? "animate-pulse" : ""}`}
            title={updateAvailable ? "Update available - Click to refresh" : "Refresh app"}
            aria-label="Refresh app"
          >
            <svg
              className={`w-6 h-6 ${isRefreshing ? "animate-spin" : ""}`}
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
          </button>

          {/* Update Badge */}
          {updateAvailable && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
    </header>
  );
}

