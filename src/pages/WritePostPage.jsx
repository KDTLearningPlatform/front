import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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

// const Avatar = styled.div`
//     width: 40px;
//     height: 40px;
//     background-color: #000;
//     border-radius: 50%;
//     margin-right: 10px;
// `;


// const PostContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 20px;
// `;
//
// const Post = styled.div`
//     background-color: #ffffff;
//     border-radius: 12px;
//     padding: 20px;
//     margin: 10px 0;
//     width: 100%;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;
//
// const PostHeader = styled.div`
//     display: flex;
//     align-items: center;
// `;
//
// const PostContent = styled.div`
//     display: flex;
//     flex-direction: column;
// `;
//
// const PostTitle = styled.div`
//     font-weight: bold;
//     color: #FF6347; /* 색상 변경 */
// `;
//
// const PostText = styled.div`
//     color: #666666;
//     margin-top: 5px;
// `;

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
    // const { lectureId } = useParams();
    // const [lecture, setLecture] = useState(null);
    const [title, setTitle] = useState('');
    const [field, setField] = useState('');
    const navigate = useNavigate();


    // "모집글 등록하기" 버튼 클릭 시 호출되는 함수
    const handleSubmitClick = async (e) => {
        e.preventDefault(); // 기본 폼 제출 이벤트 방지

        const studyData = {
            title,
            field,
        };

        try {
            await axiosInstance.post('/api/studies', studyData);
            alert('스터디가 생성되었습니다!'); // 성공 메시지
            navigate('/community');
        } catch (error) {
            console.error('스터디 생성 오류:', error);
            alert('스터디 생성 중 오류가 발생했습니다.'); // 에러 메시지
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFieldChange = (e) => {
        setField(e.target.value);
    };

    const handleBackClick = () => {
        navigate(-1);
    };


    return (
        <Container>
            <Header>
                <BackButton onClick={handleBackClick}>
                    <FiArrowLeft />
                </BackButton>
                <Title>모집글 작성하기</Title>
            </Header>
            {/*{lecture && (*/}
            {/*    <PostContainer>*/}
            {/*        <Post>*/}
            {/*            <PostHeader>*/}
            {/*                <Avatar />*/}
            {/*                <PostContent>*/}
            {/*                    <PostTitle>{lecture.title}</PostTitle>*/}
            {/*                    <PostText>{lecture.description}</PostText>*/}
            {/*                </PostContent>*/}
            {/*            </PostHeader>*/}
            {/*        </Post>*/}
            {/*    </PostContainer>*/}
            {/*)}*/}
            <TextAreaContainer>
                <TitleInput
                    placeholder="제목을 작성하세요"
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextArea
                    placeholder="내용을 작성하세요"
                    value={field}
                    onChange={handleFieldChange}
                />
                <CharacterCount>*{250 - field.length} 글자 남음</CharacterCount>
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
