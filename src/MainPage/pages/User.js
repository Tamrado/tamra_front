import React, { Component } from 'react';
import PageWrapper from '../components/Base/PageWrapper';
import {UserHeadContainer} from '../../UserPage/containers/User';


class User extends Component {

    render() {
        const { match } = this.props;
        const { username } = match.params;

        return (
            <PageWrapper>
                <UserHeadContainer username={username}/>
            </PageWrapper>
        );
    }
}

export default User;