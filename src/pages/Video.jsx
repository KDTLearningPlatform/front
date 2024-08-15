import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import styled from 'styled-components';
import backIcon from '../assets/icons/back.svg';

const Container = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: none;
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

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const response = await axiosInstance.get(`/api/videos/${videoId}`);
        const videoData = response.data;
        setVideoTitle(videoData.title);
        setVideoContent(videoData.content); // S3 버킷에서 제공하는 URL
      } catch (error) {
        console.error('Error fetching video content:', error);
      }
    };

    fetchVideoContent();
  }, [videoId]);

  return (
    <Container>
      <Header>
        <BackButton src={backIcon} alt="뒤로가기" onClick={() => navigate(-1)} />
        <Title>{videoTitle}</Title>
      </Header>
      <VideoContainer>
        {videoContent ? (
          <VideoPlayer controls>
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
