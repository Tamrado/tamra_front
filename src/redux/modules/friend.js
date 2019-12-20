import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as FriendAPI from '../../lib/api/friend';

const GET_FRIENDLIST_INFO= 'friend/GET_FRIENDLIST_INFO';
const GET_FRIEND_ALARM_INFO = 'friend/GET_FRIEND_ALARM_INFO';
const DELETE_FRIEND_ALARM_NOTIFICATION = 'friend/DELETE_FRIEND_ALARM_NOTIFICATION';


export const getFriendAlarmInfo = createAction(GET_FRIEND_ALARM_INFO,FriendAPI.getFriendAlarmInfo);
export const getFriendListInfo = createAction(GET_FRIENDLIST_INFO,FriendAPI.getFriendListInfo);
export const deleteFriendAlarmNotification = createAction(DELETE_FRIEND_ALARM_NOTIFICATION,FriendAPI.deleteFriendAlarmNotification);


const initialState = Map({
    friend : List(),
    alarm : List()
});

export default handleActions({
    ...pender({
        type: GET_FRIEND_ALARM_INFO,
        onSuccess: (state,action) =>{ return state.set('alarm',fromJS(action.payload.data));}
    }),
    ...pender({
        type: GET_FRIENDLIST_INFO,
        onSuccess: (state,action) =>{ return state.set('friend',fromJS(action.payload.data));}
    })
    }, initialState);