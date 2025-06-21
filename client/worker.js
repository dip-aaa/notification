self.addEventListener('push', event => {
  let data = { title: 'No payload', body: 'No message' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Push event data error:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png', // Optional - remove if not available
    })
  );
});
