import React, { Component } from 'react';
import storage from '../lib/storage';
import PageWrapper from '../components/PageWrapper';
import {FriendListContainer,PostListContainer,WriteBoxContainer,TagListContainer,WithListContainer} from '../containers/Base';
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
        return (
            <div>
                <PostListContainer/>
                <WithListContainer/>
                <WriteBoxContainer/>
                <TagListContainer/>
                <FriendListContainer/>
            </div>
        );
    }
}

export default Home;