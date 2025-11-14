// web/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyC_0qpwRw0xCKKb_Txl4qMloOPG_mpv9VY",
    authDomain: "jobrontofsipl.firebaseapp.com",
    databaseURL: "https://jobrontofsipl.firebaseio.com",
    projectId: "jobrontofsipl",
    storageBucket: "jobrontofsipl.firebasestorage.app",
    messagingSenderId: "888359295086",
    appId: "1:888359295086:web:6bd5e43f7389ed644aae7f",
    measurementId: "G-VCGSDE0XJ8"
});

const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Received background message: ', payload);
});
