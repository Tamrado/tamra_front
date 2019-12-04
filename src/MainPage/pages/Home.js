import React, { Component } from 'react';
import PageWrapper from '../components/Base/PageWrapper';
import storage from '../../CommonFolder/lib/storage';
import {FriendList} from '../components/Base/FriendList';
class Home extends Component {
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo){
            window.location.href = '/auth/Login'
        }
    }
    render() {
        return (
            <PageWrapper>
                <FriendList></FriendList>
            </PageWrapper>
        );
    }
}

export default Home;