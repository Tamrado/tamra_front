import axios from 'axios';

export const getUserInfo = (username) => axios.get('http://localhost:8080/api/auth/info/?id=' + username,{withCredentials: true});
export const checkUserAndGetInfo = ({password}) => axios.post('http://localhost:8080/api/auth',{password},{withCredentials: true});
export const checkUserAndGetUser = () => axios.get("http://localhost:8080/api/auth/user",{withCredentials:true});
export const modifyUserInfo = ({email,id,password,phone,birthday,name,comment,address,gender}) => axios.put("http://localhost:8080/api/auth",{email,id,password,phone,birthday,name,comment,address,gender},{withCredentials:true});
export const modifyUserImage = (formData) => axios.post('http://localhost:8080/api/auth/image/id',formData,{'content-type' : 'multipart/form-data',withCredentials: true});

/*
export const getUserInfo = () => axios.get('http://15.164.210.186:8080/api/member/info',{withCredentials: true});
export const checkUserAndGetInfo = () => axios.get('http://15.164.210.186:8080/api/auth',{withCredentials: true});
*/