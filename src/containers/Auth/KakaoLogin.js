import React, { Component } from 'react';
import { KakaoLoginButton } from '../../components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import storage from '../../lib/storage';

class KakaoLogin extends Component{
    
    responseKakao = async(res) =>{
        const { profile,response } = res;
        const {AuthActions,history} = this.props;
        
        const{
            access_token,
            refresh_token
        } = response;
    const {
      id,
      kakao_account: {
          email,
        profile: { nickname, profile_image_url}
      }
    } = profile;

    try{
    await AuthActions.kakaoLogin({
        accesstoken:access_token,
        refreshtoken : refresh_token,
        uid : id,
        nickname : nickname,
        thumbnail : profile_image_url,
        email : email
    });
    if(typeof this.props.result.toJS().username === 'undefined'){
        storage.set('kakaologin',true);
        history.replace(`/auth/kakao/Register/${id}`);
    }
    else{
        storage.set('loggedInfo',this.props.result.toJS());
        window.location.replace('/');
    }
    }catch(e){
        console.log(e);
    }   
    
    }
    responseFail = (error) =>{
        console.log(error);
    }

render(){
    const {responseKakao,responseFail} = this;
    return(
        <KakaoLoginButton responseKakao={responseKakao} responseFail={responseFail}/>
    );
}
}
export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login', 'error']),
        result : state.auth.get('result'),
        user: state.user
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions,dispatch)
    })
)(KakaoLogin);