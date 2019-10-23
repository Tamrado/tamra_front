import axios from 'axios';

export const getUserInfo = () => axios.get('http://localhost:8080/api/member/info',{withCredentials: true});
export const checkUserAndGetInfo = () => axios.get('http://localhost:8080/api/auth',{withCredentials: true});