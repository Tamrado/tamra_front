import React, { Component } from 'react';
import storage from '../lib/storage';
import {FriendTagContainer} from '../containers/Base';
class PostFriendTag extends Component {

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
        return (
            <div>
            <FriendTagContainer/>
            </div>
        );
    }
}

export default PostFriendTag;