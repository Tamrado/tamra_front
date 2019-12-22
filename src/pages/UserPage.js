import React, { Component } from 'react';
import {ModifyWrapper,ConfirmContent} from '../components/User';
import UserModify from '../containers/User/UserModify';
import storage from '../lib/storage';
class UserPage extends Component {
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
            <ModifyWrapper>
                <ConfirmContent>
                <UserModify username = {username}/>
                </ConfirmContent>
            </ModifyWrapper>
        );
    }

}
export default UserPage;