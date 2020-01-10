import React, { Component } from 'react';
import {ModifyWrapper,ConfirmContent} from '../components/User';
import {UserHeadContainer} from '../containers/User';
import storage from '../lib/storage';
class UserPageConfirm extends Component {
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
        return(
            
                <ConfirmContent>
                <UserHeadContainer username = {username}/>
                </ConfirmContent>
            
        );
    }

}
export default UserPageConfirm;