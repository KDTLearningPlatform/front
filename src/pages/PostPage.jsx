import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import TabBar from "../components/TabBar/TabBar";

// 스타일드 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
    background-color: #F5F5F5;
    height: 100vh;
    overflow-y: auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%; // 전체 너비를 사용
`;

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; // 자동 마진으로 오른쪽 정렬
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: #000;
    border-radius: 50%;
    margin-right: 10px;
`;

const PostContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
    margin-bottom: 20px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const PostText = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    padding: 6px;
    white-space: nowrap; // 줄 바꿈 방지
`;

const PostTitle = styled.div`
    font-size: 14px;
    display: flex;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 6px;
    width: 100%; // 너비를 100%로 설정하여 부모 요소의 가로 폭을 차지하도록 함
    flex-grow: 1; // flex-grow를 사용하여 여유 공간을 모두 차지하도록 함
    text-align: left; // 텍스트 정렬
`;

const PostContent = styled.div`
    flex-grow: 1;
`;

const PostField = styled.div`
    display: flex;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 16px;
`;

// 하트 아이콘에 대한 스타일드 컴포넌트
const HeartIcon = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: 10px; /* 오른쪽 끝으로 위치 조정 */
    margin-right: 5px;
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

const CommentSection = styled.div`
    margin-top: 20px;
`;

const CommentHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    padding: 6px;
    white-space: nowrap; // 줄 바꿈 방지
`;

const CommentContainer = styled.div`
    margin-bottom: 20px;
    padding-left: ${props => props.depth * 50}px;    // depth로 띄어쓰기
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

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #0961f5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;

  &:hover {
    background-color: #074bbf;
  }
`;

// PostPage 컴포넌트 정의
const PostPage = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const {studyId} = useParams(); // URL에서 studyId를 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
    const [post, setPost] = useState({}); // 게시물 상태
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 내용 상태
    const [parentCommentId, setParentCommentId] = useState(null); // 부모 댓글 ID 상태
    const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글 ID 상태
    const [editCommentText, setEditCommentText] = useState(''); // 수정할 댓글 내용 상태

    const [isEditingPost, setIsEditingPost] = useState(false); // 수정 모드 상태
    const [editPostTitle, setEditPostTitle] = useState(''); // 수정할 제목 상태
    const [editPostContent, setEditPostContent] = useState(''); // 수정할 내용 상태

    useEffect(() => {
        fetchPost(studyId); // 게시물 데이터 가져오기
    }, [studyId]);

    // 특정 ID의 게시물을 가져오는 함수 (댓글포함)
    const fetchPost = async (id) => {
        try {
            const response = await axiosInstance.get(`/api/studies/${id}`);
            setPost(response.data.studyDetails); // 게시물 상태 업데이트
            setCurrentUserId(response.data.currentUserId);
            setComments(response.data.studyDetails.comments || []); // 댓글 목록 상태 업데이트
            setEditPostTitle(response.data.studyDetails.title); // 제목 초기화
            setEditPostContent(response.data.studyDetails.field); // 내용 초기화
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleEditPost = (postId, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        setIsEditingPost(true); // 수정 모드 활성화
    };

    const handleSavePost = async () => {
        try {
            const response = await axiosInstance.put(`/api/studies/${studyId}`, {
                title: editPostTitle,
                field: editPostContent,
            });
            if (response.status === 200) {
                setIsEditingPost(false); // 수정 모드 비활성화
                await fetchPost(studyId);
            } else {
                throw new Error('Failed to update post.');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('모집글 수정 중 오류가 발생했습니다.');
        }
    };

    const deletePost= async (postId, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        try {
            const response = await axiosInstance.delete(`/api/studies/${studyId}`);
            if (response.status === 204) {
                alert('강의가 삭제되었습니다.');
                navigate('/main');
            } else {
                throw new Error('강의 삭제 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('강의 삭제 중 오류가 발생했습니다.');
        }
    };

    // 좋아요 버튼 클릭 시 호출되는 함수
    const handleLikeClick = async (postId, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        try {
            const response = await axiosInstance.post(`/api/loves/${postId}`); // 좋아요 상태 토글 API 호출
            if (response.status === 200) {
                const updatedPost = {...post, liked: !post.liked}; // 좋아요 상태 토글
                setPost(updatedPost); // 상태 업데이트
            }
        } catch (error) {
            console.error('Error toggling like:', error); // 에러 발생 시 콘솔에 로그
            alert('좋아요 상태 변경 중 오류가 발생했습니다.'); // 사용자에게 오류 알림
        }
    };

    // 새 댓글 입력 변화 시 호출되는 함수
    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value); // 새 댓글 내용 상태 업데이트
    };

    // 새 댓글 제출 시 호출되는 함수
    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/comments?studyId=${studyId}`, {
                content: newComment,
                parentId: parentCommentId || null, // 부모 댓글 ID 추가
            });

            if (response.status === 201) {
                await fetchPost(studyId); // 댓글 목록 새로고침
                setNewComment('');
                setParentCommentId(null);
            }
        } catch (error) {
            console.error('Error submitting comment:', error.response ? error.response.data : error.message);
            alert('댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 댓글 수정 입력 변화 시 호출되는 함수
    const handleEditCommentChange = (e) => {
        setEditCommentText(e.target.value); // 수정할 댓글 내용 상태 업데이트
    };

    // 댓글 수정 제출 시 호출되는 함수
    const handleEditCommentSubmit = async (commentId) => {
        if (editCommentText.trim() === '') { // 수정할 댓글 내용이 비어 있는지 확인
            alert('댓글 내용을 입력하세요.'); // 비어있으면 알림
            return;
        }

        try {
            await axiosInstance.put(`/api/comments/${commentId}`, {
                content: editCommentText,
            });
            setEditCommentId(null); // 수정할 댓글 ID 초기화
            setEditCommentText(''); // 수정할 댓글 내용 초기화
            await fetchPost(studyId);
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('댓글 수정 중 오류가 발생했습니다. 다시 시도해주세요.'); // 오류 발생 시 알림
        }
    };

    // 댓글 삭제 시 호출되는 함수
    const handleDeleteComment = async (e, commentId) => {
        e.stopPropagation(); // 이벤트 전파 중지
        try {
            await axiosInstance.delete(`/api/comments/${commentId}`);
            await fetchPost(studyId);
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 댓글 클릭 시 호출되는 함수 (대댓글 작성 시 부모 ID 설정)
    const handleReplyClick = (commentId) => {
        setParentCommentId(commentId); // 부모 댓글 ID 설정
        console.log('Clicked comment ID:', commentId); // 클릭한 댓글 ID 출력
        setNewComment(''); // 새 댓글 내용 초기화
    };

    // 댓글 입력 필드에서 대댓글을 작성할 때, 부모 ID를 초기화하는 함수
    const handleParentCommentCancel = () => {
        setParentCommentId(null); // 부모 댓글 ID 초기화
        setNewComment(''); // 입력 필드 초기화
    };

    // 댓글 수정 버튼 클릭 시 호출되는 함수
    const handleEditButtonClick = (e, commentId, commentText) => {
        e.stopPropagation(); // 이벤트 전파 중지
        setEditCommentId(commentId);
        setEditCommentText(commentText);
    };

    // 댓글을 트리 구조로 변환하는 함수
    const buildCommentTree = (comments) => {
        const commentMap = {};
        const rootComments = [];

        // 모든 댓글을 맵에 추가
        comments.forEach(comment => {
            commentMap[comment.commentId] = { ...comment, children: [] };
        });

        // 트리 구조 생성
        comments.forEach(comment => {
            if (comment.depth === 0) {
                // 최상위 댓글
                rootComments.push(commentMap[comment.commentId]);
            } else {
                // 자식 댓글
                const parent = commentMap[comment.ancestorCommentId];
                if (parent) {
                    parent.children.push(commentMap[comment.commentId]);
                }
            }
        });

        // 최상위 댓글 최신순으로 정렬
        rootComments.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

        return rootComments;
    };

    // renderComments 함수 내부의 Comment 컴포넌트 렌더링 부분을 다음과 같이 수정합니다.
    const renderComments = (commentList) => {
        return commentList.map(comment => (
            <CommentContainer key={comment.commentId} depth={comment.depth}>
                <Comment onClick={(e) => {
                    // 수정 모드일 때는 클릭 이벤트를 무시
                    if (editCommentId === comment.commentId) {
                        e.stopPropagation();
                        return;
                    }
                    handleReplyClick(comment.commentId);
                }}>
                    <Avatar/>
                    <CommentContent>
                        {editCommentId === comment.commentId ? (
                            <>
                                <CommentInput
                                    value={editCommentText}
                                    onChange={handleEditCommentChange}
                                    onClick={(e) => e.stopPropagation()} // 입력 필드 클릭 시 이벤트 전파 중지
                                />
                                <CommentSendButton onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 전파 중지
                                    handleEditCommentSubmit(comment.commentId);
                                }}>
                                    <FiSend/>
                                </CommentSendButton>
                            </>
                        ) : (
                            <>
                                <CommentText>{comment.content}</CommentText>
                                <CommentTime>{new Date(comment.createDate).toLocaleString()}</CommentTime>
                            </>
                        )}
                    </CommentContent>
                    {editCommentId !== comment.commentId && (
                        <CommentActions>
                            <EditButton onClick={(e) => handleEditButtonClick(e, comment.commentId, comment.content)}>
                                <FiEdit/>
                            </EditButton>
                            <DeleteButton onClick={(e) => handleDeleteComment(e, comment.commentId)}>
                                <FiTrash2/>
                            </DeleteButton>
                        </CommentActions>
                    )}
                </Comment>
                {/* 자식 댓글 렌더링 (오래된 순으로 정렬) */}
                {comment.children && comment.children.length > 0 && renderComments(
                    comment.children.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
                )}
            </CommentContainer>
        ));
    };

    // 댓글 목록 렌더링
    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <FiArrowLeft />
                </BackButton>

                <Title>모집글 상세보기</Title>
                    {post && currentUserId === post.userId && (
                        <ButtonContainer>
                            {isEditingPost ? (
                                <ActionButton onClick={(event) => handleSavePost(post.studyId, event)}>수정완료</ActionButton>
                            ) : (
                                <ActionButton onClick={(event) => handleEditPost(post.studyId, event)}>수정</ActionButton>
                            )}
                            <ActionButton onClick={deletePost}>삭제</ActionButton>
                        </ButtonContainer>
                    )}
            </Header>

            <PostContainer>
                <PostHeader>
                    <PostText>모집글</PostText>
                    {isEditingPost ? (
                        <PostTitle>
                            <input
                                value={editPostTitle}
                                onChange={(e) => setEditPostTitle(e.target.value)}
                                style={{ width: '100%', border: 'none', outline: 'none' }}
                            />
                        </PostTitle>
                    ) : (
                        <PostTitle>{post.title}</PostTitle>
                    )}
                    <HeartIcon
                        liked={post.liked}
                        onClick={(event) => handleLikeClick(post.studyId, event)}
                    >
                        {post.liked ? '❤️' : '♡'}
                    </HeartIcon>
                </PostHeader>

                <PostContent>
                    {isEditingPost ? (
                        <PostField>
                            <textarea
                                value={editPostContent}
                                onChange={(e) => setEditPostContent(e.target.value)}
                                style={{ width: '100%', border: 'none', outline: 'none', resize: 'none' }}
                            />
                        </PostField>
                    ) : (
                        <PostField>{post.field}</PostField>
                    )}
                </PostContent>
            </PostContainer>

            <CommentSection>
                <CommentHeader>댓글</CommentHeader>
                {comments.length > 0 ? renderComments(buildCommentTree(comments)) : <p>댓글이 없습니다.</p>}
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
                {parentCommentId && (
                    <DeleteButton onClick={handleParentCommentCancel}>
                        취소
                    </DeleteButton>
                )}
            </CommentInputContainer>
            <TabBar />
        </Container>
    );
};

export default PostPage;