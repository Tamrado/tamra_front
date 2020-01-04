import axios from 'axios';

export const showPostCommentList = (postId,page) => axios.get(`http://15.164.170.252:8080/api/post/${postId}/comment/list/?page=${page}&size=10`,{withCredentials:true});
export const writeComment = ({commentId,content}) => axios.post(`http://15.164.170.252:8080/api/post/${commentId}/comment/register`,{content},{withCredentials:true});
export const modifyComment = ({commentId,content}) => axios.put(`http://15.164.170.252:8080/api/post/comment/${commentId}/edit`,{content},{withCredentials:true});
export const deleteComment = (commentId) => axios.delete(`http://15.164.170.252:8080/api/post/comment/${commentId}/remove`,{withCredentials:true});
