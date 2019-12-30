import axios from 'axios';

export const getFriendListInfo = () => axios.get(`http://localhost:8080/api/friend/list`,{withCredentials: true});
export const getFriendAlarmInfo = () => axios.get(`http://localhost:8080/api/friend/alarmlist`,{withCredentials: true});
export const deleteFriendAlarmNotification = ({userId}) => axios.put(`http://localhost:8080/api/friend/alarmlist/notification`,{userId},{withCredentials: true});
export const follow = (userId) => axios.get(`http://localhost:8080/api/friend?friendName=${userId}`,{withCredentials : true});
export const unfollow = ({friendId}) => axios.put('http://localhost:8080/api/friend/no',{friendId},{withCredentials: true});
export const getOtherInfoNum = (fid) => axios.get(`http://localhost:8080/api/friend/post/${fid}/num`,{withCredentials: true});
export const getMyfInfoNum = () => axios.get(`http://localhost:8080/api/friend/post/num`,{withCredentials: true});
export const notifyIsFollowUser = (fid) => axios.get(`http://localhost:8080/api/friend/${fid}/isfollow`,{withCredentials:true});