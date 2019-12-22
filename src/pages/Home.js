import React, { Component } from 'react';
import storage from '../lib/storage';
import PageWrapper from '../components/PageWrapper';
import {FriendListContainer,PostListContainer,WriteContainer} from '../containers/Base';
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
                <FriendListContainer/>
            </div>
        );
    }
}

export default Home;