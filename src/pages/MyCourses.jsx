import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';

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

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 10px;
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

const FilterButtons = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
`;

const FilterButton = styled.button`
  flex: 1;
  background-color: ${props => (props.isActive ? '#2F9D7E' : '#E1E7F5')};
  color: ${props => (props.isActive ? 'white' : '#000000')};
  padding: 10px 0;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background-color: ${props => (props.isActive ? '#2B8A6B' : '#cbd5e0')};
  }

  &:last-child {
    margin-right: 0;
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

const LectureTag = styled.p`
  margin: 0 0 8px 0;
  color: #FF6B00;
  font-weight: bold;
`;

const LectureItemTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const LectureTime = styled.p`
  margin: 0;
  color: #888;
`;

const MyCourses = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('progress');

  useEffect(() => {
    fetchLectures();
  }, [filter]);

  const fetchLectures = async () => {
    try {
      const endpoint = filter === 'completed' ? '/api/lectureProgress/completed' : '/api/lectureProgress/in-progress';
      const response = await axiosInstance.get(endpoint);
      console.log('Fetched lectures:', response.data); // 콘솔에 데이터 출력
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLectureClick = (lectureId) => {
    navigate(`/lectureDetails/${lectureId}`);
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>나의 강의들</Title>
        <SearchBar placeholder="검색할 내용을 입력하세요" value={searchTerm} onChange={handleSearchChange} />
      </Header>
      <FilterButtons>
        <FilterButton isActive={filter === 'completed'} onClick={() => setFilter('completed')}>
          완료
        </FilterButton>
        <FilterButton isActive={filter === 'progress'} onClick={() => setFilter('progress')}>
          진행중
        </FilterButton>
      </FilterButtons>
      <LectureContainer>
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture) => (
            <LectureItem key={lecture.lectureId} onClick={() => handleLectureClick(lecture.lectureId)}>
              <LectureImage />
              <LectureDetails>
                <LectureTag>{lecture.tag}</LectureTag>
                <LectureItemTitle>{lecture.title}</LectureItemTitle>
                <LectureTime>{formatRunningTime(lecture.totalRunningTime)}</LectureTime>
              </LectureDetails>
            </LectureItem>
          ))
        ) : (
          <p></p>
        )}
      </LectureContainer>
      <TabBar />
    </Container>
  );
};

export default MyCourses;

const formatRunningTime = (totalRunningTime) => {
  const hours = Math.floor(totalRunningTime / 3600);
  const minutes = Math.floor((totalRunningTime % 3600) / 60);
  const seconds = totalRunningTime % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  } else if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  } else {
    return `${seconds}초`;
  }
};
