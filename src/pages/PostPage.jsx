import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

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

const CommentSection = styled.div`
    margin-top: 20px;
`;

const Comment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const CommentText = styled.div`
    color: #666666;
`;

const CommentTime = styled.div`
    color: #999999;
    font-size: 12px;
`;

const CommentInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentInput = styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 16px;
    color: #666666;
`;

const CommentSendButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #007BFF;
`;

const PostPage = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const studyId = 1; // 하드코딩된 studyId

    useEffect(() => {
        fetchPost(studyId);
        fetchComments(studyId);
    }, [studyId]);

    const fetchPost = async (studyId) => {
        try {
            const response = await axiosInstance.get(`/api/studies/${studyId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const fetchComments = async (studyId) => {
        try {
            const response = await axiosInstance.get(`/api/studies/${studyId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            console.log('Submitting comment:', newComment);
            const response = await axiosInstance.post(`/api/studies/${studyId}/comments`, {
                content: newComment,
                userId: 1 // 하드코딩된 사용자 ID
            });
            console.log('Comment response:', response.data);
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={handleBackClick}>
                    <FiArrowLeft />
                </BackButton>
                <Title>모집글 상세보기</Title>
            </Header>
            <PostContainer>
                <Post>
                    <PostHeader>
                        <Avatar />
                        <PostContent>
                            <PostTitle>{post.title}</PostTitle>
                            <PostText>{post.field}</PostText>
                        </PostContent>
                    </PostHeader>
                </Post>
            </PostContainer>
            <CommentSection>
                <h2>댓글</h2>
                {comments.map((comment, index) => (
                    <Comment key={index}>
                        <Avatar />
                        <CommentContent>
                            <CommentText>{comment.content}</CommentText>
                            <CommentTime>{new Date(comment.createDate).toLocaleDateString()}</CommentTime>
                        </CommentContent>
                    </Comment>
                ))}
            </CommentSection>
            <CommentInputContainer>
                <Avatar />
                <CommentInput
                    placeholder="댓글을 작성하세요"
                    value={newComment}
                    onChange={handleNewCommentChange}
                />
                <CommentSendButton onClick={handleCommentSubmit}>
                    <FiSend />
                </CommentSendButton>
            </CommentInputContainer>
        </Container>
    );
};

export default PostPage;
