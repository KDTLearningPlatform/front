import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';
import { fcmGenerateAndSend } from '../firebase/handleFCMToken';

const Container = styled.div`
  padding: 16px;
  background-color: #F5F9FF;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const WelcomeText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 10px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #888;
  margin-left: 10px;
  margin-bottom: 50px;
`;

const SearchBar = styled.input`
  width: calc(100% - 32px);
  padding: 20px;
  margin: 0 auto 16px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LectureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 10px;
`;

const LectureTitle = styled.h2`
  font-size: 20px;
  margin-left: 10px;
`;

const CreateLectureButton = styled.button`
  background-color: #0961F5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;

  &:hover {
    background-color: #074bbf;
  }
`;

const LectureContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
`;

const LectureItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LectureImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #212121;
  border-radius: 8px;
  margin-right: 16px;
`;

const LectureDetails = styled.div`
  flex: 1;
`;

const LectureItemTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const LectureTag = styled.p`
  margin: 0 0 8px 0;
  color: #FF6B00;
  font-weight: bold;
`;

const LectureCount = styled.p`
  margin: 0;
  color: #0961F5;
  font-weight: bold;
`;

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    fcmGenerateAndSend();
  }, []);

  const handleProfileClick = () => {
    navigate('/editProfile');
  };

  const handleCreateLecture = () => {
    navigate('/createLecture');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLectureClick = (lectureId) => {
    navigate(`/lectureDetails/${lectureId}`);
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <WelcomeText>안녕하세요, {userData.name}님</WelcomeText>
        <SubText>오늘은 무엇을 학습하고 싶으세요?</SubText>
        <SearchBar placeholder="검색할 내용을 입력하세요" value={searchTerm} onChange={handleSearchChange} />
      </Header>
      <LectureHeader>
        <LectureTitle>강의 목록</LectureTitle>
        <CreateLectureButton onClick={handleCreateLecture}>강의 생성</CreateLectureButton>
      </LectureHeader>
      <LectureContainer>
        {filteredLectures.map((lecture) => (
          <LectureItem key={lecture.lectureId} onClick={() => handleLectureClick(lecture.lectureId)}>
            <LectureImage />
            <LectureDetails>
              <LectureTag>{lecture.tag}</LectureTag>
              <LectureItemTitle>{lecture.title}</LectureItemTitle>
              <LectureCount>{lecture.totalVideoCount} 비디오</LectureCount>
              <LectureCount>{lecture.attendanceCount} 수강생</LectureCount>
            </LectureDetails>
          </LectureItem>
        ))}
      </LectureContainer>
      <TabBar onProfileClick={handleProfileClick} />
    </Container>
  );
};

export default Main;
