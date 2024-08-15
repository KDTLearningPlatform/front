import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import backIcon from '../assets/icons/back.svg';

const Container = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  color: white;
`;

const BackButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  filter: invert(100%);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const VideoPlayer = styled.video`
  max-width: 100%;
  max-height: 100%;
  background-color: black;
  object-fit: contain;
`;

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState('');
  const [videoContent, setVideoContent] = useState('');
  const videoRef = useRef(null);
  const [lastPlaybackPosition, setLastPlaybackPosition] = useState(0);
  const [runningTime, setRunningTime] = useState(0); // 비디오 전체 길이 추가
  const [progressSaved, setProgressSaved] = useState(false);

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const response = await axiosInstance.get(`/api/videos/${videoId}`);
        const videoData = response.data;
        setVideoTitle(videoData.title);
        setVideoContent(videoData.content);
        setLastPlaybackPosition(videoData.lastPlaybackPosition || 0);
        setRunningTime(videoData.runningTime || 0); // 비디오 전체 길이 설정
      } catch (error) {
        console.error('Error fetching video content:', error);
      }
    };

    fetchVideoContent();
  }, [videoId]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement) {
        if (lastPlaybackPosition >= runningTime) {
          videoElement.currentTime = 0; // 마지막 재생 위치가 비디오 길이와 같다면 처음부터 재생
        } else {
          videoElement.currentTime = lastPlaybackPosition;
        }
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [lastPlaybackPosition, runningTime]);

  const saveProgress = async () => {
    if (videoRef.current && !progressSaved) {
      const currentTime = videoRef.current.currentTime;
      setProgressSaved(true);

      try {
        const response = await axiosInstance.post('/api/videos', {
          videoId,
          lastPlaybackPosition: Math.floor(currentTime),
        });
        console.log("Progress saved successfully:", response);
      } catch (error) {
        console.error('Error saving video progress:', error);
      } finally {
        setProgressSaved(false);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveProgress();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Container>
      <Header>
        <BackButton
          src={backIcon}
          alt="뒤로가기"
          onClick={() => {
            saveProgress();
            navigate(-1);
          }}
        />
        <Title>{videoTitle}</Title>
      </Header>
      <VideoContainer>
        {videoContent ? (
          <VideoPlayer
            ref={videoRef}
            controls
            onPause={saveProgress}
          >
            <source src={videoContent} type="video/mp4" />
            Your browser does not support the video tag.
          </VideoPlayer>
        ) : (
          <p style={{ color: 'white' }}>Loading...</p>
        )}
      </VideoContainer>
    </Container>
  );
};

export default VideoPage;
