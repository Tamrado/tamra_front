import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as PostAPI from '../../lib/api/post';
import { MAC_IP_RE } from 'address';

const UPLOAD_FEED = 'post/UPLOAD_FEED';
const UPLOAD_IMAGE = 'post/UPLOAD_IMAGE'
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
const UPDATE_FILELIST = 'post/UPDATE_FILELIST';
const INITIALIZE_FILELIST = 'post/INITIALIZE_FILELIST';
const INITIALIZE_IMAGE = 'post/INITIALIZE_IMAGE';
const DELETE_FEED = 'post/DELETE_FEED';
const SET_FILE_SIZE = 'post/SET_FILE_SIZE';

export const setFileSize = createAction(SET_FILE_SIZE);
export const deleteFeed = createAction(DELETE_FEED,PostAPI.deleteFeed);
export const initializeImage = createAction(INITIALIZE_IMAGE);
export const initializeFilelist = createAction(INITIALIZE_FILELIST);
export const updateFilelist = createAction(UPDATE_FILELIST);
export const uploadFeed = createAction(UPLOAD_FEED,PostAPI.uploadFeed);
export const uploadImage = createAction(UPLOAD_IMAGE,PostAPI.uploadImage);
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
    showLevel : 'public',
    withFriend : '',
    withDisplay : 'none',
    withFriendDisplay : 'none',
    display : 'none',
    writeDisplay : 'none',
    postId : -1,
    clear : 0,
    result : Map({}),
    filelist : List(),
    fileSize : Map({})
});


export default handleActions({
    ...pender({
        type : DELETE_FEED,
        onSucces : (state,action) => state.set('result',action.payload)
    }),
    ...pender({
        type : UPLOAD_FEED,
        onSuccess : (state,action) => state.set('postId',action.payload.data.postId)
    }),
    ...pender({
        type : UPLOAD_IMAGE,
        onSuccess : (state,action) => state.set('clear',2),
        onFailure : (state,action) => state.set('clear',-1)
    }),
    [UPDATE_FILELIST] : (state,action) => state.update('filelist',item => item.push(Map({
        file : action.payload
    })
    )),
    [SET_FILE_SIZE] : (state,action) => state.set('fileSize',action.payload),
    [INITIALIZE_IMAGE] :(state,action) => state.set('image',List()),
    [INITIALIZE_FILELIST] :(state,action) => state.set('filelist',List()),
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
        .findIndex(item => item.get('username')===action.payload.id);
        if(index < 0){
            return state.update('friendInfo',friendInfo => 
            friendInfo.push(
                Map({
                    username : action.payload.username,
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
        const index = state.get('friendInfo').findIndex(item => item.get('username')===action.payload);
        return state.deleteIn(['friendInfo',index]);
    },
    
    }, initialState);