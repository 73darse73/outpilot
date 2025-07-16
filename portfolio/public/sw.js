const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// キャッシュする静的ファイル
const STATIC_FILES = [
  '/',
  '/about',
  '/projects',
  '/analytics',
  '/contact',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
];

// インストール時の処理
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      }),
  );
});

// アクティベート時の処理
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      }),
  );
});

// フェッチ時の処理
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同じオリジンのリクエストのみ処理
  if (url.origin !== location.origin) {
    return;
  }

  // APIリクエストはネットワークファースト
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 静的ファイルはキャッシュファースト
  if (
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // その他はネットワークファースト
  event.respondWith(networkFirst(request));
});

// キャッシュファースト戦略
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);

    // オフライン時のフォールバック
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}

// ネットワークファースト戦略
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network first failed:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // オフライン時のフォールバック
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}

// プッシュ通知の処理
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');

  const options = {
    body: event.data ? event.data.text() : '新しい更新があります',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: '詳細を見る',
        icon: '/icon-192x192.png',
      },
      {
        action: 'close',
        title: '閉じる',
        icon: '/icon-192x192.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Outpilot Portfolio', options),
  );
});

// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// バックグラウンド同期
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // バックグラウンドでデータを同期
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}
