import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import userPage from './userPage';
import post from './post';
import friend from './friend';
import {penderReducer} from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    userPage,
    post,
    friend,
    pender: penderReducer
});