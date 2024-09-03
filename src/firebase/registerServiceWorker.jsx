// /src/firebase/registerServiceWorker.jsx
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (registrations.length === 0) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker
                        .register('/firebase-messaging-sw.js')
                        .then(function (registration) {
                            console.log(
                                'Service Worker가 scope에 등록되었습니다.:',
                                registration.scope
                            );
                        })
                        .catch(function (err) {
                            console.log('Service Worker 등록 실패:', err);
                        });
                });
            } else {
                console.log('Service Worker가 이미 등록되어 있습니다.');
            }
        });
    }
}
