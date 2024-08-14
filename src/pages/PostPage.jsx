import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

const Container = styled.div`
    padding: 20px;
    background-color: #F5F5F5;
    height: 100vh;
    overflow-y: auto;
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

const CommentContainer = styled.div`
    margin-bottom: 20px;
    padding-left: ${props => props.depth * 20}px;
`;

const Comment = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;
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

const CommentActions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #007BFF;
    margin-right: 10px;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #FF6347;
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
    const { studyId } = useParams(); // URL에서 studyId를 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
    const [post, setPost] = useState({}); // 게시물 상태
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 내용 상태
    const [parentCommentId, setParentCommentId] = useState(null); // 부모 댓글 ID 상태
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const userId = 1; // 사용자 ID를 하드코딩

    useEffect(() => {
        fetchPost(studyId);
        fetchComments(studyId);
    }, [studyId]);

    const fetchPost = async (id) => {
        try {
            const response = await axiosInstance.get(`/api/studies/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const fetchComments = async (id) => {
        try {
            const response = await axiosInstance.get(`/api/comments/study/${id}`);
            console.log('Fetched comments:', response.data);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/comments`, {
                content: newComment,
                userId: userId,
                parentCommentId: parentCommentId,
                studyId: studyId
            });
            await fetchComments(studyId);
            setNewComment('');
            setParentCommentId(null);
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleEditCommentChange = (e) => {
        setEditCommentText(e.target.value);
    };

    const handleEditCommentSubmit = async (commentId) => {
        if (editCommentText.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        try {
            await axiosInstance.put(`/api/comments/${commentId}`, {
                content: editCommentText,
                userId: userId
            });
            await fetchComments(studyId);
            setEditCommentId(null);
            setEditCommentText('');
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('댓글 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosInstance.delete(`/api/comments/${commentId}`);
            await fetchComments(studyId);
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleCommentClick = (commentId) => {
        setParentCommentId(commentId);
    };

    const handleEditButtonClick = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditCommentText(commentText);
    };

    const renderComments = (commentList, parentId = null, depth = 0) => {
        return commentList
            .filter(comment => comment.parentCommentId === parentId)
            .map(comment => (
                <CommentContainer key={`${comment.commentId}-${depth}`} depth={depth}>
                    <Comment onClick={() => handleCommentClick(comment.commentId)}>
                        <Avatar />
                        <CommentContent>
                            {editCommentId === comment.commentId ? (
                                <>
                                    <CommentInput
                                        value={editCommentText}
                                        onChange={handleEditCommentChange}
                                    />
                                    <CommentSendButton onClick={() => handleEditCommentSubmit(comment.commentId)}>
                                        <FiSend />
                                    </CommentSendButton>
                                </>
                            ) : (
                                <>
                                    <CommentText>{comment.content}</CommentText>
                                    <CommentTime>{new Date(comment.createDate).toLocaleDateString()}</CommentTime>
                                </>
                            )}
                        </CommentContent>
                        {editCommentId !== comment.commentId && (
                            <CommentActions>
                                <EditButton onClick={() => handleEditButtonClick(comment.commentId, comment.content)}>
                                    <FiEdit />
                                </EditButton>
                                <DeleteButton onClick={() => handleDeleteComment(comment.commentId)}>
                                    <FiTrash2 />
                                </DeleteButton>
                            </CommentActions>
                        )}
                    </Comment>
                    {renderComments(commentList, comment.commentId, depth + 1)}
                </CommentContainer>
            ));
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
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
                {comments.length > 0 ? renderComments(comments) : <p>댓글이 없습니다.</p>}
            </CommentSection>
            <CommentInputContainer>
                <Avatar />
                <CommentInput
                    placeholder={parentCommentId ? "대댓글을 작성하세요" : "댓글을 작성하세요"}
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
