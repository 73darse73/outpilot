'use client';

import { useState, useEffect } from 'react';

interface PWAState {
  isInstalled: boolean;
  isStandalone: boolean;
  canInstall: boolean;
  isOnline: boolean;
  hasServiceWorker: boolean;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isStandalone: false,
    canInstall: false,
    isOnline: true,
    hasServiceWorker: false,
  });

  useEffect(() => {
    // PWAインストール状態の確認
    const checkInstallState = () => {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches;
      const isInstalled =
        (window.navigator as Navigator & { standalone?: boolean }).standalone ||
        isStandalone;

      setPwaState((prev) => ({
        ...prev,
        isInstalled,
        isStandalone,
      }));
    };

    // オンライン状態の確認
    const checkOnlineState = () => {
      setPwaState((prev) => ({
        ...prev,
        isOnline: navigator.onLine,
      }));
    };

    // Service Workerの確認
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        setPwaState((prev) => ({
          ...prev,
          hasServiceWorker: !!registration,
        }));
      }
    };

    // 初期チェック
    checkInstallState();
    checkOnlineState();
    checkServiceWorker();

    // イベントリスナーの設定
    const handleOnline = () => checkOnlineState();
    const handleOffline = () => checkOnlineState();
    const handleBeforeInstallPrompt = () => {
      setPwaState((prev) => ({
        ...prev,
        canInstall: true,
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', checkInstallState);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', checkInstallState);
    };
  }, []);

  // プッシュ通知の許可を要求
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  // プッシュ通知を送信
  const sendNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        ...options,
      });
    }
  };

  // キャッシュをクリア
  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)),
      );
    }
  };

  // Service Workerを更新
  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    }
  };

  return {
    ...pwaState,
    requestNotificationPermission,
    sendNotification,
    clearCache,
    updateServiceWorker,
  };
}
