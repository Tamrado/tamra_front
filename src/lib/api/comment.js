import axios from 'axios';

export const showPostCommentList = (postId,page) => axios.get(`http://15.164.170.252:8080/api/post/${postId}/comment/list/?page=${page}&size=10`,{withCredentials:true});
export const writeComment = ({id,content}) => axios.post(`http://15.164.170.252:8080/api/post/${id}/comment/register`,{content},{withCredentials:true});
export const modifyComment = ({id,content}) => axios.put(`http://15.164.170.252:8080/api/post/comment/${id}/edit`,{content},{withCredentials:true});
export const deleteComment = (id) => axios.delete(`http://15.164.170.252:8080/api/post/comment/${id}/remove`,{withCredentials:true});
export const getCommentNum = (id) => axios.get(`http://15.164.170.252:8080/api/post/${id}/comment/count`,{withCredentials:true});
