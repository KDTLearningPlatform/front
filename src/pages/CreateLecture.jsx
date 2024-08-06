import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import TabBar from '../components/TabBar/TabBar';
import axiosInstance from '../api/axiosInstance';

const Container = styled.div`
  padding: 16px;
  background-color: #f0f4f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 24px;
  margin: 0;
`;

const Form = styled.form`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 120px; /* Add space for fixed buttons and TabBar */
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0961f5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #074bbf;
  }
`;

const VideoEntry = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const RemoveButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: red;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 80px; /* Adjust this value if necessary to avoid TabBar */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
`;

const CreateLecture = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([{ id: 1, title: '', file: null }]);
  const [videoIndex, setVideoIndex] = useState(2);

  const addVideoEntry = () => {
    setVideos([...videos, { id: videoIndex, title: '', file: null }]);
    setVideoIndex(videoIndex + 1);
  };

  const removeVideoEntry = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleVideoChange = (id, field, value) => {
    const newVideos = videos.map(video =>
      video.id === id ? { ...video, [field]: value } : video
    );
    setVideos(newVideos);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const lecture = {
      title: e.target.title.value,
      tag: e.target.tag.value,
      comment: e.target.comment.value,
      videos: videos.map((video, index) => ({
        title: video.title,
        video_order: index + 1,
      })),
    };

    formData.append('lecture', new Blob([JSON.stringify(lecture)], { type: 'application/json' }));
    videos.forEach((video) => {
      formData.append('files', video.file);
    });

    try {
      const response = await axiosInstance.post('/api/lectures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 201) {
        throw new Error('강의 생성 중 오류 발생');
      }

      alert('강의가 성공적으로 생성되었습니다!');
      navigate('/main');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Header>
        <Title>강의 생성</Title>
      </Header>
      <Form id="createLectureForm" onSubmit={submitForm}>
        <Label htmlFor="title">강의 제목:</Label>
        <Input type="text" id="title" name="title" required />

        <Label htmlFor="tag">태그:</Label>
        <Input type="text" id="tag" name="tag" required />

        <Label htmlFor="comment">강의 설명:</Label>
        <Textarea id="comment" name="comment" required />

        <ReactSortable list={videos} setList={setVideos} animation={150}>
          {videos.map((video, index) => (
            <VideoEntry key={video.id}>
              <RemoveButton onClick={() => removeVideoEntry(video.id)}>-</RemoveButton>
              <Label htmlFor={`videoTitle${video.id}`}>비디오 제목:</Label>
              <Input
                type="text"
                id={`videoTitle${video.id}`}
                value={video.title}
                onChange={(e) => handleVideoChange(video.id, 'title', e.target.value)}
                required
              />

              <Label htmlFor={`videoFile${video.id}`}>비디오 파일:</Label>
              <Input
                type="file"
                id={`videoFile${video.id}`}
                onChange={(e) => handleVideoChange(video.id, 'file', e.target.files[0])}
                required
              />
            </VideoEntry>
          ))}
        </ReactSortable>
      </Form>
      <ButtonContainer>
        <Button type="button" onClick={addVideoEntry}>
          비디오 추가
        </Button>
        <Button type="submit" form="createLectureForm">
          강의 생성
        </Button>
      </ButtonContainer>
      <TabBar />
    </Container>
  );
};

export default CreateLecture;
