import React, { Component } from 'react';
import storage from '../lib/storage';
import PageWrapper from '../components/PageWrapper';
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
        const { match } = this.props;
        const { username } = match.params;
        return (
            <TimelineContainer userid={username}/>
         
        )
    }
}
export default MyPost;