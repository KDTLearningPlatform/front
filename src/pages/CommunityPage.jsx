import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/TabBar/TabBar';  // TabBar 컴포넌트 임포트
import axiosInstance from '../api/axiosInstance'; // API 호출을 위한 커스텀 axios 인스턴스 임포트

// 페이지 전체 내용을 감싸는 메인 컨테이너에 대한 스타일드 컴포넌트
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background-color: #F5F9FF;
    box-sizing: border-box;
`;

// 페이지 헤더 섹션에 대한 스타일드 컴포넌트
const Header = styled.div`
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #202244;
`;

// 게시글들을 감싸는 컨테이너에 대한 스타일드 컴포넌트
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 개별 게시글에 대한 스타일드 컴포넌트
const Post = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    margin: 10px;
    width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 게시글 헤더 섹션 (아바타와 게시글 제목을 포함)에 대한 스타일드 컴포넌트
const PostHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;  // PostHeader의 너비를 100%로 설정하여 하트 아이콘 정렬
`;

// 게시글 아바타에 대한 스타일드 컴포넌트
const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: #000;
    border-radius: 50%;
    margin-right: 10px;
`;

// 게시글 내용(제목과 텍스트)을 감싸는 컨테이너에 대한 스타일드 컴포넌트
const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;  // 남은 공간을 차지하게 설정
`;

// 게시글 제목에 대한 스타일드 컴포넌트
const PostTitle = styled.div`
    font-weight: bold;
    color: #202244;
`;

// 게시글 본문 텍스트에 대한 스타일드 컴포넌트
const PostText = styled.div`
    color: #666666;
    margin-top: 5px;
`;

// 게시글 푸터 (댓글 수와 생성 날짜)를 포함한 섹션에 대한 스타일드 컴포넌트
const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

// 게시글 푸터 내의 각 항목에 대한 스타일드 컴포넌트
const FooterItem = styled.div`
    color: #202244;
`;

// 모집글 작성 버튼에 대한 스타일드 컴포넌트
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

// 버튼 오른쪽에 있는 화살표 아이콘에 대한 스타일드 컴포넌트
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
    const [posts, setPosts] = useState([]);  // 게시글 목록을 관리하는 상태 변수
    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 훅 사용

    // 컴포넌트가 마운트될 때 API를 호출하여 게시글 목록을 가져옴
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/studies');  // 게시글 데이터를 가져오는 API 호출
                setPosts(response.data);  // 가져온 데이터로 posts 상태 업데이트
            } catch (error) {
                console.error('Error fetching posts:', error);  // 에러 발생 시 콘솔에 로그
                setPosts([]);  // 에러 발생 시 posts 상태를 빈 배열로 설정
            }
        };

        fetchPosts();  // 함수 호출
    }, []);  // 의존성 배열이 비어 있어 컴포넌트 마운트 시 한 번만 호출됨

    // "모집글 작성하기" 버튼 클릭 시 호출되는 함수
    const handleWritePostClick = () => {
        navigate('/write-post');  // '/write-post' 경로로 이동
    };

    // "모집글 등록하기" 버튼 클릭 시 호출되는 함수
    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);  // `/post/${postId}` 경로로 이동
    }

    // 좋아요 버튼 클릭 시 호출되는 함수
    const handleLikeClick = async (postId) => {
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

    return (
        <Container>
            <Header>모집글</Header>
            <PostContainer>
                {/* posts 배열을 순회하며 각 게시글을 렌더링 */}
                {posts.map(post => (
                    <Post key={post.studyId} onClick={() => handlePostClick(post.studyId)}>  {/* 각 게시글의 고유 ID를 key로 사용 */}
                        <PostHeader>
                            <Avatar />
                            <PostContent>
                                <PostTitle>{post.title || '제목 없음'}</PostTitle>  {/* 게시글 제목 또는 기본값 */}
                                <PostText>{post.field}</PostText>  {/* 게시글 필드 */}
                            </PostContent>
                            {/* 하트 아이콘 추가 */}
                            <HeartIcon
                                liked={post.liked} // API 응답에서의 liked 상태 사용
                                onClick={() => handleLikeClick(post.studyId)} // 클릭 시 좋아요 상태 토글
                            >
                                {post.liked ? '❤️' : '♡'} {/* liked 상태에 따라 하트 아이콘 변경 */}
                            </HeartIcon>
                        </PostHeader>
                        <PostFooter>
                            <FooterItem>댓글 {post.commentCount}</FooterItem>  {/* 댓글 수 표시 */}
                            <FooterItem>{new Date(post.createDate).toLocaleDateString()}</FooterItem>  {/* 생성 날짜 표시 */}
                        </PostFooter>
                    </Post>
                ))}
            </PostContainer>
            {/* "모집글 작성하기" 버튼 */}
            <WritePostButton onClick={handleWritePostClick}>
                모집글 작성하기
                <ArrowIcon>→</ArrowIcon>
            </WritePostButton>
            {/* 하단의 TabBar */}
            <TabBar />
        </Container>
    );
};

export default CommunityPage;
