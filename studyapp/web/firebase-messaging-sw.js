importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// REQUIRED: Your Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyC_0qpwRw0xCKKb_Txl4qMloOPG_mpv9VY",
  authDomain: "jobrontofsipl.firebaseapp.com",
  databaseURL: "https://jobrontofsipl.firebaseio.com",
  projectId: "jobrontofsipl",
  storageBucket: "jobrontofsipl.firebasestorage.app",
  messagingSenderId: "888359295086",
  appId: "1:888359295086:web:8e2ac0ff2d02b6674aae7f",
  measurementId: "G-LG8QZSZJLC"
});

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("📩 SW FCM Background Message:", payload);
  const title = payload.notification?.title || "New Notification";
  const options = {
    body: payload.notification?.body,
    icon: "./assets/images/icons/Icon-192.png",
    data: payload.data,
  };
  self.registration.showNotification(title, options);
});

// OPTIONAL: Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log("🔔 SW Notification click Received:", event.notification);  
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://apply4study.com') // Change to your app URL
  );
});