import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as CommentAPI from '../../lib/api/comment';

const SHOW_POST_COMMENT_LIST = 'comment/SHOW_POST_COMMENT_LIST';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const MODIFY_COMMENT = 'comment/MODIFY_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const SET_COMMENT_DISPLAY = 'comment/SET_COMMENT_DISPLAY';
const ADD_PAGE = 'comment/ADD_PAGE';
const SET_COMMENT_ID = 'comment/SET_COMMENT_ID';
const SET_COMMENT_SENDER = 'comment/SET_COMMENT_SENDER';
const SET_COMMENT_CATEGORY = 'comment/SET_COMMENT_CATEGORY';

export const setCommentCategory=createAction(SET_COMMENT_CATEGORY);
export const setCommentSender = createAction(SET_COMMENT_SENDER);
export const setCommentId = createAction(SET_COMMENT_ID);
export const addPage = createAction(ADD_PAGE);
export const setCommentDisplay = createAction(SET_COMMENT_DISPLAY);
export const showPostCommentList = createAction(SHOW_POST_COMMENT_LIST,CommentAPI.showPostCommentList);
export const writeComment = createAction(WRITE_COMMENT,CommentAPI.writeComment);
export const modifyComment = createAction(MODIFY_COMMENT,CommentAPI.modifyComment);
export const deleteComment = createAction(DELETE_COMMENT,CommentAPI.deleteComment);

const initialState = Map({
    commentList : List(),
    commentdisplay : 'none',
    result : Map({}),
    page : 1,
    commentId : -1,
    commentCategory : '',
    commentSender : ''
});

export default handleActions({
    [SET_COMMENT_CATEGORY] : (state,action) => state.set('commentCategory',action.payload),
    [SET_COMMENT_SENDER] : (state,action) => state.set('commentSender',action.payload),
    [SET_COMMENT_ID] : (state,action) => state.set('commentId',action.payload),
    [ADD_PAGE] : (state,action) => state.set('page',state.get('page')+ 1),
    [SET_COMMENT_DISPLAY] : (state,action) => state.set('commentdisplay',action.payload),
    ...pender({
        type : SHOW_POST_COMMENT_LIST,
        onSuccess : (state,action) => state.set('commentList',action.payload.contentlist),
        onFailure : (state,action) => state.set('commentList',List())
        }),
    ...pender({
        type : WRITE_COMMENT,
        onSuccess : (state,action) => state.set('result',action.payload)
    }),
    ...pender({
        type : MODIFY_COMMENT,
        onSuccess : (state,action) => state.set('result',action.payload)
    }),
    ...pender({
        type: DELETE_COMMENT,
        onSuccess : (state,action) => state.set('result',action.payload)
    })
},initialState);