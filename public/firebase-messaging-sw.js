importScripts(
    "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

// Service Worker 설치 시 호출
self.addEventListener("install", function (e) {
    self.skipWaiting();
});

// Service Worker 활성화 시 호출
self.addEventListener("activate", function (e) {
    console.log("FCM 서비스 워커가 활성화되었습니다.");
});

// 이 파일은 환경변수 적용이 되지 않음. 유출되도 상관없다고함.
const firebaseConfig = {
    apiKey: 'AIzaSyD5yAlVafbO5TMil5FQYe7CzRoOewKTEWg',
    authDomain: 'learningplatform-8c1e5.firebaseapp.com',
    projectId: 'learningplatform-8c1e5',
    storageBucket: 'learningplatform-8c1e5.appspot.com',
    messagingSenderId: '131928175234',
    appId: '1:131928175234:web:29ea09d8cecffef42b7a9b',
    measurementId: 'G-3R9DPQ0MW6'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('백그라운드 메시지 수신: ', payload);

    const notificationTitle = payload.notification?.title || "Default Title";
    const notificationOptions = {
        body: payload.notification?.body || "Default body",
        icon: payload.notification?.icon || "/default-icon.png"  // 기본 아이콘 경로 설정 가능
    };

    self.registration.showNotification(notificationTitle, notificationOptions)
        .catch((error) => {
            console.error('알림 표시 중 오류 발생:', error);
        });
});
