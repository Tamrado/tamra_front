import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../redux/modules/base';
import {AuthWrapper} from '../components/Auth';
import {Route} from 'react-router-dom';
import {Login,KakaoLogin} from '../containers/Auth';
class AuthLogin extends Component {

    render() {
        const {history} = this.props;  
        return (
            <AuthWrapper>
               <KakaoLogin history={history} />
            <Route path="/auth/Login" component={Login}/>
            </AuthWrapper>
        );
    }
}

export default connect(
    (state) => ({

    }),
    //상태값 수정할 때 사용되는 메소드
    (dispatch) => ({
        // bindActionCreators 는 액션함수들을 자동으로 바인딩해줍니다.
        BaseActions : bindActionCreators(baseActions, dispatch)
    })
)(AuthLogin);