import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const LectureContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const LectureItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const LectureTitle = styled.a`
  font-size: 20px;
  font-weight: bold;
`;

const LectureDetails = styled.div`
  margin-top: 5px;
`;

const Main = () => {
  const [userData, setUserData] = useState({});
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/main');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchLectures = async () => {
      try {
        const response = await axiosInstance.get('/api/lectures');
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchUserData();
    fetchLectures();
  }, []);

  return (
    <Container>
      <h1>메인 페이지</h1>
      <p>환영합니다, {userData.name}!</p>
      <p>이메일: {userData.email}</p>
      <p>목표 강의 수: {userData.goalVidCnt}</p>
      <p>오늘 시청한 강의 수: {userData.dailyVidCnt}</p>
      <form action="/auth/logout" method="post">
        <button type="submit">로그아웃</button>
      </form>
      <form action="/auth/editProfile" method="get">
        <button type="submit">프로필 편집</button>
      </form>
      <a href="/api/lectures/createLecture" className="button">강의/비디오 생성</a>

      <h2>전체 강의 목록</h2>
      <LectureContainer>
        {lectures.map((lecture) => (
          <LectureItem key={lecture.lectureId}>
            <LectureTitle href={`/api/lectures/details/${lecture.lectureId}`}>{lecture.title}</LectureTitle>
            <LectureDetails>
              <p>태그: {lecture.tag}</p>
              <p>총 비디오 수: {lecture.totalVideoCount}</p>
              <p>참석 수: {lecture.attendanceCount}</p>
            </LectureDetails>
          </LectureItem>
        ))}
      </LectureContainer>
    </Container>
  );
};

export default Main;