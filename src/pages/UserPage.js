import React, { Component } from 'react';
import {ModifyWrapper,ConfirmContent} from '../components/User';
import UserModify from '../containers/User/UserModify';
class UserPage extends Component {

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