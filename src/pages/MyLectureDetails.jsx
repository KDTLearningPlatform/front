import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';
import backIcon from '../assets/icons/back.svg';
import lockIcon from '../assets/icons/lock.svg';
import playIcon from '../assets/icons/play.svg';

const Container = styled.div`
  padding: 16px;
  background-color: #F5F9FF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  margin-top: 15px;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const LectureList = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
`;

const LectureItem = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;  /* 높이 조정 */
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }
`;

const VideoIndex = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #0961F5;
  background-color: #E3F2FD;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const LectureDetails = styled.div`
  flex: 1;
`;

const LectureTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const LectureTime = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`;

const LockIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: not-allowed;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 16px;
  background-color: #0961F5;
  color: white;
  border: none;
  border-radius: 90px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #074bbf;
  }
`;

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}시간 ${mins}분 ${secs}초`;
  } else if (mins > 0) {
    return `${mins}분 ${secs}초`;
  } else {
    return `${secs}초`;
  }
};

const MyLectureDetails = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [lectureDetails, setLectureDetails] = useState(null);

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/lectures/my-details/${lectureId}`);
        console.log('Lecture Details:', response.data);
        setLectureDetails(response.data);
      } catch (error) {
        console.error('Error fetching lecture details:', error);
      }
    };

    fetchLectureDetails();
  }, [lectureId]);

  if (!lectureDetails) {
    return <Container>Loading...</Container>;
  }

  const handleContinueCourse = () => {
    navigate(`/lectureDetails/${lectureId}`);
  };

  const handleBackClick = () => {
    navigate('/my-courses', { state: { filter: location.state?.filter || 'progress' } });
  };

  const handlePlayClick = (video) => {
    navigate(`/video/${video.videoId}`);
  };

  // 완료된 비디오 수를 계산
  const completedVideosCount = lectureDetails.videos.filter(video => video.progress === 1).length;

  return (
    <Container>
      <Header>
        <BackButton src={backIcon} alt="뒤로가기" onClick={handleBackClick} />
        <Title>{lectureDetails.lectureTitle}</Title>
      </Header>
      <LectureList>
        {lectureDetails.videos.map((video, index) => (
          <LectureItem key={index}>
            <VideoIndex>{String(index + 1).padStart(2, '0')}</VideoIndex>
            <LectureDetails>
              <LectureTitle>{video.title}</LectureTitle>
              <LectureTime>{formatTime(video.runningTime)}</LectureTime>
            </LectureDetails>
            {index < completedVideosCount ? (
              <PlayIcon
                src={playIcon}
                alt="재생 아이콘"
                onClick={() => handlePlayClick(video)}
              />
            ) : index === completedVideosCount ? (
              <PlayIcon
                src={playIcon}
                alt="재생 아이콘"
                onClick={() => handlePlayClick(video)}
              />
            ) : (
              <LockIcon src={lockIcon} alt="잠금 아이콘" />
            )}
          </LectureItem>
        ))}
      </LectureList>
      <ButtonContainer>
        <ActionButton onClick={handleContinueCourse}>
          강의 계속 수강
        </ActionButton>
      </ButtonContainer>
      <TabBar />
    </Container>
  );
};

export default MyLectureDetails;
