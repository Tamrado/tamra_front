import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import {Route} from 'react-router-dom';
import {UserModify} from 'containers/User';

class UserPage extends Component {

    render() {
        return(
            <PageWrapper>
                <Route path = '/@:username/info' component={UserModify}/>
            </PageWrapper>
        );
    }

}
export default UserPage;