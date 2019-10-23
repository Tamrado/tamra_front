import axios from 'axios';

export const getUserInfo = () => axios.get('/api/member/info',{withCredentials: true});
export const checkUserAndGetInfo = () => axios.get('/api/auth',{withCredentials: true});