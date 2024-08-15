import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';
import finishedIcon from '../assets/icons/finished.svg';

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
  position: relative;  /* 포지션 상대값 추가 */
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

const FinishedIcon = styled.img`
  position: absolute;  /* 아이콘을 오른쪽 위에 배치 */
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
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

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const ProgressBarBackground = styled.div`
  background-color: #E0E0E0; /* 연회색 기본 틀 */
  border-radius: 10px;
  height: 10px; /* 바 높이 설정 */
  width: 88%; /* 전체 넓이를 줄여서 오른쪽 공간 확보 */
  position: relative;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  background-color: ${props => props.color};
  height: 100%;
  width: ${props => props.progress * 100}%;
  transition: width 1s ease-in-out; /* 애니메이션 추가 */
`;

const MyCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(location.state?.filter || 'progress');
  const [progressValues, setProgressValues] = useState([]);

  useEffect(() => {
    console.log("Current filter:", filter);
    fetchLectures();
  }, [filter]);

  const fetchLectures = async () => {
    try {
      const endpoint = filter === 'completed' ? '/api/lectureProgress/completed' : '/api/lectureProgress/in-progress';
      const response = await axiosInstance.get(endpoint);
      console.log('Fetched lectures:', response.data); // 콘솔에 데이터 출력
      setLectures(response.data);
      const initialProgressValues = response.data.map(() => 0);
      setProgressValues(initialProgressValues);
      
      setTimeout(() => {
        const finalProgressValues = response.data.map(lecture => lecture.progress);
        setProgressValues(finalProgressValues);
      }, 100);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLectureClick = (lectureId) => {
    console.log("Navigating with filter:", filter);
    navigate(`/myLectureDetails/${lectureId}`, { state: { filter } });  // filter 상태를 전송
  };
  
  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProgressColor = (progress) => {
    if (progress === 0) return '#E0E0E0'; // 기본 연한 회색
    if (progress < 0.25) return '#FFEB3B'; // 노랑
    if (progress < 0.5) return '#FF9800'; // 주황
    if (progress < 0.75) return '#4CAF50'; // 초록
    return '#2196F3'; // 파랑
  };

  const renderProgressBar = (progress, index) => {
    return (
      <ProgressBarBackground>
        <ProgressBarFill progress={progressValues[index]} color={getProgressColor(progress)} />
      </ProgressBarBackground>
    );
  };

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
          filteredLectures.map((lecture, index) => (
            <LectureItem key={lecture.lectureId} onClick={() => handleLectureClick(lecture.lectureId)}>
              {filter === 'completed' && <FinishedIcon src={finishedIcon} alt="완료 아이콘" />}
              <LectureImage />
              <LectureDetails>
                <LectureTag>{lecture.tag}</LectureTag>
                <LectureItemTitle>{lecture.title}</LectureItemTitle>
                <LectureTime>{formatRunningTime(lecture.totalRunningTime)}</LectureTime>
                {filter === 'progress' && (
                  <ProgressContainer>
                    <div style={{ flex: 1 }}>{renderProgressBar(lecture.progress, index)}</div>
                    <div style={{ marginLeft: '10px' }}>{`${lecture.watchedCount}/${lecture.totalVideoCount}`}</div>
                  </ProgressContainer>
                )}
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
