import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as TimelineAPI from '../../lib/api/timeline';

const SET_COMMENT= 'timeline/SET_COMMENT';
const SET_THUMBNAIL = 'timeline/SET_THUMBNAIL';
const SET_USERNAME = 'timeline/SET_USERNAME';
const SET_NICKNAME = 'timeline/SET_NICKNAME';
const GET_MAIN_INFORMATION = 'timeline/GET_MAIN_INFORMATION';
const GET_TIMELINE_INFORMATION = 'timeline/GET_TIMELINE_INFORMATION';
const GET_TIMELINE_POST_NUM = 'timeline/GET_TIMELINE_POST_NUM';
const GET_FEED_INFORMATION_DETAIL = 'timeline/GET_FEED_INFORMATION_DETAIL';
const SET_HASH_DISPLAY = 'timeline/SET_HASH_DISPLAY';
const SET_KEY = 'timeline/SET_KEY';
const ADD_PAGE = 'timeline/ADD_PAGE';
const SET_FALSE_POST = 'timeline/SET_FALSE_POST';
const SET_CATEGORY_ID = 'timeline/SET_CATEGORY_ID';
const SET_FOLLOW_DISPLAY = 'timeline/SET_FOLLOW_DISPLAY';
const SET_MAINFEED = 'timeline/SET_MAINFEED';
const SET_ISTRUE_POST = 'timeline/SET_ISTRUE_POST';
const SET_PAGE = 'timeline/SET_PAGE';
const SET_LIKE_KEY = 'timeline/SET_LIKE_KEY';
const SET_LIKE = 'timeline/SET_LIKE';
const SET_LIKE_NUM = 'timeline/SET_LIKE_NUM';
const SET_TIMELINE_LIKE = 'timeline/SET_TIMELINE_LIKE';
const SET_TIMELINE_LIKE_NUM = 'timeline/SET_TIMELINE_LIKE_NUM';
const GET_COMMENT_DISPLAY = 'timeline/GET_COMMENT_DISPLAY';
const SET_COMMENT_DISPLAY = 'timeline/SET_COMMENT_DISPLAY';
const SET_COMMENT_ID = 'timeline/SET_COMMENT_ID';
const SET_COMMENT_CATEGORY = 'timeline/SET_COMMENT_CATEGORY';
const SET_TIMELINE_COMMENT_DISPLAY = 'timeline/SET_TIMELINE_COMMENT_DISPLAY';
const RENEW_MAIN_INFORMATION = 'timeline/RENEW_MAIN_INFORMATION';

export const renewMainInformation = createAction(RENEW_MAIN_INFORMATION);
export const setTimelineCommentDisplay = createAction(SET_TIMELINE_COMMENT_DISPLAY);
export const setCommentDisplay = createAction(SET_COMMENT_DISPLAY);
export const setCommentCategory=createAction(SET_COMMENT_CATEGORY);
export const setCommentId = createAction(SET_COMMENT_ID);
export const getCommentDisplay = createAction(GET_COMMENT_DISPLAY);
export const setTimelineLike = createAction(SET_TIMELINE_LIKE);
export const setTimelineLikeNum = createAction(SET_TIMELINE_LIKE_NUM);
export const setLikeNum = createAction(SET_LIKE_NUM);
export const setLike = createAction(SET_LIKE);
export const setLikeKey = createAction(SET_LIKE_KEY);
export const setPage = createAction(SET_PAGE);
export const setIsTruePost = createAction(SET_ISTRUE_POST);
export const setMainfeed= createAction(SET_MAINFEED);
export const setFollowDisplay = createAction(SET_FOLLOW_DISPLAY);
export const setCategoryId = createAction(SET_CATEGORY_ID);
export const setFalsePost = createAction(SET_FALSE_POST);
export const addPage = createAction(ADD_PAGE);
export const setKey = createAction(SET_KEY);
export const setHashDisplay = createAction(SET_HASH_DISPLAY);
export const setComment = createAction(SET_COMMENT);
export const setThumbnail = createAction(SET_THUMBNAIL);
export const setUsername = createAction(SET_USERNAME);
export const setNickname = createAction(SET_NICKNAME);
export const getMainInformation = createAction(GET_MAIN_INFORMATION,TimelineAPI.getMainInformation);
export const getTimelineInformation = createAction(GET_TIMELINE_INFORMATION,TimelineAPI.getTimelineInformation);
export const getTimelinePostNum = createAction(GET_TIMELINE_POST_NUM,TimelineAPI.getTimelinePostNum);
export const getFeedInformationDetail = createAction(GET_FEED_INFORMATION_DETAIL,TimelineAPI.getFeedInformationDetail);
const initialState = Map({
    comment : '',
    thumbnail : '',
    username : '',
    nickname : '',
    postNum : 0,
    mainfeed : List(),
    page : 1,
    isTruePost : true,
    hashdisplay : 'none',
    keyid : -1,
    categoryid : '',
    followdisplay : 'none',
    likeKey : -1,
    commentId : -1,
    totalNum : 0,
    commentCategory : '',
    commentdisplay : 'none',
    presentPost : Map({})
});

export default handleActions({
    [RENEW_MAIN_INFORMATION] : (state,action) =>{ 
        return state.set('mainfeed',state.get('mainfeed').unshift(state.get('presentPost')));
    }, 
    [SET_COMMENT_CATEGORY] : (state,action) => state.set('commentCategory',action.payload),
    [SET_COMMENT_ID] : (state,action) => state.set('commentId',action.payload),
    [SET_COMMENT_DISPLAY] : (state,action) =>{
        const index = state.get('mainfeed').findIndex(item => item.getIn(['feed','postId'])===parseInt(state.get('commentId'))
        && item.get('category')===state.get('commentCategory'));
        if(state.getIn(['mainfeed',index,'feed','commentState'])==='none')
            return state.setIn(['mainfeed',index,'feed','commentState'],'block').set('commentdisplay','block');
        else
            return state.setIn(['mainfeed',index,'feed','commentState'],'none').set('commentdisplay','none');
    },
    [SET_TIMELINE_COMMENT_DISPLAY] : (state,action) =>{
        const index = state.get('mainfeed').findIndex(item => item.get('postId')===parseInt(state.get('commentId')));
        if(state.getIn(['mainfeed',index,'commentState'])==='none')
            return state.setIn(['mainfeed',index,'commentState'],'block').set('commentdisplay','block');
        else
            return state.setIn(['mainfeed',index,'commentState'],'none').set('commentdisplay','none');
    },
    [SET_LIKE_NUM] : (state,action) => {
        const index = state.get('mainfeed').findIndex(item => item.getIn(['feed','postId'])===parseInt(state.get('likeKey')))
        return state.setIn(['mainfeed',index,'feed','totalLike'],action.payload);
    },
    [SET_TIMELINE_LIKE_NUM] : (state,action) => {
        const index = state.get('mainfeed').findIndex(item => item.get('postId')===parseInt(state.get('likeKey')))
        return state.setIn(['mainfeed',index,'totalLike'],action.payload);
    },
    [SET_LIKE_KEY] : (state,action) => state.set('likeKey',action.payload),
    [SET_PAGE]:(state,action) => state.set('page',1),
    [SET_ISTRUE_POST] :(state,action) => state.set('isTruePost',true),
    [SET_MAINFEED] : (state,action) => state.set('mainfeed',List()),
    [SET_FOLLOW_DISPLAY]:(state,action) => state.set('followdisplay',action.payload),
    [SET_CATEGORY_ID] : (state,action) => state.set('categoryid',action.payload),
    [SET_COMMENT]:(state,action)=>state.set('comment',action.payload),
    [SET_THUMBNAIL] :(state,action) =>state.set('thumbnail',action.payload),
    [SET_USERNAME]: (state,action)=>state.set('username',action.payload),
    [SET_NICKNAME] : (state,action) =>state.set('nickname',action.payload),
    [SET_KEY] : (state,action) => state.set('keyid',parseInt(action.payload)),
    [SET_HASH_DISPLAY] : (state,action) => state.set('hashdisplay',action.payload),
    [ADD_PAGE] : (state,action) => state.set('page', state.get('page') + 1),
    [SET_FALSE_POST]: (state,action) => state.set('isTruePost',false),
    [SET_LIKE] : (state,action) => {
        const index = state.get('mainfeed').findIndex(item => item.getIn(['feed','postId'])===parseInt(state.get('likeKey')))
        return state.setIn(['mainfeed',index,'feed','islike'],action.payload);
    },
    [SET_TIMELINE_LIKE] : (state,action) => {
        const index = state.get('mainfeed').findIndex(item => item.get('postId')===parseInt(state.get('likeKey')))
        return state.setIn(['mainfeed',index,'islike'],action.payload);
    },
    ...pender({
        type: GET_MAIN_INFORMATION,
        onSuccess: (state,action) =>state.update('mainfeed',feed => feed.concat(fromJS(action.payload.data.contentlist))) 
        
    }),
    ...pender({
        type: GET_TIMELINE_POST_NUM,
        onSuccess: (state,action) =>state.set('postNum',action.payload.data) 
    }),
    ...pender({
        type: GET_TIMELINE_INFORMATION,
        onSuccess: (state,action) =>state.update('mainfeed',feed => feed.concat(fromJS(action.payload.data.contentlist))) 
        
    }),
    ...pender({
        type: GET_FEED_INFORMATION_DETAIL,
        onSuccess: (state,action) => state.set('presentPost',fromJS(action.payload.data))
    })
    }, initialState);