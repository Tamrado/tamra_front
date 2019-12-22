import React, { Component } from 'react';
import storage from '../lib/storage';
import {ModifyWrapper,ConfirmContent} from '../components/User';
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
        return (
            <ModifyWrapper></ModifyWrapper>
        )
    }
}
export default MyPost;