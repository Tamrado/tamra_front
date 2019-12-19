import React, { Component } from 'react';
import PageWrapper from '../components/PageWrapper';
import storage from '../lib/storage';
import {FriendListContainer,PostListContainer} from '../containers/Base';
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
            <PageWrapper>
                <PostListContainer/>
                <FriendListContainer/>
            </PageWrapper>
        );
    }
}

export default Home;