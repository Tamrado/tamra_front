import axios from 'axios';

export const getUserInfo = (username) => axios.get('http://15.164.170.252:8080/api/auth/info/?id=' + username,{withCredentials: true});
export const checkUserAndGetInfo = ({password}) => axios.post('http://15.164.170.252:8080/api/auth',{password},{withCredentials: true});
export const checkUserAndGetUser = () => axios.get("http://15.164.170.252:8080/api/auth/user",{withCredentials:true});
export const modifyUserInfo = ({email,id,pw,phone,birthday,name,comment,address,gender}) => axios.put("http://15.164.170.252:8080/api/auth/info",{email,id,password:pw,phone,birthday,name,comment,address,gender},{withCredentials:true});
export const modifyUserImage = (formData) => axios.post('http://15.164.170.252:8080/api/auth/image/id',formData,{'content-type' : 'multipart/form-data',withCredentials: true});

