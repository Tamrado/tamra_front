import axios from 'axios';

export const checkEmailExists = (email) => axios.get('http://localhost:8080/api/member/email/?email=' + email,{withCredentials: true});
export const checkIdExists = (id) => axios.get('http://localhost:8080/api/member/id/?id=' + id,{withCredentials: true});
export const checkPhoneExists = (phone) => axios.get('http://localhost:8080/api/member/phone/?phone=' + phone,{withCredentials: true});

export const localRegister = ({email,id,password,phone,birthday,name,comment,address,gender}) => axios.post('http://localhost:8080/api/member', {email,id,password,phone,birthday,name,comment,address,gender},{withCredentials: true});
export const localLogin = ({id,password}) => axios.post('http://localhost:8080/api/member/auth', {id, password},{withCredentials: true});
export const localRegisterImage = (formData) => axios.post('http://localhost:8080/api/member/image',formData,{'content-type' : 'multipart/form-data',withCredentials: true});
export const checkStatus = () => axios.get('http://localhost:8080/api/member/auth/token/id', {withCredentials: true});
export const logout = () => axios.get('http://localhost:8080/api/member/auth/token', {withCredentials: true});
