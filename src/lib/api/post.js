import axios from 'axios';

export const getFeedInformation = (username,page) => axios.get(`http://localhost:8080/${username}/timeline?page=${page}`,{withCredentials: true});
export const uploadFeed = ({content,showLevel}) => axios.post('http://localhost:8080/post/upload',{content,showLevel},{withCredentials: true});
export const modifyFeedInformation = ({content,showLevel,postId}) => axios.put(`http://localhost:8080/post/${postId}/update`,{content,showLevel},{withCredentials: true});
export const getFeedInformationDetail = (postId) => axios.get(`http://localhost:8080/post/${postId}/detail`,{withCredentials: true});
export const deleteFeed = (postId) => axios.put(`http://localhost:8080/post/${postId}/delete`,{withCredentials: true});