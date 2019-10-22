import axios from 'axios';

export const getUserInfo = () => axios.get('http://localhost:8080/api/users',{withCredentials: true});