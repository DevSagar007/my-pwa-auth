"use client";

import { useEffect, useState } from "react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex gap-3 items-center max-w-sm">
      <div className="flex-1">
        <p className="font-semibold">Install App</p>
        <p className="text-sm opacity-90">Install this app on your device for quick access</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleInstallClick}
          className="bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="text-white hover:bg-green-700 px-3 py-2 rounded transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

