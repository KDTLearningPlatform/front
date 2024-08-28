import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TabBar from '../components/TabBar/TabBar';
import axiosInstance from '../api/axiosInstance';
import DefaultProfileImage from '../assets/images/Profile.png';
import FirstPlaceIcon from '../assets/icons/first.svg';
import SecondPlaceIcon from '../assets/icons/second.svg';
import ThirdPlaceIcon from '../assets/icons/third.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  height: 100vh;
  background-color: #F5F9FF;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const RankingItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  font-size: 18px;
  width: calc(100%% - 20px);
  margin: 0 auto;
`;

const RankNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 40px;
`;

const Name = styled.span`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;

const Points = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const RankIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background-color: #0961F5;
    color: white;
    border-color: #0961F5;
  }
`;

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axiosInstance.get('/api/ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return FirstPlaceIcon;
    if (rank === 2) return SecondPlaceIcon;
    if (rank === 3) return ThirdPlaceIcon;
    return null;
  };

  // 현재 페이지에 해당하는 데이터만 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rankingData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 넘버 생성
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Header>
        <Title>랭킹</Title>
      </Header>
      <RankingList>
      {currentItems.map((user, index) => (
          <RankingItem key={user.userId} rank={index + 1 + (currentPage - 1) * itemsPerPage}>
            <RankNumber>
              {index + 1 + (currentPage - 1) * itemsPerPage <= 3 ? (
                <RankIcon src={getRankIcon(index + 1 + (currentPage - 1) * itemsPerPage)} alt={`${index + 1 + (currentPage - 1) * itemsPerPage}위 메달`} />
              ) : (
                index + 1 + (currentPage - 1) * itemsPerPage
              )}
            </RankNumber>
            <ProfileImage src={user.profileImage || DefaultProfileImage} alt={`${user.name} 프로필`} />
            <Name>{user.nickname}</Name>
            <Points>{user.totalPoint} XP</Points>
          </RankingItem>
        ))}
      </RankingList>
      {totalPages > 1 && (
        <Pagination>
          {pageNumbers.map(number => (
            <PageButton
              key={number}
              className={currentPage === number ? 'active' : ''}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </PageButton>
          ))}
        </Pagination>
      )}
      <TabBar />
    </Container>
  );
};

export default Ranking;
