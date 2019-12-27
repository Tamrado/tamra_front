import axios from 'axios';

export const getFriendListInfo = () => axios.get(`http://localhost:8080/api/friend/list`,{withCredentials: true});
export const getFriendAlarmInfo = () => axios.get(`http://localhost:8080/api/friend/alarmlist`,{withCredentials: true});
export const deleteFriendAlarmNotification = ({userId}) => axios.put(`http://localhost:8080/api/friend/alarmlist/notification`,{userId},{withCredentials: true});
export const follow = (userId) => axios.get(`http://localhost:8080/api/friend?friendName=${userId}`,{withCredentials : true});
export const unfollow = ({userId}) => axios.put('http://localhost:8080/api/friend/no',{userId},{withCredentials: true});
export const getOtherfInfoNum = (fid) => axios.get(`http://localhost:8080/api/friend/post/${fid}/num`,{withCredentials: true});
export const getMyfInfoNum = () => axios.get(`http://localhost:8080/api/friend/post/num`,{withCredentials: true});
