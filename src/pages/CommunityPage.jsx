import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import TabBar from '../components/TabBar/TabBar'; 

const Container = styled.div`
  padding-bottom: 80px; /* TabBar 공간 확보 */
  background-color: #F5F5F5;
`;

const Header = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #202244;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Post = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin: 10px;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.div`
  font-weight: bold;
  color: #202244;
`;

const PostText = styled.div`
  color: #666666;
  margin-top: 5px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const FooterItem = styled.div`
  color: #202244;
`;

const WritePostButton = styled.button`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ArrowIcon = styled.div`
  margin-left: 10px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('/api/comments') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setPosts([]);
      });
  }, []);

  const handleWritePostClick = () => {
    navigate('/write-post'); 
  };

  return (
    <Container>
      <Header>모집글</Header>
      <PostContainer>
        {posts.map(post => (
          <Post key={post.commentId}>
            <PostHeader>
              <Avatar />
              <PostContent>
                <PostTitle>두비두비두</PostTitle>
                <PostText>{post.content}</PostText>
              </PostContent>
            </PostHeader>
            <PostFooter>
              <FooterItem>댓글 {post.commentId}</FooterItem>
              <FooterItem>2 주 전</FooterItem>
            </PostFooter>
          </Post>
        ))}
      </PostContainer>
      <WritePostButton onClick={handleWritePostClick}>
        모집글 작성하기
        <ArrowIcon>→</ArrowIcon>
      </WritePostButton>
      <TabBar />
    </Container>
  );
};

export default CommunityPage;
