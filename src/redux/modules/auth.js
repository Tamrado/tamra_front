import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_ID_EXISTS = 'auth/CHECK_ID_EXISTS';
const CHECK_PHONE_EXISTS = 'auth/CHECK_PHONE_EXISTS';

const SET_ERROR = 'auth/SET_ERROR';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_REGISTER_IMAGE = 'auth/LOCAL_REGISTER_IMAGE';
const LOGOUT = 'auth/LOGOUT';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';// input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists);
export const checkIdExists = createAction(CHECK_ID_EXISTS,AuthAPI.checkIdExists);
export const checkPhoneExists = createAction(CHECK_PHONE_EXISTS, AuthAPI.checkPhoneExists);

export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
export const localLogin = createAction(LOCAL_LOGIN,AuthAPI.localLogin);
export const localRegisterImage = createAction(LOCAL_REGISTER_IMAGE,AuthAPI.localRegisterImage);

export const logout = createAction(LOGOUT, AuthAPI.logout);

export const changeInput = createAction(CHANGE_INPUT);// {form, name, value}
export const initializeForm = createAction(INITIALIZE_FORM); //form
export const setError = createAction(SET_ERROR);

const initialState = Map({
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
        error: null
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
    })
}, initialState);