import axios from 'axios';


export const uploadFeed = ({content,showLevel,tags}) => axios.post('http://15.164.170.252:8080/api/post/upload',{content,showLevel,tags},{withCredentials: true});
export const uploadImage = (formdata,postId) => axios.post(`http://15.164.170.252:8080/api/post/upload/${postId}/image`,formdata,{'content-type' : 'multipart/form-data',withCredentials: true});
export const modifyFeedInformation = ({content,showLevel,postId}) => axios.put(`http://15.164.170.252:8080/api/post/${postId}/update`,{content,showLevel},{withCredentials: true});
export const modifyFeedImage = (imageId) => axios.delete(`http://15.164.170.252:8080/api/post/image/${imageId}/delete`,{withCredentials: true});
export const deleteFeed = (id) => axios.delete(`http://15.164.170.252:8080/api/post/${id}/delete`,{withCredentials: true});
