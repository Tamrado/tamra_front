import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as PostAPI from '../../lib/api/post';

const GET_FEED_INFORMATION = 'post/GET_FEED_INFORMATION';
const SET_FEED_INFORMATION = 'post/SET_FEED_INFORMATION';
const SET_FRIEND_INFO = 'post/SET_FRIEND_INFO';
const REMOVE_FRIEND = 'post/REMOVE_FRIEND';
const REMOVE_IMAGE = 'post/REMOVE_IMAGE';
const SET_IMAGE = 'post/SET_IAMGE';
const SET_WRITTEN_DATA = 'post/SET_WRITTEN_DATA';
const ADD_PAGE = 'post/ADD_PAGE';
const SET_FALSE_POST = 'post/SET_FALSE_POST';
const SET_SHOW_LEVEL = 'post/SET_SHOW_LEVEL';

export const setShowLevel = createAction(SET_SHOW_LEVEL);
export const setFalsePost = createAction(SET_FALSE_POST);
export const addPage = createAction(ADD_PAGE);
export const setWrittenData = createAction(SET_WRITTEN_DATA);
export const removeFriend = createAction(REMOVE_FRIEND);
export const setFeedInformation = createAction(SET_FEED_INFORMATION);
export const setFriendInfo = createAction(SET_FRIEND_INFO);
export const setImage = createAction(SET_IMAGE);
export const removeImage = createAction(REMOVE_IMAGE);
export const getFeedInformation = createAction(GET_FEED_INFORMATION,PostAPI.getFeedInformation);

const initialState = Map({
    friendInfo: List(),
    feed : List(),
    page : 1,
    isTruePost : true,
    image : List(),
    writtenData : '',
    showLevel : ''   
});


export default handleActions({
    [SET_SHOW_LEVEL] : (state,action) => state.set('showLevel',action.payload.showLevel),
    [ADD_PAGE] : (state,action) => state.set('page', state.get('page') + 1),
    [SET_FALSE_POST]: (state,action) => state.set('isTruePost',false),
    [SET_WRITTEN_DATA] : (state,action) => state.set('writtenData',action.payload),
    [SET_IMAGE] :(state,action) => state.update('image',image => 
    image.push(
        Map({
            url : action.payload.url
        })
    )
    ),
    [REMOVE_IMAGE]:(state,action)=>{
        const index = state.get('image')
        .findIndex(item => item.get('url')===action.payload.id);
        return state.deleteIn(['image',index]);
    },
    [SET_FRIEND_INFO]: (state,action) =>{
        const index = state.get('friendInfo')
        .findIndex(item => item.get('id')===action.payload.id);
        if(index < 0){
            return state.update('friendInfo',friendInfo => 
            friendInfo.push(
                Map({
                    id : action.payload.id,
                    nickname : action.payload.nickname,
                    thumbnail : action.payload.thumbnail
                })
            )
        );
        }
        return state.set('friendInfo',state.get('friendInfo'));
            },
    [REMOVE_FRIEND]:(state,action)=>{
        const index = state.get('friendInfo')
        .findIndex(item => item.get('id')===action.payload.id);
        return state.deleteIn(['friendInfo',index]);
    },
    [SET_FEED_INFORMATION] : (state,action) =>{
        console.log(state.get('nextFeed'));
        const nextData = state.get('nextFeed'); 
        state.update('feed',feed => feed.concat(nextData));
},
    ...pender({
        type: GET_FEED_INFORMATION,
        onSuccess: (state,action) =>state.update('feed',feed => feed.concat(fromJS(action.payload.data.contentlist))), 
        onFailure : (state,action) => state.set('feed',state.get('feed'))
    })
    }, initialState);