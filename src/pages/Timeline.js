import React, { Component } from 'react';
import storage from '../lib/storage';
import {TimelineContainer} from '../containers/Timeline';
class MyPost extends Component {
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo){
            window.location.href = '/auth/login?expired';
            return;
        }
    }
    render() {
        const { match,history } = this.props;
        const { username } = match.params;
        if(username.substr(1) === '') window.location.href = '/notfound';
        return (
            <div>
            <TimelineContainer userid={username} history={history}/>
            </div>
        )
    }
}
export default MyPost;