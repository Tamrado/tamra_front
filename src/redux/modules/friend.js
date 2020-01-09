import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as FriendAPI from '../../lib/api/friend';

const GET_FRIENDLIST_INFO= 'friend/GET_FRIENDLIST_INFO';
const GET_FRIEND_ALARM_INFO = 'friend/GET_FRIEND_ALARM_INFO';
const DELETE_FRIEND_ALARM_NOTIFICATION = 'friend/DELETE_FRIEND_ALARM_NOTIFICATION';
const FOLLOW = 'friend/FOLLOW';
const GET_MY_INFO_NUM = 'friend/GET_MY_INFO_NUM';
const GET_OTHER_INFO_NUM = 'friend/GET_OTHER_INFO_NUM';
const NOTIFY_IS_FOLLOW_USER = 'friend/NOTIFY_IS_FOLLOW_USER';
const UNFOLLOW = 'friend/UNFOLLOW';

export const unfollow = createAction(UNFOLLOW,FriendAPI.unfollow);
export const notifyIsFollowUser = createAction(NOTIFY_IS_FOLLOW_USER,FriendAPI.notifyIsFollowUser);
export const getFriendAlarmInfo = createAction(GET_FRIEND_ALARM_INFO,FriendAPI.getFriendAlarmInfo);
export const getFriendListInfo = createAction(GET_FRIENDLIST_INFO,FriendAPI.getFriendListInfo);
export const deleteFriendAlarmNotification = createAction(DELETE_FRIEND_ALARM_NOTIFICATION,FriendAPI.deleteFriendAlarmNotification);
export const follow = createAction(FOLLOW,FriendAPI.follow);
export const getMyInfoNum = createAction(GET_MY_INFO_NUM,FriendAPI.getMyfInfoNum);
export const getOtherInfoNum = createAction(GET_OTHER_INFO_NUM,FriendAPI.getOtherInfoNum);
const initialState = Map({
    friend : List(),
    alarm : List(),
    result: Map({}),
    friendRequestNum : 0,
    alarmRequestNum : 0,
    followNum : 0,
    followerNum : 0,
    isFollow : '팔로우'
});

export default handleActions({
    ...pender({
        type : NOTIFY_IS_FOLLOW_USER,
        onSuccess : (state,action) => state.set('isFollow','팔로잉'),
        onFailure : (state,action) => state.set('isFollow','팔로우')
        }),
    ...pender({
        type : FOLLOW,
        onSuccess : (state,action) => state.set('isFollow','팔로잉')
    }),
    ...pender({
        type : UNFOLLOW,
        onSuccess : (state,action) => state.set('isFollow','팔로우')
    }),
    ...pender({
        type : GET_MY_INFO_NUM,
        onSuccess: (state,action) => state.set('followNum',action.payload.data.followNum)
        .set('followerNum',action.payload.data.followerNum)
    }),
    ...pender({
        type : GET_OTHER_INFO_NUM,
        onSuccess: (state,action) => state.set('followNum',action.payload.data.followInfo.followNum)
        .set('followerNum',action.payload.data.followInfo.followerNum).set('result',action.payload.data.userInfo)
    }),
    ...pender({
        type: GET_FRIEND_ALARM_INFO,
        onSuccess: (state,action) => state.set('alarm',fromJS(action.payload.data))
        .set('friendRequestNum',fromJS(action.payload.data).size),
        onFailure : (state,action) => state.set('alarm',List()).set('friendRequestNum',0)
    }),
    ...pender({
        type: GET_FRIENDLIST_INFO,
        onSuccess: (state,action) =>{ return state.set('friend',fromJS(action.payload.data));}
    }),
    ...pender({
        type : DELETE_FRIEND_ALARM_NOTIFICATION,
        onSuccess: (state,action) => {return state.set('result',fromJS(action.payload.data));}
    })
    }, initialState);