import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../../MainPage/redux/modules/base';
import {AuthWrapperRegister} from '../components/Auth';
import {Route} from 'react-router-dom';
import {Register} from '../containers/Auth';
class AuthRegister extends Component {

    componentDidMount(){
        this.props.BaseActions.setHeaderVisibility(false);
    }

    componentWillUnmount(){
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (        
            <AuthWrapperRegister>
            <Route path="/auth/Register" component={Register}/>
            </AuthWrapperRegister>
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
)(AuthRegister);