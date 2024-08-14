import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar/TabBar';
import axiosInstance from '../api/axiosInstance';

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
    cursor: pointer; /* 클릭 가능하도록 커서 변경 */
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;  // PostHeader의 너비를 100%로 설정하여 하트 아이콘 정렬
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
    flex-grow: 1;  // 남은 공간을 차지하게 설정
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

// 하트 아이콘에 대한 스타일드 컴포넌트
const HeartIcon = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: auto; /* 오른쪽 끝으로 위치 조정 */
    font-size: 24px; /* 아이콘 크기 설정 */
    line-height: 1; /* 텍스트의 줄 높이 조정 */
    display: flex; /* flexbox를 사용하여 정렬 */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
    color: ${({ liked }) => (liked ? 'red' : '#666')}; /* 상태에 따라 색상 변경 */
    transition: color 0.2s ease;

    &:hover {
        color: red; /* 마우스 오버 시 색상 변경 */
    }
`;

// CommunityPage 컴포넌트 정의
const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/studies');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    const handleWritePostClick = () => {
        navigate('/write-post');  // '/write-post' 경로로 이동
    };

    // 좋아요 버튼 클릭 시 호출되는 함수
    const handleLikeClick = async (postId, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        try {
            const response = await axiosInstance.post(`/api/loves/${postId}`);  // 좋아요 상태 토글 API 호출
            if (response.status === 200) {
                // 성공적으로 좋아요 상태가 변경된 경우, 게시글 목록을 새로고침
                const updatedPosts = posts.map(post =>
                    post.studyId === postId ? { ...post, liked: !post.liked } : post
                );
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error toggling like:', error);  // 에러 발생 시 콘솔에 로그
            alert('좋아요 상태 변경 중 오류가 발생했습니다.');  // 사용자에게 오류 알림
        }
    };

    const handlePostClick = (studyId) => {
        navigate(`/post/${studyId}`);
    };

    return (
        <Container>
            <Header>모집글</Header>
            <PostContainer>
                {posts.map((post) => (
                    <Post key={post.studyId} onClick={() => handlePostClick(post.studyId)}>
                        <PostHeader>
                            <Avatar />
                            <PostContent>
                                <PostTitle>{post.title || '제목 없음'}</PostTitle>
                                <PostText>{post.field}</PostText>
                            </PostContent>
                            {/* 하트 아이콘 추가 */}
                            <HeartIcon
                                liked={post.liked} // API 응답에서의 liked 상태 사용
                                onClick={(event) => handleLikeClick(post.studyId, event)}
                            >
                                {post.liked ? '❤️' : '♡'} {/* liked 상태에 따라 하트 아이콘 변경 */}
                            </HeartIcon>
                        </PostHeader>
                        <PostFooter>
                            <FooterItem>댓글 {post.commentCount}</FooterItem>
                            <FooterItem>{new Date(post.createDate).toLocaleDateString()}</FooterItem>
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
