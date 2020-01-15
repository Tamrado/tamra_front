import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import { Home, AuthLogin,AuthRegister, UserPageConfirm,AuthKakaoRegister,
    UserPage,Timeline,ImageDetail,Search,NotFound} from './pages';
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
        if(loggedInfo.category === 'basic'){
        try{
           await UserActions.checkStatus();
        } catch(e){
            console.log(e);
            storage.remove('loggedInfo');
            window.location.replace('/auth/login?expired');
            return;
        }
    }
    else{
        try{
            await UserActions.kakaoCheckStatus();
         } catch(e){
             console.log(e);
             storage.remove('loggedInfo');
             window.location.replace('/auth/login?expired');
             return;
         }
    }
       
    }
    componentDidMount(){
        this.initializeUserInfo();
    }

    render() {
        return (
            <div>
              <HeaderContainer/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path = "/feed/@:postid/image/:index" component={ImageDetail}/>
                <Route path="/auth/Login" component={AuthLogin}/>
                <Route path="/auth/kakao/Register/:id" component={AuthKakaoRegister}/>
                <Route path="/auth/Register" component={AuthRegister}/>
                <Route exact path="/@:username/password" component={UserPageConfirm}/>
                <Route exact path="/@:username/info"component={UserPage}/>
                <Route exact path="/@:username"component={Timeline}/>
                <Route exact path = "/search/:nickname" component={Search}/>
                <Route exact path = "/notfound" component={NotFound}/>
                <Route component={NotFound}/>
                </Switch>
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