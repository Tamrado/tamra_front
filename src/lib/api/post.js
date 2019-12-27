import axios from 'axios';

export const getFeedInformation = (username,page) => axios.get(`http://localhost:8080/api/${username}/timeline?page=${page}&size=10`,{withCredentials: true});

export const uploadFeed = ({content,showLevel}) => axios.post('http://localhost:8080/api/post/upload',{content,showLevel},{withCredentials: true});
export const uploadImage = (formdata) => axios.post('http://localhost:8080/api/post/upload/image',formdata,{'content-type' : 'multipart/form-data',withCredentials: true});
export const modifyFeedInformation = ({content,showLevel,postId}) => axios.put(`http://localhost:8080/api/post/${postId}/update`,{content,showLevel},{withCredentials: true});
export const modifyFeedImage = (imageId) => axios.delete(`http://localhost:8080/api/post/image/${imageId}/delete`,{withCredentials: true});
export const getFeedInformationDetail = (postId) => axios.get(`http://localhost:8080/api/post/${postId}/detail`,{withCredentials: true});
export const deleteFeed = (postId) => axios.put(`http://localhost:8080/api/post/${postId}/delete`,{withCredentials: true});