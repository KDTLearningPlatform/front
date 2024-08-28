import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "./initFirebase";
import axiosInstance from "../api/axiosInstance";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Messaging 객체 가져오기
const messaging = getMessaging(app);

export async function fcmGenerateAndSend() {
    try {
        // FCM 토큰 생성
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
        });

        if (!token) {
            console.log("FCM 토큰을 생성할 수 없습니다.");
            return;
        }

        console.log("생성된 FCM 토큰:", token); // 토큰 로깅

        const storedToken = localStorage.getItem('fcmToken');

        // 저장된 토큰과 동일한지 확인
        if (storedToken === token) {
            console.log('토큰이 이미 서버에 전송되었습니다.');
            return;
        }

        // 서버로 토큰 전송
        const response = await axiosInstance.post('/api/fcm/save-fcm-token', { fcmToken: token });

        console.log('서버 응답:', response); // 응답 로깅

        if (response.status !== 200) {
            throw new Error(`FCM 토큰 서버전송을 실패하였습니다. 상태 코드: ${response.status}`);
        }

        // 성공 시 토큰을 localStorage에 저장
        localStorage.setItem('fcmToken', token);

        console.log('FCM 토큰이 서버로 성공적으로 전송되었습니다.');
    } catch (error) {
        console.error('FCM 토큰 생성 또는 전송 중 오류 발생:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('서버 응답:', error.response.data);
            console.error('상태 코드:', error.response.status);
            console.error('헤더:', error.response.headers);
        } else if (error.request) {
            // 요청이 전송되었지만 응답을 받지 못한 경우
            console.error('요청은 전송되었지만 응답을 받지 못했습니다:', error.request);
        } else {
            // 요청 설정 중 오류가 발생한 경우
            console.error('오류 메시지:', error.message);
        }
    }
}

// FCM 토큰을 서버에서 삭제
export async function fcmDeleteToken() {
    try {
        const token = localStorage.getItem('fcmToken');

        if (!token) {
            console.log('저장된 FCM 토큰이 없습니다.');
            return;
        }

        // 서버로 삭제 요청 전송
        const response = await axiosInstance.post('/api/fcm/delete-fcm-token', { fcmToken: token });

        if (response.status !== 200) {
            throw new Error('Failed to delete FCM token from the server');
        }

        // 성공 시 localStorage에서 토큰 제거
        localStorage.removeItem('fcmToken');

        console.log('FCM 토큰이 서버에서 성공적으로 삭제되었습니다.');
    } catch (error) {
        console.error('FCM 토큰 삭제 중 오류 발생:', error);
    }
}
