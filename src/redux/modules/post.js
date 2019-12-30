import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as PostAPI from '../../lib/api/post';

const GET_FEED_INFORMATION = 'post/GET_FEED_INFORMATION';
const SET_FRIEND_INFO = 'post/SET_FRIEND_INFO';
const REMOVE_FRIEND = 'post/REMOVE_FRIEND';
const REMOVE_IMAGE = 'post/REMOVE_IMAGE';
const SET_IMAGE = 'post/SET_IAMGE';
const SET_WRITTEN_DATA = 'post/SET_WRITTEN_DATA';
const SET_SHOW_LEVEL = 'post/SET_SHOW_LEVEL';
const SET_WITH_FRIEND = 'post/SET_WITH_FRIEND';
const SET_WITH_DISPLAY = 'post/SET_WITH_DISPLAY';
const SET_WITH_FRIEND_DISPLAY = 'post/SET_WITH_FRIEND_DISPLAY';
const SET_DISPLAY = 'post/SET_DISPLAY';
const SET_WRITE_DISPLAY = 'post/SET_WRITE_DISPLAY';

export const setWriteDisplay = createAction(SET_WRITE_DISPLAY);
export const setDisplay = createAction(SET_DISPLAY);
export const setWithFriendDisplay = createAction(SET_WITH_FRIEND_DISPLAY);
export const setWithDisplay = createAction(SET_WITH_DISPLAY);
export const setWithFriend = createAction(SET_WITH_FRIEND);
export const setShowLevel = createAction(SET_SHOW_LEVEL);
export const setWrittenData = createAction(SET_WRITTEN_DATA);
export const removeFriend = createAction(REMOVE_FRIEND);
export const setFriendInfo = createAction(SET_FRIEND_INFO);
export const setImage = createAction(SET_IMAGE);
export const removeImage = createAction(REMOVE_IMAGE);


const initialState = Map({
    friendInfo: List(),
    tags : List(),
    image : List(),
    writtenData : '',
    showLevel : '',
    withFriend : '',
    withDisplay : 'none',
    withFriendDisplay : 'none',
    display : 'none',
    writeDisplay : 'none',
});


export default handleActions({
    [SET_WRITE_DISPLAY]: (state,action) => state.set('writeDisplay', action.payload),
    [SET_DISPLAY] : (state,action) => state.set('display',action.payload),
    [SET_WITH_FRIEND_DISPLAY] :(state,action) => state.set('withFriendDisplay',action.payload),
    [SET_WITH_DISPLAY] : (state,action) => state.set('withDisplay',action.payload),
    [SET_WITH_FRIEND] : (state,action) => state.set('withFriend',action.payload),
    [SET_SHOW_LEVEL] : (state,action) => state.set('showLevel',action.payload.showLevel),
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
                    thumbnail : action.payload.thumbnail,
                    comment : action.payload.comment
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
    
    }, initialState);