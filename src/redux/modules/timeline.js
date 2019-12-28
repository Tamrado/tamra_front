import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';

const SET_COMMENT= 'timeline/SET_COMMENT';
const SET_THUMBNAIL = 'timeline/SET_THUMBNAIL';
const SET_USERNAME = 'timeline/SET_USERNAME';
const SET_NICKNAME = 'timeline/SET_NICKNAME';

export const setComment = createAction(SET_COMMENT);
export const setThumbnail = createAction(SET_THUMBNAIL);
export const setUsername = createAction(SET_USERNAME);
export const setNickname = createAction(SET_NICKNAME);

const initialState = Map({
    comment : '',
    thumbnail : '',
    username : '',
    nickname : ''
});

export default handleActions({
    [SET_COMMENT]:(state,action)=>state.set('comment',action.payload),
    [SET_THUMBNAIL] :(state,action) =>state.set('thumbnail',action.payload),
    [SET_USERNAME]: (state,action)=>state.set('username',action.payload),
    [SET_NICKNAME] : (state,action) =>state.set('nickname',action.payload)
    }, initialState);