import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import storage from '../lib/storage';
import {FriendListContainer,PostListContainer,WriteContainer} from '../containers/Base';
class Post extends Component {

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
            <WriteContainer/>
            <PageWrapper>
                <PostListContainer/>
                <FriendListContainer/>
            </PageWrapper>
            </div>
        );
    }
}

export default Post;