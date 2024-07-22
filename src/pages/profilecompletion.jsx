import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackIcon from '../assets/images/back.png'; // PNG 파일 경로 수정
import DefaultProfileImage from '../assets/images/Profile.png'; // 기본 프로필 이미지 경로 수정

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #F5F9FF;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #E0E0E0;
  margin-top: 20px;
  margin-bottom: 50px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
`;

const EmailInput = styled(Input)`
  background-color: #f0f0f0;
  color: #888;
  cursor: not-allowed;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWw0IDQgNC00IiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+');
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

const CompleteButton = styled.button`
  width: calc(100% - 40px);
  padding: 15px;
  background-color: #0961F5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 90px;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #074bbf;
  }
`;

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    nickname: '',
    goalVidCnt: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/additionalInfo');
        const { email, name, profileImage } = response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          email,
          name,
          profileImage,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/additionalInfo', {
        nickname: formData.nickname,
        goalVidCnt: parseInt(formData.goalVidCnt, 10),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status === "ok") {
        navigate('/main');
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton>
          <img src={BackIcon} alt="Back" />
        </BackButton>
        <Title>프로필 완성하기</Title>
      </Header>
      <ProfileImageWrapper>
        <ProfileImage src={formData.profileImage || DefaultProfileImage} alt="Profile" />
      </ProfileImageWrapper>
      <Input type="text" placeholder="이름" value={formData.name} name="name" onChange={handleChange} />
      <Input type="text" placeholder="닉네임" value={formData.nickname} name="nickname" onChange={handleChange} />
      <EmailInput type="email" placeholder="이메일" value={formData.email} name="email" readOnly />
      <Select name="goalVidCnt" value={formData.goalVidCnt} onChange={handleChange}>
        <option value="">하루 목표 강의 수</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <CompleteButton onClick={handleSubmit}>완료</CompleteButton>
    </Container>
  );
};

export default ProfileCompletion;
