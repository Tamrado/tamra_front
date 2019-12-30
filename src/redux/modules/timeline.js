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
const SET_HASH_DISPLAY = 'post/SET_HASH_DISPLAY';
const SET_KEY = 'post/SET_KEY';
const ADD_PAGE = 'post/ADD_PAGE';
const SET_FALSE_POST = 'post/SET_FALSE_POST';
const SET_CATEGORY_ID = 'post/SET_CATEGORY_ID';
const SET_SENDER_ID = 'post/SET_SENDER_ID';
const SET_FOLLOW_DISPLAY = 'post/SET_FOLLOW_DISPLAY';
const SET_MAINFEED = 'post/SET_MAINFEED';
const SET_ISTRUE_POST = 'post/SET_ISTRUE_POST';
const SET_PAGE = 'post/SET_PAGE';

export const setPage = createAction(SET_PAGE);
export const setIsTruePost = createAction(SET_ISTRUE_POST);
export const setMainfeed= createAction(SET_MAINFEED);
export const setFollowDisplay = createAction(SET_FOLLOW_DISPLAY);
export const setCategoryId = createAction(SET_CATEGORY_ID);
export const setSenderId = createAction(SET_SENDER_ID);
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
    senderid : '',
    followdisplay : 'none'
});

export default handleActions({
    [SET_PAGE]:(state,action) => state.set('page',1),
    [SET_ISTRUE_POST] :(state,action) => state.set('isTruePost',true),
    [SET_MAINFEED] : (state,action) => state.set('mainfeed',List()),
    [SET_FOLLOW_DISPLAY]:(state,action) => state.set('followdisplay',action.payload),
    [SET_CATEGORY_ID] : (state,action) => state.set('categoryid',action.payload),
    [SET_SENDER_ID] : (state,action) => state.set('senderid',action.payload),
    [SET_COMMENT]:(state,action)=>state.set('comment',action.payload),
    [SET_THUMBNAIL] :(state,action) =>state.set('thumbnail',action.payload),
    [SET_USERNAME]: (state,action)=>state.set('username',action.payload),
    [SET_NICKNAME] : (state,action) =>state.set('nickname',action.payload),
    [SET_KEY] : (state,action) => state.set('keyid',parseInt(action.payload)),
    [SET_HASH_DISPLAY] : (state,action) => state.set('hashdisplay',action.payload),
    [ADD_PAGE] : (state,action) => state.set('page', state.get('page') + 1),
    [SET_FALSE_POST]: (state,action) => state.set('isTruePost',false),
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
    }, initialState);