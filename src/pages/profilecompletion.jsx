import React from 'react';
import styled from 'styled-components';
import BackIcon from '../assets/images/back.png'; // PNG 파일 경로 수정
import EmailIcon from '../assets/images/email.png'; // PNG 파일 경로 수정
import ProfileImageSrc from '../assets/images/Profile.png'; // 프로필 이미지 경로 수정

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #F5F5F5;
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
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const EmailInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Icon = styled.div`
  margin-right: 10px;
`;

const CompleteButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #02b550;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #029c4b;
  }
`;

const ProfileCompletion = ({ onProfileCompletionSuccess }) => {
  return (
    <Container>
      <Header>
        <BackButton>
          <img src={BackIcon} alt="Back" />
        </BackButton>
        <Title>프로필 완성하기</Title>
      </Header>
      <ProfileImageWrapper>
        <ProfileImage src={ProfileImageSrc} alt="Profile" />
      </ProfileImageWrapper>
      <Input type="text" placeholder="이름" />
      <Input type="text" placeholder="닉네임" />
      <EmailInput>
        <Icon>
          <img src={EmailIcon} alt="Email" />
        </Icon>
        <input type="email" placeholder="이메일" style={{ border: 'none', outline: 'none', flex: 1 }} />
      </EmailInput>
      <Select>
        <option value="">하루 목표 강의 수</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Select>
      <CompleteButton onClick={onProfileCompletionSuccess}>완료</CompleteButton>
    </Container>
  );
};

export default ProfileCompletion;
