import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as SearchAPI from '../../lib/api/search';

const SEARCH_IN_HEADER = 'search/SEARCH_IN_HEADER';
const SEARCH_IN_FRIENDLIST = 'search/SEARCH_IN_FRIENDLIST';
const SET_HEADER_CONTENT = 'search/SET_HEADER_CONTENT';
const SET_FRIEND_CONTENT = 'search/SET_FRIEND_CONTENT';
const SET_FRIEND_LIST = 'search/SET_FRIEND_LIST';
const SET_ADD_PAGE = 'search/SET_ADD_PAGE';
const SET_HEADER_VISIBLE = 'search/SET_HEADER_VISIBLE';
const SET_EMPTY_USERLIST = 'search/SET_EMPTY_USERLIST';

export const setEmptyUserlist = createAction(SET_EMPTY_USERLIST);
export const setHeaderVisible = createAction(SET_HEADER_VISIBLE);
export const setAddPage = createAction(SET_ADD_PAGE);
export const searchInHeader = createAction(SEARCH_IN_HEADER,SearchAPI.searchInHeader);
export const searchInFriendlist = createAction(SEARCH_IN_FRIENDLIST,SearchAPI.searchInFriendList);
export const setHeaderContent = createAction(SET_HEADER_CONTENT);
export const setFriendContent = createAction(SET_FRIEND_CONTENT);
export const setFriendList = createAction(SET_FRIEND_LIST);

const initialState = Map({
    headerContent : '',
    friendContent : '',
    friendList : List(),
    userList : List(),
    page : 1,
    headervisible : 'none'
});

export default handleActions({
    ...pender({
        type : SEARCH_IN_FRIENDLIST,
        onSuccess : (state,action) => state.set('friendList',fromJS(action.payload.data))
    }),
    ...pender({
        type : SEARCH_IN_HEADER,
        onSuccess : (state,action) => state.set('userList',fromJS(action.payload.data))
    }),
    [SET_EMPTY_USERLIST] : (state,action) => state.set('userList',List()),
    [SET_HEADER_VISIBLE] : (state,action) => state.set('headervisible',action.payload),
    [SET_HEADER_CONTENT] : (state,action) => state.set('headerContent',action.payload),
    [SET_FRIEND_CONTENT] : (state,action) => state.set('friendContent',action.payload),
    [SET_FRIEND_LIST] : (state,action) => state.set('friendList',action.payload),
    [SET_ADD_PAGE] :(state,action) => state.set('page',state.get('page')+1)

},initialState);