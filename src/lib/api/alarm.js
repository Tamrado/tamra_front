import axios from 'axios';

export const getAlarm = () => axios.get('http://15.164.170.252:8080/api/post/event/fetch',{withCredentials: true});
export const getAlarmNum = () => axios.get('http://15.164.170.252:8080/api/post/event/count',{withCredentials: true});
export const setAllReadAlarm = () => axios.put('http://15.164.170.252:8080/api/post/event/all/read',{withCredentials:true});