import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink,AuthError,Label} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import {setError,checkEmailExists,validate,setAuthActions} from '../Function/ValidateModule';
import * as userActions from '../../redux/modules/user';
import storage from '../../lib/storage';

class KakaoRegister extends Component{ 
    componentDidMount(){
        if(!storage.get('kakaologin')) return null;
        storage.remove('kakaologin');
        setAuthActions(this.props.AuthActions);
    }
    handleChange = (e) =>{
        const {AuthActions} = this.props;
        const {name, value} = e.target;
        AuthActions.changeInput({
          name,
          value,
          form: 'register'  
        });
        if( name.indexOf('email') > -1)
            checkEmailExists(value);
    } 
    handleLocalRegister = async() => {
        const{form, AuthActions, error, history,UserActions,match} = this.props;
        const{id} = match.params;
        const {email,comment} = form.toJS();
    
        if(error) return; //현재 에러 있는 상태라면 진행 x
        if(!validate['email'](email)
        || !validate['comment'](comment)
        ){
            //하나라도 실패하면 진행 하지 않음
            return;
        }
        
        try{
             await AuthActions.kakaoRegister({
                email,id,comment
            });
            const loggedInfo = this.props.result.toJS();
            storage.set('loggedInfo', loggedInfo);
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setValidated(true);
            history.push('/');
        } catch(e){
            if(e.response.status === 411)
                setError('조건에 맞는 데이터를 입력해주세요.');
            if(e.response.status === 409)
                setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.');
        }
        }
        enterRegister = () => {
            if(window.event.keyCode === 13)
              this.handleLocalRegister();
        }
render(){
    const {error,errorId} = this.props;
        const {email,comment} = this.props.form.toJS();
        const {handleChange,handleLocalRegister,enterRegister} = this;
    return(
        <AuthContent title='SIGN UP'>
                <InputWithLabel label = "이메일" name="email" placeholder="timeline@naver.com" enter = {enterRegister}
                value = {email}
                onChange={handleChange}/>
                 {
                    errorId === 'email' &&error && <AuthError>{error}</AuthError>
                }               
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다." enter = {enterRegister}
                value = {comment} onChange={handleChange} enter = {enterRegister}/>
                {
                    errorId === 'comment' &&error && <AuthError>{error}</AuthError>
                } 
                <AuthButton onClick={handleLocalRegister} enter = {enterRegister}>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
    );
}
}
export default connect(
    (state) => ({
        form: state.auth.getIn(['register','form']),
        error: state.auth.getIn(['register','error']),
        errorId: state.auth.getIn(['register','errorId']),
        result: state.auth.get('result')
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch)
    })
)(KakaoRegister);