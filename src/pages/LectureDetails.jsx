import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';
import backIcon from '../assets/images/back.png';
import videoIcon from '../assets/icons/video.svg';
import clockIcon from '../assets/icons/clock.svg';
import extraVideoIcon from '../assets/icons/extra-video.svg';
import extraMobileIcon from '../assets/icons/extra-mobile.svg';
import extraConstantIcon from '../assets/icons/extra-constant.svg';
import playIcon from '../assets/icons/play.svg';

const Container = styled.div`
  padding: 16px;
  background: linear-gradient(to bottom, #000000 29%, #F5F9FF 25%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const TitleContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  margin-top: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LectureTag = styled.div`
  color: #FF6B00;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 30px;
`;

const LectureTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;

  img {
    margin-right: 8px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #F5F9FF;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 16px 0;
  cursor: pointer;
  font-weight: bold;
  color: ${props => (props.active === "true" ? '#000' : '#888')};
  border-bottom: ${props => (props.active === "true" ? '2px solid #000' : 'none')};
`;

const Overview = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Curriculum = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

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

const VideoDetails = styled.div`
  flex: 1;
`;

const PlayButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ExtraInfoContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
`;

const ExtraInfoTitle = styled.h3`
  margin-bottom: 30px;
`;

const ExtraInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 10px;

  img {
    margin-right: 8px;
  }

  span {
    font-weight: bold;
    margin-right: 16px;
  }
`;

const ActionButtonMain = styled.button`
  padding: 16px;
  background-color: #0961f5;
  color: white;
  border: none;
  border-radius: 90px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;

  &:hover {
    background-color: #074bbf;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #0961f5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;

  &:hover {
    background-color: #074bbf;
  }
`;

const LectureDetails = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [lectureDetails, setLectureDetails] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/lectures/details/${lectureId}`);
        if (response.data.redirect) {
          navigate(response.data.redirect);
        } else {
          setLectureDetails(response.data.lectureDetails);
          setCurrentUserId(response.data.currentUserId);
        }
      } catch (error) {
        console.error('Error fetching lecture details:', error);
      }
    };

    fetchLectureDetails();
  }, [lectureId, navigate]);

  const editLecture = () => {
    navigate(`/editLecture/${lectureId}`);
  };

  const deleteLecture = async () => {
    try {
      const response = await axiosInstance.delete(`/api/lectures/${lectureId}`);
      if (response.status === 204) {
        alert('강의가 삭제되었습니다.');
        navigate('/main');
      } else {
        throw new Error('강의 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('강의 삭제 중 오류가 발생했습니다.');
    }
  };

  const playVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  if (!lectureDetails) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>
        <BackButton src={backIcon} onClick={() => navigate(-1)} />
      </Header>
      <TitleContainer>
        <LectureTag>{lectureDetails.tag}</LectureTag>
        <TitleRow>          <LectureTitle>{lectureDetails.title}</LectureTitle>
          {currentUserId === lectureDetails.userId && (
            <div>
              <ActionButton onClick={editLecture}>수정</ActionButton>
              <ActionButton onClick={deleteLecture}>삭제</ActionButton>
            </div>
          )}
        </TitleRow>
        <InfoContainer>
          <InfoItem>
            <img src={videoIcon} alt="비디오 아이콘" />
            <span>{lectureDetails.totalVideoCount} 비디오</span>
          </InfoItem>
          <InfoItem>
            <img src={clockIcon} alt="시간 아이콘" />
            <span>{lectureDetails.totalRunningTime} 초</span>
          </InfoItem>
        </InfoContainer>
        <TabContainer>
          <Tab active={activeTab === 'overview' ? "true" : "false"} onClick={() => setActiveTab('overview')}>개요</Tab>
          <Tab active={activeTab === 'curriculum' ? "true" : "false"} onClick={() => setActiveTab('curriculum')}>커리큘럼</Tab>
        </TabContainer>
        {activeTab === 'overview' && (
          <Overview>
            <p>{lectureDetails.comment}</p>
          </Overview>
        )}
        {activeTab === 'curriculum' && (
          <Curriculum>
            {lectureDetails.videos.map((video, index) => (
              <VideoItem key={index}>
                <VideoIndex>{String(index + 1).padStart(2, '0')}</VideoIndex>
                <VideoDetails>
                  <p style={{ fontWeight: 'bold' }}>{video.title}</p>
                  <p>{video.runningTime} 초</p>
                </VideoDetails>
                <PlayButton src={playIcon} alt="재생 아이콘" onClick={() => playVideo(video.content)} />
              </VideoItem>
            ))}
          </Curriculum>
        )}
      </TitleContainer>
      <ExtraInfoContainer>
        <ExtraInfoTitle>얻을 수 있는 것</ExtraInfoTitle>
        <ExtraInfo>
          <img src={extraVideoIcon} alt="추가 비디오 아이콘" />
          <span>{lectureDetails.totalVideoCount} 비디오</span>
        </ExtraInfo>
        <ExtraInfo>
          <img src={extraMobileIcon} alt="모바일 아이콘" />
          <span>모바일, 데스크탑 지원</span>
        </ExtraInfo>
        <ExtraInfo>
          <img src={extraConstantIcon} alt="지속적 접근 아이콘" />
          <span>지속적인 접근</span>
        </ExtraInfo>
      </ExtraInfoContainer>
      <ActionButtonMain>강의 등록</ActionButtonMain>
      <TabBar />
    </Container>
  );
};

export default LectureDetails;
