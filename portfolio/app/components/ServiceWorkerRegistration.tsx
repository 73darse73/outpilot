'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function ServiceWorkerRegistration() {
  const [isOnline, setIsOnline] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // オンライン/オフライン状態の監視
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Service Workerの登録
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // PWAインストールプロンプトの処理
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    });

    // インストール完了時の処理
    window.addEventListener('appinstalled', () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      // 更新の確認
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // 新しいバージョンが利用可能
              showUpdateNotification();
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const showUpdateNotification = () => {
    if (confirm('新しいバージョンが利用可能です。更新しますか？')) {
      window.location.reload();
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
        // テスト通知を送信
        new Notification('Outpilot Portfolio', {
          body: '通知が有効になりました！',
          icon: '/icon-192x192.png',
        });
      }
    }
  };

  return (
    <>
      {/* オフラインインジケーター */}
      {!isOnline && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-yellow-500 text-white text-center py-2 px-4">
          <span className="text-sm">オフラインです</span>
        </div>
      )}

      {/* PWAインストールプロンプト */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">アプリをインストール</h3>
              <p className="text-sm opacity-90">
                ホーム画面に追加して、より快適に利用できます
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                インストール
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="px-4 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                後で
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 開発者用のPWAテストボタン（開発環境のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          <button
            onClick={requestNotificationPermission}
            className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            通知テスト
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            更新確認
          </button>
        </div>
      )}
    </>
  );
}
