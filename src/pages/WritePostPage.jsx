import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import TabBar from '../components/TabBar/TabBar';  // TabBar 컴포넌트 임포트
import axiosInstance from '../api/axiosInstance'; // API 호출을 위한 커스텀 axios 인스턴스 임포트

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
    color: #FF6347; /* 색상 변경 */
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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSubmitClick = async () => {
        const postData = {
            title,
            field: content,
        };

        try {
            const response = await axiosInstance.post('/api/studies', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // 응답 상태 코드가 201인지 확인
            if (response.status !== 201) {
                throw new Error('Network response was not ok');
            }

            console.log('Post created:', response.data);
            navigate('/community'); // 모집글 작성 후 CommunityPage로 이동
        } catch (error) {
            console.error('There was a problem with the axios operation:', error);
        }
    };


    return (
        <Container>
            <Header>
                <BackButton onClick={handleBackClick}>
                    <FiArrowLeft />
                </BackButton>
                <Title>모집글 작성하기</Title>
            </Header>
            <PostContainer>
                <Post>
                    <PostHeader>
                        <Avatar />
                        <PostContent>
                            <PostTitle>그래픽 디자인</PostTitle>
                            <PostText>그래픽 디자인 환경 세팅</PostText>
                        </PostContent>
                    </PostHeader>
                </Post>
            </PostContainer>
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
            <TabBar />
        </Container>
    );
};

export default WritePostPage;
