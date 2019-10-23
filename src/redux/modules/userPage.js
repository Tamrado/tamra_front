import {createAction, handleActions} from 'redux-actions';

import {Map, fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as UsersAPI from 'lib/api/users';

const GET_USER_INFO = 'userPage/GET_USER_INFO';
const CHECK_USER_AND_GET_INFO = 'userPage/CHECK_USER_AND_GET_INFO';

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);
export const checkUserAndGetInfo = createAction(CHECK_USER_AND_GET_INFO, UsersAPI.checkUserAndGetInfo);

const initialState = Map({
    info: Map({
            thumbnail: null,
            username: null
    }),
    User: Map({
        userId : '',
        name: '',
        email: '',
        phone: '',
        comment: '',
        birthday : '',
        name : '',
        gender : '',
        address : ''
    })
});

export default handleActions({
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state,action) => state.set('info',fromJS(action.payload.data))
    }),
    ...pender({
        type: CHECK_USER_AND_GET_INFO,
        onSuccess: (state,action) => state.set('User',Map(action.payload.data))
    })
},initialState);