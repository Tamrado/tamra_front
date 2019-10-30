import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as UsersAPI from 'lib/api/users';

const CHANGE_INPUT = 'userPage/CHANGE_INPUT';
const INITIALIZE_FORM = 'userPage/INITIALIZE_FORM';
const SET_ERROR = 'userPage/SET_ERROR';

const GET_USER_INFO = 'userPage/GET_USER_INFO';
const CHECK_USER_AND_GET_INFO = 'userPage/CHECK_USER_AND_GET_INFO';

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const setError = createAction(SET_ERROR);

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);
export const checkUserAndGetInfo = createAction(CHECK_USER_AND_GET_INFO, UsersAPI.checkUserAndGetInfo);

const initialState = Map({
    info: Map({
        thumbnail: null, 
        username: null
    }),
    User: Map({
        form : Map({
            userId : '',
            password: '',
            name: '',
            email: '',
            phone: '',
            comment: '',
            birthday : '',
            gender : '',
            address : ''
        }),
        error : null
    }),
    pass: false
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
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state,action) => state.set('info',Map(action.payload.data))
    }),
    ...pender({
        type: CHECK_USER_AND_GET_INFO,
        onSuccess: (state,action) => state.setIn(['User','form'],Map(action.payload.data)).set('pass',true),
        
    })
},initialState);