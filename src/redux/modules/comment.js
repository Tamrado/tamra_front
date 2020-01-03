import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as CommentAPI from '../../lib/api/comment';

const SHOW_POST_COMMENT_LIST = 'comment/SHOW_POST_COMMENT_LIST';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const MODIFY_COMMENT = 'comment/MODIFY_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const ADD_PAGE = 'comment/ADD_PAGE';

export const addPage = createAction(ADD_PAGE);
export const showPostCommentList = createAction(SHOW_POST_COMMENT_LIST,CommentAPI.showPostCommentList);
export const writeComment = createAction(WRITE_COMMENT,CommentAPI.writeComment);
export const modifyComment = createAction(MODIFY_COMMENT,CommentAPI.modifyComment);
export const deleteComment = createAction(DELETE_COMMENT,CommentAPI.deleteComment);

const initialState = Map({
    commentList : List(),
    result : Map({}),
    page : 1
});

export default handleActions({
    [ADD_PAGE] : (state,action) => state.set('page',state.get('page')+ 1),
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