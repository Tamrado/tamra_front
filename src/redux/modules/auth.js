import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as AuthAPI from '../../lib/api/auth';
import * as UsersAPI from '../../lib/api/users';

const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_ID_EXISTS = 'auth/CHECK_ID_EXISTS';
const CHECK_PHONE_EXISTS = 'auth/CHECK_PHONE_EXISTS';

const SET_ERROR = 'auth/SET_ERROR';
const SET_ERROR_ID = 'auth/SET_ERROR_ID';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_REGISTER_IMAGE = 'auth/LOCAL_REGISTER_IMAGE';
const LOGOUT = 'auth/LOGOUT';

const KAKAO_LOGIN = 'auth/KAKAO_LOGIN';
const KAKAO_REGISTER = 'auth/KAKAO_REGISTER';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';// input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_USER_INFO = 'auth/GET_USER_INFO';
const CHECK_USER_AND_GET_INFO = 'auth/CHECK_USER_AND_GET_INFO';
const CHECK_USER_AND_GET_USER = 'auth/CHECK_USER_AND_GET_USER';
const MODIFY_USER_INFO = 'auth/MODIFY_USER_INFO';
const MODIFY_USER_IMAGE = 'auth/MODIFY_USER_IMAGE';
const SET_USER_THUMBNAIL = 'auth/SET_USER_THUMBNAIL';
const SET_GENDER = 'auth/SET_GENDER';
const SET_PASSWORD = 'auth/SET_PASSWORD';

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists);
export const checkIdExists = createAction(CHECK_ID_EXISTS,AuthAPI.checkIdExists);
export const checkPhoneExists = createAction(CHECK_PHONE_EXISTS, AuthAPI.checkPhoneExists);

export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
export const localLogin = createAction(LOCAL_LOGIN,AuthAPI.localLogin);
export const localRegisterImage = createAction(LOCAL_REGISTER_IMAGE,AuthAPI.localRegisterImage);
export const kakaoLogin = createAction(KAKAO_LOGIN,AuthAPI.kakaoLogin);
export const kakaoRegister = createAction(KAKAO_REGISTER,AuthAPI.kakaoRegister);

export const logout = createAction(LOGOUT, AuthAPI.logout);

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);
export const checkUserAndGetInfo = createAction(CHECK_USER_AND_GET_INFO, UsersAPI.checkUserAndGetInfo);
export const checkUserAndGetUser = createAction(CHECK_USER_AND_GET_USER,UsersAPI.checkUserAndGetUser);
export const modifyUserInfo = createAction(MODIFY_USER_INFO,UsersAPI.modifyUserInfo);
export const modifyUserImage = createAction(MODIFY_USER_IMAGE,UsersAPI.modifyUserImage);

export const changeInput = createAction(CHANGE_INPUT);// {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); //form
export const setError = createAction(SET_ERROR);
export const setErrorId = createAction(SET_ERROR_ID);
export const setUserData = createAction(SET_USER_DATA);
export const setUserThumbnail = createAction(SET_USER_THUMBNAIL);
export const setGender = createAction(SET_GENDER);
export const setPassword = createAction(SET_PASSWORD);

const initialState = Map({
    thumbnail: '',
    register: Map({
        form: Map({
            id : '',
            password: '',
            passwordConfirm : '',
            email: '',
            phone: '',
            comment: '',
            birthday : '',
            name : '',
            gender : '',
            address : ''
            }),
        error: null,
        errorId : ''
    }),
    registerImage: Map({
        form : Map({
            image : null
        })
    }),
    login: Map({
        form: Map({
            id: '',
            password: ''
        }),
        error: null
    }),
    result: Map({})
});


export default handleActions({
    [SET_GENDER] : (state,action) => state.setIn(['register','form','gender'],action.payload),
    [SET_PASSWORD]: (state,action) => state.setIn(['register','form','password'],action.payload),
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
    [SET_ERROR_ID] : (state,action) => {
        const {form, id} = action.payload;
        return state.setIn([form, 'errorId'],id);
    },
    [SET_USER_DATA] : (state,action) => {
        const {form,data} = action.payload;
        return state.setIn([form,'form'],Map(data));
    },
    [SET_USER_THUMBNAIL] : (state,action) => state.set('thumbnail',action.payload),
    ...pender({
        type: CHECK_EMAIL_EXISTS,
        onSuccess: (state,action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: CHECK_PHONE_EXISTS,
        onSuccess: (state,action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: CHECK_ID_EXISTS,
        onSuccess: (state,action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_REGISTER_IMAGE,
        onSuccess: (state, action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: KAKAO_LOGIN,
        onSuccess : (state,action) => state.set('result',Map(action.payload.data))
    }),
    ...pender({
        type: KAKAO_REGISTER,
        onSuccess: (state,action) => state.set('result',Map(action.payload.data))
    }),
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
}, initialState);