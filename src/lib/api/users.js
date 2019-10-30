import axios from 'axios';

<<<<<<< HEAD
export const getUserInfo = (username) => axios.get('http://localhost:8080/api/member/info/?id=' + username,{withCredentials: true});
export const checkUserAndGetInfo = ({password}) => axios.post('http://localhost:8080/api/auth',{password},{withCredentials: true});
=======
export const getUserInfo = () => axios.get('http://15.164.210.186:8080/api/member/info',{withCredentials: true});
export const checkUserAndGetInfo = () => axios.get('http://15.164.210.186:8080/api/auth',{withCredentials: true});
>>>>>>> edbab17789f1ca44b07e3a13f40a0efe6ee667ae
