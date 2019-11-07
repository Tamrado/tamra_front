import React, { Component } from 'react';
import PageWrapper from '../../MainPage/components/Base/PageWrapper';
import UserModify from '../containers/User/UserModify';

class UserPage extends Component {

    render() {
        const { match } = this.props;
        const { username } = match.params;
        return(
            <PageWrapper>
                <UserModify username = {username}/>
            </PageWrapper>
        );
    }

}
export default UserPage;