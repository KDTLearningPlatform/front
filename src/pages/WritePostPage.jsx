import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Container = styled.div`
    padding: 20px;
    background-color: #F5F5F5;
    height: 100vh;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Post = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
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
    color: #FF6347;
`;

const PostText = styled.div`
    color: #666666;
    margin-top: 5px;
`;

const TextAreaContainer = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
    color: #666666;
    padding: 10px;
    box-sizing: border-box;
`;

const CharacterCount = styled.div`
    text-align: right;
    color: #999999;
    margin-top: 5px;
`;

const SubmitButton = styled.button`
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

const ArrowIcon = styled(FiArrowRight)`
    margin-left: 10px;
`;

const WritePostPage = () => {
    const { lectureId } = useParams(); // URL 파라미터에서 lectureId를 가져옵니다.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [lecture, setLecture] = useState(null); // 강의 정보를 저장할 상태
    const [userId, setUserId] = useState(null); // 사용자 ID를 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                console.log(`Fetching lecture with ID: ${lectureId}`);
                const response = await fetch(`/api/lectures/${lectureId}`);
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const data = await response.json();
                    console.log('Fetched lecture data:', data);
                    setLecture(data);
                } else {
                    throw new Error('Response is not JSON');
                }
            } catch (error) {
                console.error('Error fetching lecture:', error);
            }
        };

        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No JWT token found');
                }

                const response = await fetch('/api/auth/session-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Response status (user ID):', response.status);
                if (!response.ok) {
                    if (response.status === 401) {
                        // JWT 토큰이 유효하지 않거나 만료된 경우 로그인 페이지로 리디렉션
                        navigate('/login');
                    }
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const data = await response.json();
                    console.log('Fetched user data:', data);
                    setUserId(data.userId);
                } else {
                    throw new Error('Response is not JSON');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                // navigate('/login'); // 에러 발생 시 로그인 페이지로 리디렉션
            }
        };

        fetchLecture();
        fetchUserId();
    }, [lectureId, navigate]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSubmitClick = () => {
        if (!userId) {
            console.error('No user ID found, unable to submit post');
            return;
        }

        const postData = {
            title,
            field: content,
            userId: userId,
            lectureId: lectureId // 강의 ID를 포함
        };

        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기

        fetch('/api/studies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // 인증 헤더에 JWT 토큰 추가
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
    .then(data => {
            console.log('Post created:', data);
            navigate('/community'); // 모집글 작성 후 CommunityPage로 이동
        })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={handleBackClick}>
                    <FiArrowLeft />
                </BackButton>
                <Title>모집글 작성하기</Title>
            </Header>
            {lecture && (
                <PostContainer>
                    <Post>
                        <PostHeader>
                            <Avatar />
                            <PostContent>
                                <PostTitle>{lecture.title}</PostTitle>
                                <PostText>{lecture.description}</PostText>
                            </PostContent>
                        </PostHeader>
                    </Post>
                </PostContainer>
            )}
            <TextAreaContainer>
                <TitleInput
                    placeholder="제목을 작성하세요"
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextArea
                    placeholder="내용을 작성하세요"
                    value={content}
                    onChange={handleContentChange}
                />
                <CharacterCount>*{250 - content.length} 글자 남음</CharacterCount>
            </TextAreaContainer>
            <SubmitButton onClick={handleSubmitClick}>
                모집글 등록하기
                <ArrowIcon />
            </SubmitButton>
        </Container>
    );
};

export default WritePostPage;
