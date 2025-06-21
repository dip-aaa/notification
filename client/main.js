const publicVapidKey = 'BOchYydF7IFZ5Wq2MOdkm6Ur16vcdaMt3nmU0O0MTbMEcTxeVtPbXCtG1D69kr6CX7NvDbyDn4kYuxdtTsaWbJk';

// Helper to convert base64 public key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

document.getElementById('subscribe').addEventListener('click', async () => {
  try {
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', { scope: '/' });
    console.log('Service Worker registered.');

    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    if (permission !== 'granted') {
      alert('Notification permission denied');
      return;
    }

    console.log('Subscribing to push...');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Push subscription:', subscription);

    const response = await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Subscription sent to server, response status:', response.status);

    alert('Subscribed successfully! You should receive a notification shortly.');
  } catch (error) {
    console.error('Error during subscription:', error);
    alert('Failed to subscribe for push notifications. Check console for details.');
  }
});

