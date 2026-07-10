// 狗星窝 Service Worker - 通知专用
self.addEventListener('install', function(e) {
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(clients.claim());
});

// 接收页面发来的通知请求，通过 SW 弹出（国产ROM兼容性更好）
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'NOTIFY') {
        let d = event.data;
        let options = {
            body: d.body || '',
            icon: d.icon || '',
            vibrate: [200, 100, 200],
            requireInteraction: false,
            tag: 'gxw-msg'
        };
        // 保留 silent 设为 false，确保通知会弹
        self.registration.showNotification(d.title || '新消息', options);
    }
});
