'use client';

import { useState, useEffect } from 'react';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also show manual install option for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isStandalone) {
      // Show manual install for iOS after a delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleManualInstall = () => {
    setShowInstallPrompt(false);
    // Show manual install instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      alert(`📱 Install Capital Firm App on iOS:

1. Tap the Share button (square with arrow) at the bottom
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" in the top right
4. The app will appear on your home screen!

💡 Tip: You can also tap "Add to Favorites" for quick access.`);
    } else {
      alert(`📱 Install Capital Firm App on Android:

1. Tap the menu (three dots) in the top right
2. Tap "Add to Home screen" or "Install app"
3. Tap "Add" or "Install"
4. The app will appear on your home screen!

💡 Tip: You can also add to your app drawer for quick access.`);
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📱</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Install Capital Firm App</h3>
            <p className="text-xs text-gray-400">Get quick access to your dashboard</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleInstall}
            className="bg-accent-600 hover:bg-accent-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleManualInstall}
            className="text-gray-400 hover:text-white text-sm"
          >
            Manual
          </button>
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
} 