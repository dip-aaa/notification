const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = 'BOchYydF7IFZ5Wq2MOdkm6Ur16vcdaMt3nmU0O0MTbMEcTxeVtPbXCtG1D69kr6CX7NvDbyDn4kYuxdtTsaWbJk';
const privateVapidKey = 'vC5njqJGI6wcS_YI5I26Neynvl_hBYbgczreWShfWBk'; // Replace with your private key

webpush.setVapidDetails('mailto:your-khanaldeepa870@gmail.com', 'BOchYydF7IFZ5Wq2MOdkm6Ur16vcdaMt3nmU0O0MTbMEcTxeVtPbXCtG1D69kr6CX7NvDbyDn4kYuxdtTsaWbJk', 'vC5njqJGI6wcS_YI5I26Neynvl_hBYbgczreWShfWBk');

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload to send
  const payload = JSON.stringify({
    title: 'Hello from server!',
    body: 'You have successfully subscribed to push notifications.',
  });

  // Send push notification
  webpush.sendNotification(subscription, payload).catch(error => {
    console.error('Error sending notification', error);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
