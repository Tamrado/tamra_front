import { combineReducers } from 'redux';
import base from '../../../MainPage/redux/modules/base';
import auth from '../../../Auth/redux/modules/auth';
import user from '../../../Auth/redux/modules/user';
import userPage from '../../../UserPage/redux/modules/userPage';
import {penderReducer} from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    userPage,
    pender: penderReducer
});