import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, AuthLogin,AuthRegister, User,UserPage } from './CommonFolder/pages';
import HeaderContainer from './MainPage/containers/Base/HeaderContainer';

import storage from './CommonFolder/lib/storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './Auth/redux/modules/user';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 

class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo) return;

        const {UserActions} = this.props;
        UserActions.setLoggedInfo(loggedInfo);
        try{
            await UserActions.checkStatus();
        } catch(e){
            console.log(e);
            storage.remove('loggedInfo');
            
            window.location.href = '/auth/login?expired'
        }
    }
    componentDidMount(){
        this.initializeUserInfo();
    }

    render() {
        return (
            <div>
              <HeaderContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/auth/Login" component={AuthLogin}/>
                <Route path="/auth/Register" component={AuthRegister}/>
                <Route path="/@:username/password" component={User}/>
                <Route path="/@:username/info"component={UserPage}/>
                <ToastContainer style={{zIndex: 20}} hideProgressBar={true} position="bottom-right"/>
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