import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as LikeAPI from '../../lib/api/like';

const SET_LIKE_DISPLAY = 'like/SET_LIKE_DISPLAY';
const CLICK_LIKE = 'like/CLICK_LIKE';
const CANCEL_LIKE = 'like/CANCEL_LIKE';
const GET_LIKE_AND_USER_LIST = 'like/GET_LIKE_AND_USER_LIST';

export const getLikeAndUserList = createAction(GET_LIKE_AND_USER_LIST,LikeAPI.getLikeandUserList);
export const setLikeDisplay = createAction(SET_LIKE_DISPLAY);
export const clickLike = createAction(CLICK_LIKE,LikeAPI.clickLike);
export const cancelLike = createAction(CANCEL_LIKE,LikeAPI.cancelLike);

const initialState = Map({
    likedisplay:'none',
    likelist : List()
});

export default handleActions({
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
        onSuccess : (state,action) => state.set('likelist',action.payload.data)
    })
    }, initialState);