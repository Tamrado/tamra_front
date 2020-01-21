import {createAction, handleActions} from 'redux-actions';
import {Map, List,fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as AlarmAPI from '../../lib/api/alarm';

const GET_ALARM = 'alarm/GET_ALARM';
const GET_ALARM_NUM = 'alarm/GET_ALARM_NUM';
const SET_ALL_READ_ALARM = 'alarm/SET_ALL_READ_ALARM';
const SET_ALARM_TIME = 'alarm/SET_ALARM_TIME';
const SET_FRIEND_REQUEST_VISIBLE = 'alarm/SET_FRIEND_REQUEST_VISIBLE';
const SET_ALARM_NUM_VISIBLE = 'alarm/SET_ALARM_NUM_VISIBLE';
const SET_NO_FRIEND_ADD_VISIBLE = 'alarm/SET_NO_FRIEND_ADD_VISIBLE';
const SET_ALARM_NONE_VISIBLE = 'alarm/SET_ALARM_NONE_VISIBLE';

export const setAlarmNoneVisible = createAction(SET_ALARM_NONE_VISIBLE);
export const setNoFriendAddVisible = createAction(SET_NO_FRIEND_ADD_VISIBLE);
export const setAlarmNumVisible = createAction(SET_ALARM_NUM_VISIBLE);
export const setFriendRequestVisible = createAction(SET_FRIEND_REQUEST_VISIBLE);
export const getAlarm = createAction(GET_ALARM,AlarmAPI.getAlarm);
export const getAlarmNum = createAction(GET_ALARM_NUM,AlarmAPI.getAlarmNum);
export const setAllReadAlarm = createAction(SET_ALL_READ_ALARM,AlarmAPI.setAllReadAlarm);
export const setAlarmTime = createAction(SET_ALARM_TIME);
const initialState = Map({
    alarmList : List(),
    alarmNum : 0,
    result : Map({}),
    friendRequestVisible : 'none',
        alarmNumVisible : 'none',
        noFriendAddVisible : 'none',
        alarmNoneVisible : 'none'
});

export default handleActions({
    [SET_FRIEND_REQUEST_VISIBLE] : (state,action) => state.set('friendRequestVisible',action.payload),
    [SET_ALARM_NUM_VISIBLE] : (state,action) => state.set('alarmNumVisible',action.payload),
    [SET_NO_FRIEND_ADD_VISIBLE] : (state,action) => state.set('noFriendAddVisible',action.payload),
    [SET_ALARM_NONE_VISIBLE] : (state,action) => state.set('alarmNoneVisible',action.payload),
    [SET_ALARM_TIME] : (state,action) => state.setIn(['alarmList',action.payload.index,'dateString'],action.payload.dateString),
    ...pender({
        type : GET_ALARM,
        onSuccess : (state,action) => state.set('alarmList',fromJS(action.payload.data))
    }),
    ...pender({
        type : GET_ALARM_NUM,
        onSuccess : (state,action) => state.set('alarmNum',action.payload.data.count)
    }),
    ...pender({
        type : SET_ALL_READ_ALARM,
        onSuccess : (state,action) => state.set('result',action.payload)
    })

},initialState);