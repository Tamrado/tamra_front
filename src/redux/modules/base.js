import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY';
const SET_FOLLOW_MENU_VISIBLE = 'base/SET_FOLLOW_MENU_VISIBLE';
const SET_ALARM_MENU_VISIBLE = 'base/SET_ALARM_MENU_VISIBLE';

export const setFollowMenuVisible = createAction(SET_FOLLOW_MENU_VISIBLE);
export const setAlarmMenuVisible = createAction(SET_ALARM_MENU_VISIBLE);
export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY);

const initialState = Map({
    header: Map({
        visible: true
    }),
    userMenuVisible : 'none',
    followMenuVisible : 'none',
    alarmMenuVisible : 'none'
});

export default handleActions({
    [SET_FOLLOW_MENU_VISIBLE] : (state,action) => state.set('followMenuVisible',action.payload),
    [SET_ALARM_MENU_VISIBLE] : (state,action) => state.set('alarmMenuVisible',action.payload),
    [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(['header', 'visible'], action.payload),
    [SET_USER_MENU_VISIBILITY]: (state,action) => state.set('userMenuVisible', action.payload)
}, initialState);