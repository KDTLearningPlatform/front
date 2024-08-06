import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

const EditLecture = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [videoIndex, setVideoIndex] = useState(1);
  const [lectureDetails, setLectureDetails] = useState({
    title: '',
    tag: '',
    comment: '',
  });

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/lectures/editLecture/${lectureId}`);
        const lecture = response.data.lecture;
        setLectureDetails({
          title: lecture.title,
          tag: lecture.tag,
          comment: lecture.comment,
        });
        setVideos(
          lecture.videos.map((video, index) => ({
            id: index + 1,
            title: video.title,
            file: null,
            content: video.content, // 기존 content 값을 저장
          }))
        );
        setVideoIndex(lecture.videos.length + 1);
      } catch (error) {
        console.error('Error fetching lecture details:', error);
      }
    };

    fetchLectureDetails();
  }, [lectureId]);

  const addVideoEntry = () => {
    setVideos([...videos, { id: videoIndex, title: '', file: null, content: '' }]);
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
      title: lectureDetails.title,
      tag: lectureDetails.tag,
      comment: lectureDetails.comment,
      videos: videos.map((video, index) => ({
        title: video.title,
        video_order: index + 1,
        content: video.file ? '' : video.content, // 파일이 없을 경우 기존 content 값을 사용
      })),
    };

    formData.append('lecture', new Blob([JSON.stringify(lecture)], { type: 'application/json' }));
    videos.forEach((video) => {
      if (video.file) {
        formData.append('files', video.file);
      }
    });

    try {
      const response = await axiosInstance.put(`/api/lectures/${lectureId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('강의 수정 중 오류 발생');
      }

      alert('강의가 성공적으로 수정되었습니다!');
      navigate('/main');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Header>
        <Title>강의 수정</Title>
      </Header>
      <Form id="editLectureForm" onSubmit={submitForm}>
        <Label htmlFor="title">강의 제목:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={lectureDetails.title}
          onChange={(e) => setLectureDetails({ ...lectureDetails, title: e.target.value })}
          required
        />

        <Label htmlFor="tag">태그:</Label>
        <Input
          type="text"
          id="tag"
          name="tag"
          value={lectureDetails.tag}
          onChange={(e) => setLectureDetails({ ...lectureDetails, tag: e.target.value })}
          required
        />

        <Label htmlFor="comment">강의 설명:</Label>
        <Textarea
          id="comment"
          name="comment"
          value={lectureDetails.comment}
          onChange={(e) => setLectureDetails({ ...lectureDetails, comment: e.target.value })}
          required
        />

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
              />
            </VideoEntry>
          ))}
        </ReactSortable>
      </Form>
      <ButtonContainer>
        <Button type="button" onClick={addVideoEntry}>
          비디오 추가
        </Button>
        <Button type="submit" form="editLectureForm">
          강의 수정
        </Button>
      </ButtonContainer>
      <TabBar />
    </Container>
  );
};

export default EditLecture;
