import {createAction, handleActions} from 'redux-actions';
import {Map, List,fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as AlarmAPI from '../../lib/api/alarm';

const GET_ALARM = 'alarm/GET_ALARM';
const GET_ALARM_NUM = 'alarm/GET_ALARM_NUM';
const SET_ALL_READ_ALARM = 'alarm/SET_ALL_READ_ALARM';
const SET_ALARM_NUM = 'alarm/SET_ALARM_NUM';

export const getAlarm = createAction(GET_ALARM,AlarmAPI.getAlarm);
export const getAlarmNum = createAction(GET_ALARM_NUM,AlarmAPI.getAlarmNum);
export const setAllReadAlarm = createAction(SET_ALL_READ_ALARM,AlarmAPI.setAllReadAlarm);
export const setAlarmNum = createAction(SET_ALARM_NUM);

const initialState = Map({
    alarmList : List(),
    alarmNum : 0,
    result : Map({})
});

export default handleActions({
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