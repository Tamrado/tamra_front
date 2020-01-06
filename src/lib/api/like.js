import axios from 'axios';

export const clickLike = (postId) => axios.post(`http://15.164.170.252:8080/api/post/${postId}/like`,null,{withCredentials:true});
export const cancelLike = (postId) => axios.delete(`http://15.164.170.252:8080/api/post/${postId}/like/cancel`,{withCredentials:true});
export const getLikeandUserList = (postId,page) => axios.get(`http://15.164.170.252:8080/api/post/${postId}/like/list?page=${page}&size=10`,{withCredentials:true});
