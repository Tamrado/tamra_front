import React, { Component } from 'react';
import PageWrapper from '../components/Base/PageWrapper';
import storage from '../../CommonFolder/lib/storage';
import {FriendListContainer,PostListContainer} from '../containers/Base';
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
        const { match } = this.props;
        const { username } = match.params;
        return (
            <PageWrapper>
                <PostListContainer username = {username}/>
                <FriendListContainer/>
            </PageWrapper>
        );
    }
}

export default Home;