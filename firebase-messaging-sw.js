/* Service worker des notifications push — Mini Monde (projet ma-garderie-2a877)
   Ce fichier DOIT se trouver dans le MÊME dossier que index.html (racine du dépôt).
   Il reçoit les notifications même quand l'application est fermée.
   Les chemins sont RELATIFS pour fonctionner sur GitHub Pages (sous-dossier /Garderie/). */

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBCATHjxwPEaTZbK5DXDD3DoVxovoOaCkM",
  authDomain: "ma-garderie-2a877.firebaseapp.com",
  projectId: "ma-garderie-2a877",
  storageBucket: "ma-garderie-2a877.firebasestorage.app",
  messagingSenderId: "358286025456",
  appId: "1:358286025456:web:46dad2eb98c7a9b2c8b2d4"
});

var messaging = firebase.messaging();

// Notification reçue quand l'application est en arrière-plan ou fermée
messaging.onBackgroundMessage(function(payload){
  var d = (payload && payload.data) || {};
  self.registration.showNotification(d.title || 'Mini Monde', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: d
  });
});

// Au clic sur la notification : ouvrir / réactiver l'application (dans son sous-dossier)
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var appUrl = self.registration.scope; // ex. https://wissamkhiat.github.io/Garderie/
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list){
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(appUrl) === 0 && 'focus' in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow(appUrl);
    })
  );
});
