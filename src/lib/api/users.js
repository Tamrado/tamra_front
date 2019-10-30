import axios from 'axios';

export const getUserInfo = (username) => axios.get('http://localhost:8080/api/member/info/?id=' + username,{withCredentials: true});
export const checkUserAndGetInfo = ({password}) => axios.post('http://localhost:8080/api/auth',{password},{withCredentials: true});
