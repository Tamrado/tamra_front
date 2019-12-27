import axios from 'axios';

export const searchInFriendList = (nickname) => axios.get(`http://localhost:8080/api/list/${nickname}`,{withCredentials: true});
export const searchInHeader = (nickname,page) => axios.get(`http://localhost:8080/api/list/${nickname}/?page=${page}`,{withCredentials: true});
