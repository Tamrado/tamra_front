import React, { Component } from 'react';
import storage from '../lib/storage';
import {FriendListContainer,WriteBoxContainer,TagListContainer,WithListContainer,PostListContainer} from '../containers/Base';

class Home extends Component {
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
        const {history} = this.props;
        return (
            <div>
                <PostListContainer history = {history}/>
                <WithListContainer/>
                <WriteBoxContainer/>
                <TagListContainer/>
                <FriendListContainer/>
            </div>
        );
    }
}

export default Home;