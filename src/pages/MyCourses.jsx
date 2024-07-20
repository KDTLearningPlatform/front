import React from 'react';
import TabBar from '../components/TabBar/TabBar';
import styled from 'styled-components';

const MyCourses = () => {
  return (
    <Container>
      <Header>
        <BackButton>&larr;</BackButton>
        <Title>나의 강의들</Title>
      </Header>
      <SearchBar>
        <input type="text" placeholder="검색할 내용을 입력하세요" />
        <button>
          <SearchIcon />
        </button>
      </SearchBar>
      <Tabs>
        <Tab>완료</Tab>
        <Tab active>진행중</Tab>
      </Tabs>
      <CourseList>
        <CourseCard>
          <CourseImage />
          <CourseInfo>
            <CompletionIcon />
          </CourseInfo>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseInfo>
            <CompletionIcon />
          </CourseInfo>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseInfo>
            <CompletionIcon />
          </CourseInfo>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseInfo>
            <CompletionIcon />
          </CourseInfo>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseInfo>
            <CompletionIcon />
          </CourseInfo>
        </CourseCard>
        {/* 필요한 만큼 CourseCard를 복제 */}
      </CourseList>
      <TabBar />
    </Container>
  );
};

export default MyCourses;

// Styled Components
const Container = styled.div`
  padding: 16px;
  background-color: #f0f4f8;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 16px;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }

  button {
    padding: 8px;
    background-color: #007bff;
    border: 1px solid #007bff;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url('../../assets/icons/search.svg') no-repeat center center;
  background-size: cover;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px 0;
  background-color: ${props => (props.active ? '#167F71' : '#ccc')};
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CourseCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CourseImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
`;

const CourseInfo = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
`;

const CompletionIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background-color: #02b550;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '✔';
    color: white;
    font-size: 12px;
  }
`;
