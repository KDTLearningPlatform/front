import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultProfileImage from '../assets/images/Profile.png'; // 기본 프로필 이미지 경로 수정
import TabBar from '../components/TabBar/TabBar'; // TabBar 추가
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 30px;
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

const Text = styled.p`
  width: 100%;
  padding: 18px;
  margin-bottom: 20px;
  font-size: 16px;
  box-sizing: border-box;
  color: #000;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin-top: 10px;
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

const SaveButton = styled.button`
  width: calc(100% - 10px);
  padding: 15px;
  border: none;
  background-color: #0961F5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 90px;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 30px;

  &:hover {
    background-color: #074bbf;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  border: none;
  background-color: #E1E7F5;
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-top: 30px;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    nickname: '',
    goalVidCnt: '',
    profileImage: '',
    point: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/editProfile');
        const { email, name, nickname, goalVidCnt, profileImage, point } = response.data;
        setFormData({
          email,
          name,
          nickname,
          goalVidCnt: goalVidCnt.toString(),
          profileImage,
          point: point.toString(),
        });
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
      const response = await axiosInstance.post('/auth/updateProfile', {
        nickname: formData.nickname,
        goalVidCnt: parseInt(formData.goalVidCnt, 10),
        profileImage: formData.profileImage,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status === "ok") {
        toast.success('저장되었습니다!');
      } else {
        toast.error('저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('저장 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      if (response.data.status === 'redirect') {
        navigate('/login');
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container>
      <Header>
        <Title>프로필</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>
      <ProfileImageWrapper>
        <ProfileImage src={formData.profileImage || DefaultProfileImage} alt="Profile" />
      </ProfileImageWrapper>
      <Text>이름: {formData.name}</Text> {/* 이름 텍스트 */}
      <Input type="text" placeholder="닉네임" value={formData.nickname} name="nickname" onChange={handleChange} />
      <Text>이메일: {formData.email}</Text> {/* 이메일 텍스트 */}
      <Text>포인트: {formData.point}</Text> {/* 포인트 텍스트 */}
      <Select name="goalVidCnt" value={formData.goalVidCnt} onChange={handleChange}>
        <option value="">하루 목표 비디오 수</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <SaveButton onClick={handleSubmit}>저장</SaveButton>
      <ToastContainer />
      <TabBar />
    </Container>
  );
};

export default Profile;
