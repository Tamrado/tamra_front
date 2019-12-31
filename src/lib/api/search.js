import axios from 'axios';

export const searchInFriendList = (nickname) => axios.get(`http://localhost:8080/api/list/${nickname}`,{withCredentials: true});
export const searchInHeader = (nickname,page,size) => axios.get(`http://localhost:8080/api/list/header/${nickname}/?page=${page}&size=${size}`,{withCredentials: true});
