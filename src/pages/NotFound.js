import React, { Component } from 'react';
import storage from '../lib/storage';
import {PageNotFound} from '../components/Page';
class NotFound extends Component {
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
            <PageNotFound/>
        )
    }
}
export default NotFound;