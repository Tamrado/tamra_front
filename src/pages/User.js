import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import UserHeadContainer from 'containers/User/UserHeadContainer';
import socket from 'lib/socket';

class User extends Component {

    componentDidMount() {
        socket.ignore();
    }

    componentWillUnmount() {
        socket.listen();
    }
    
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