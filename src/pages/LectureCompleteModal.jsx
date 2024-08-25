import React from 'react';
import styled from 'styled-components';
import lectureFinishedIcon from '../assets/icons/lecture-finished.svg';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 0px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 50px;
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  background-color: #0961F5;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #074bbf;
  }
`;

const LectureCompleteModal = ({ onClose, onConfirm }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <Icon src={lectureFinishedIcon} alt="강의 완료 아이콘" />
        <Title>강의 완료</Title>
        <Message>강의를 완료하였습니다. 축하드립니다!</Message>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LectureCompleteModal;
