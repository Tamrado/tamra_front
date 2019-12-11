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
    nextFeed : List()
});

export default handleActions({
    [SET_FEED_INFORMATION] : (state,action) =>{
        console.log(state.get('nextFeed'));
        const nextData = state.get('nextFeed'); 
        state.update('feed',feed => feed.concat(nextData));
},
    ...pender({
        type: GET_FEED_INFORMATION,
        onSuccess: (state,action) =>{ return state.set('feed',fromJS(action.payload.data.content));}
})
    }, initialState);