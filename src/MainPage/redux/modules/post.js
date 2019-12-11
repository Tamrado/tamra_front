import { Map,List,fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import * as PostAPI from '../../lib/api/post';
const GET_FEED_INFORMATION = 'post/GET_FEED_INFORMATION';
const SET_FEED_INFORMATION = 'post/SET_FEED_INFORMATION';


export const setFeedInformation = createAction(SET_FEED_INFORMATION);
export const getFeedInformation = createAction(GET_FEED_INFORMATION,PostAPI.getFeedInformation);

const initialState = Map({
    feed : List(),
    nextFeed : List(),
    result : []
});

export default handleActions({
    [SET_FEED_INFORMATION] : (state,action) => state.set('feed',action.payload),
    ...pender({
        type: GET_FEED_INFORMATION,
        onSuccess: (state,action) => state.set('result',Map(action.payload.data))
    })
    }, initialState);