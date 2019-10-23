import axios from 'axios';

export const checkEmailExists = (email) => axios.get('/api/member/email/?email=' + email);
export const checkIdExists = (id) => axios.get('/api/member/id/?id=' + id);
export const checkPhoneExists = (phone) => axios.get('/api/member/phone/?phone=' + phone);

export const localRegister = ({email,id,password,phone,birthday,name,comment,address,gender}) => axios.post('/api/member', {email,id,password,phone,birthday,name,comment,address,gender});
export const localLogin = ({id,password}) => axios.post('/api/member/auth', {id, password},{withCredentials: true});
export const localRegisterImage = (formData) => axios.post('/api/member/image',formData,{headers:{'content-type' : 'multipart/form-data',withCredentials: true}});
export const checkStatus = () => axios.get('/api/member/auth/token/id', {withCredentials: true});
export const logout = () => axios.get('/api/member/auth/token', {withCredentials: true});
