import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "./initFirebase";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Messaging 객체 가져오기
const messaging = getMessaging(app);

export async function requestNotificationPermission() {
    try {
        // 사용자에게 알림 권한 요청
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            console.log("알림 권한이 허용되었습니다.");
        } else if (permission === "denied") {
            console.log("알림 권한이 거부되었습니다.");
        }
    } catch (error) {
        console.error("알림 권한 요청 중 오류 발생", error);
    }
}