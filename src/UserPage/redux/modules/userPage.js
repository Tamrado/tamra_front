import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as UsersAPI from '../../lib/api/users';

const CHANGE_INPUT = 'userPage/CHANGE_INPUT';
const INITIALIZE_FORM = 'userPage/INITIALIZE_FORM';
const SET_ERROR = 'userPage/SET_ERROR';
const SET_USER_INFO = 'userPage/SET_USER_INFO';
const SET_USER_DATA = 'userPage/SET_USER_DATA';

const GET_USER_INFO = 'userPage/GET_USER_INFO';
const CHECK_USER_AND_GET_INFO = 'userPage/CHECK_USER_AND_GET_INFO';
const CHECK_USER_AND_GET_USER = 'userPage/CHECK_USER_AND_GET_USER';
const MODIFY_USER_INFO = 'userPage/MODIFY_USER_INFO';
const MODIFY_USER_IMAGE = 'userPage/MODIFY_USER_IMAGE';

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const setError = createAction(SET_ERROR);
export const setUserInfo = createAction(SET_USER_INFO);
export const setUserData = createAction(SET_USER_DATA);

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);
export const checkUserAndGetInfo = createAction(CHECK_USER_AND_GET_INFO, UsersAPI.checkUserAndGetInfo);
export const checkUserAndGetUser = createAction(CHECK_USER_AND_GET_USER,UsersAPI.checkUserAndGetUser);
export const modifyUserInfo = createAction(MODIFY_USER_INFO,UsersAPI.modifyUserInfo);
export const modifyUserImage = createAction(MODIFY_USER_IMAGE,UsersAPI.modifyUserImage);

const initialState = Map({
    info: Map({
        thumbnail: null, 
        username: null
    }),
    User: Map({
        form : Map({
            id : '',
            password: '',
            passwordConfirm: '',
            name: '',
            email: '',
            phone: '',
            comment: '',
            birthday : '',
            gender : '',
            address : ''
        }),
        error : null,
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT]:(state, action) => {
        const {form,name,value}=action.payload;
        return state.setIn([form,'form',name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action)=> {
        const {form, message} = action.payload;
        return state.setIn([form, 'error'],message);
    },
    [SET_USER_INFO]:(state,action) => state.set('info',action.payload),

    [SET_USER_DATA] : (state,action) => state.setIn(['User','form'],Map(action.payload)),

    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: CHECK_USER_AND_GET_INFO,
        onSuccess: (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: CHECK_USER_AND_GET_USER,
        onSuccess : (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: MODIFY_USER_INFO,
        onSuccess : (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: MODIFY_USER_IMAGE,
        onSuccess : (state,action) => state.set('result',Map(action.payload.data))
    })
},initialState);