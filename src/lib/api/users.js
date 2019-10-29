import axios from 'axios';

export const getUserInfo = () => axios.get('http://15.164.210.186:8080/api/member/info',{withCredentials: true});
export const checkUserAndGetInfo = () => axios.get('http://15.164.210.186:8080/api/auth',{withCredentials: true});