import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import * as AuthAPI from '../../lib/api/auth';
import {pender} from 'redux-pender';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT,AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS,AuthAPI.checkStatus);// 현재 로그인상태 확인

const initialState = Map({
    loggedInfo: Map({ // 현재 로그인 중인 유저의 정보
        thumbnail: null, 
        username: null
    }),
    logged : false, //현재 로그인중인지 알려줌
    validated: false // 현재 로그인 중인지 아닌지 한번 서버측에 검증했음을 의미
});

export default handleActions({
    [SET_LOGGED_INFO]: (state,action) => state.set('loggedInfo',Map(action.payload)).set('logged',true),
    [SET_VALIDATED] : (state,action) => state.set('validated', action.payload),
    ...pender({
        type: CHECK_STATUS,
        onSuccess: (state,action) => state.set('loggedInfo',Map(action.payload.data)).set('validated', true),
        onFailure: (state,action) => initialState
    })

}, initialState);