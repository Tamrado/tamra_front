import React, { Component } from 'react';
import {ModifyWrapper,ConfirmContent} from '../components/User';
import {UserHeadContainer} from '../containers/User';

class UserPageConfirm extends Component {

    render() {
        const { match } = this.props;
        const { username } = match.params;
        return(
            <ModifyWrapper>
                <ConfirmContent>
                <UserHeadContainer username = {username}/>
                </ConfirmContent>
            </ModifyWrapper>
        );
    }

}
export default UserPageConfirm;