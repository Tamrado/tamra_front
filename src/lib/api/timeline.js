import axios from 'axios';

export const getTimelineInformation = (username,page) => axios.get(`http://localhost:8080/api/post/${username}/timeline?page=${page}&size=10`,{withCredentials: true});
export const getMainInformation = (page) => axios.get(`http://localhost:8080/api/post/newsfeed/?page=${page}&size=10`,{withCredentials: true});
export const getTimelinePostNum = (userId) => axios.get(`http://localhost:8080/api/post/${userId}/postnum`,{withCredentials:true});
export const getFeedInformationDetail = (postId) => axios.get(`http://localhost:8080/api/post/${postId}/detail`,{withCredentials: true});