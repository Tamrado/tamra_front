import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, AuthLogin,AuthRegister, UserPageConfirm,UserPage} from './pages';
import HeaderContainer from './containers/Base/HeaderContainer';

import storage from './lib/storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './redux/modules/user';



class App extends Component {

    initializeUserInfo = async () => {
        const {UserActions} = this.props;
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo)
        return ;
        
        UserActions.setLoggedInfo(loggedInfo);
        try{
           await UserActions.checkStatus();
        } catch(e){
            console.log(e);
            storage.remove('loggedInfo');
            window.location.replace('/auth/login?expired');
            return;
        }
       
    }
    componentDidMount(){
        console.log('dgdsgdg');
        this.initializeUserInfo();
    }

    render() {
        return (
            <div>
              <HeaderContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth/Login" component={AuthLogin}/>
                <Route path="/auth/Register" component={AuthRegister}/>
                <Route path="/@:username/password" component={UserPageConfirm}/>
                <Route path="/@:username/info"component={UserPage}/>
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);