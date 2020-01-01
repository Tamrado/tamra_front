import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as LikeAPI from '../../lib/api/like';

const SET_LIKE_DISPLAY = 'like/SET_LIKE_DISPLAY';
const CLICK_LIKE = 'like/CLICK_LIKE';
const CANCEL_LIKE = 'like/CANCEL_LIKE';
const GET_LIKE_AND_USER_LIST = 'like/GET_LIKE_AND_USER_LIST';
const SET_LIKE_KEY = 'like/SET_LIKE_KEY';

export const setLikeKey = createAction(SET_LIKE_KEY);
export const getLikeAndUserList = createAction(GET_LIKE_AND_USER_LIST,LikeAPI.getLikeandUserList);
export const setLikeDisplay = createAction(SET_LIKE_DISPLAY);
export const clickLike = createAction(CLICK_LIKE,LikeAPI.clickLike);
export const cancelLike = createAction(CANCEL_LIKE,LikeAPI.cancelLike);

const initialState = Map({
    likedisplay:'',
    likelist : List(),
    totalNum : 0,
    likeKey : -1
});

export default handleActions({
    [SET_LIKE_KEY] : (state,action) => state.set('likeKey',action.payload),
    [SET_LIKE_DISPLAY] :(state,action) => state.set('likedisplay',action.payload),
    ...pender({
        type: CLICK_LIKE,
        onSuccess: (state,action) =>state.set('likedisplay','none') 
    }),
    ...pender({
        type: CANCEL_LIKE,
        onSuccess: (state,action) =>state.set('likedisplay','block') 
        
    }),
    ...pender({
        type : GET_LIKE_AND_USER_LIST,
        onSuccess : (state,action) => state.set('totalNum',action.payload.data.totalNum).set('likelist',action.payload.data)
    })
    }, initialState);