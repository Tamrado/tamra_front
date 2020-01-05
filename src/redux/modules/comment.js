import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as CommentAPI from '../../lib/api/comment';

const SHOW_POST_COMMENT_LIST = 'comment/SHOW_POST_COMMENT_LIST';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const MODIFY_COMMENT = 'comment/MODIFY_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

export const showPostCommentList = createAction(SHOW_POST_COMMENT_LIST,CommentAPI.showPostCommentList);
export const writeComment = createAction(WRITE_COMMENT,CommentAPI.writeComment);
export const modifyComment = createAction(MODIFY_COMMENT,CommentAPI.modifyComment);
export const deleteComment = createAction(DELETE_COMMENT,CommentAPI.deleteComment);

const initialState = Map({
    commentList : List(),
    result : Map({}),
    presentComment : Map({})
});

export default handleActions({
    ...pender({
        type : SHOW_POST_COMMENT_LIST,
        onSuccess : (state,action) => state.set('commentList',fromJS(action.payload.data.contentlist)),
        onFailure : (state,action) => state.set('commentList',List())
        }),
    ...pender({
        type : WRITE_COMMENT,
        onSuccess : (state,action) => state.set('presentComment',fromJS(action.payload.data))
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