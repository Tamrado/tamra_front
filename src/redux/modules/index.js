import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import userPage from './userPage';
import post from './post';
import friend from './friend';
import search from './search';
import timeline from './timeline';
import {penderReducer} from 'redux-pender';
import like from './like';
import comment from './comment';
import alarm from './alarm';

export default combineReducers({
    base,
    auth,
    user,
    userPage,
    post,
    friend,
    search,
    timeline,
    like,
    comment,
    alarm,
    pender: penderReducer
});