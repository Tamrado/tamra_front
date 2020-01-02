import axios from 'axios';

export const showPostCommentList = (postId,page) => axios.get(`http://localhost:8080/api/post/${postId}/comment/list/?page=${page}&size=10`,{withCredentials:true});
export const writeComment = ({postId,content}) => axios.post(`http://localhost:8080/api/post/${postId}/comment/register`,{content},{withCredentials:true});
export const modifyComment = ({commentId,content}) => axios.put(`http://localhost:8080/api/post/comment/${commentId}/edit`,{content},{withCredentials:true});
export const deleteComment = (commentId) => axios.delete(`http://localhost:8080/api/post/comment/${commentId}/remove`,{withCredentials:true});
