import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink,AuthError} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import {setError,checkEmailExists,validate,setAuthActions} from '../Function/ValidateModule';
import * as userActions from '../../redux/modules/user';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
import {Popup} from '../../components/Popup';

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
        const{form, AuthActions, error,UserActions,match,PostActions} = this.props;
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
            PostActions.setPopupDisplay('block');
            
        } catch(e){
            if(e.response.status === 411)
                setError('조건에 맞는 데이터를 입력해주세요.','main');
            if(e.response.status === 409)
                setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.','main');
        }
        }
        enterRegister = () => {
            if(window.event.keyCode === 13)
              this.handleLocalRegister();
        }
        handlePopupOk = () => {
            const{PostActions,history} = this.props;
            PostActions.setPopupDisplay('none');
            history.push('/');
        }
render(){
    const {error,errorId,popupDisplay} = this.props;
        const {email,comment} = this.props.form.toJS();
        const {handleChange,handleLocalRegister,enterRegister,handlePopupOk} = this;
    return(
        <div>
        <AuthContent title='SIGN UP'>
                <InputWithLabel label = "이메일" name="email" placeholder="timeline@naver.com(필수)" enter = {enterRegister}
                value = {email}
                onChange={handleChange}/>
                 {
                    errorId === 'email' &&error && <AuthError>{error}</AuthError>
                }               
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다.(선택)"
                value = {comment} onChange={handleChange} enter = {enterRegister}/>
                {
                    errorId === 'comment' &&error && <AuthError>{error}</AuthError>
                } 
                <AuthButton onClick={handleLocalRegister} enter = {enterRegister}>회원가입</AuthButton>
                {
                    errorId === 'main' &&error && <AuthError>{error}</AuthError>
                } 
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
             <Popup handlePopupOk = {handlePopupOk} right={'20%'} top = {'100px'} display={popupDisplay} text={'회원가입이 완료었습니다.'} />
            </div>
    );
}
}
export default connect(
    (state) => ({
        form: state.auth.getIn(['register','form']),
        error: state.auth.getIn(['register','error']),
        errorId: state.auth.getIn(['register','errorId']),
        result: state.auth.get('result'),
        popupText : state.post.get('popupText'),
        popupId : state.post.get('popupId'),
        popupDisplay : state.post.get('popupDisplay')
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch),
        PostActions : bindActionCreators(postActions,dispatch)
    })
)(KakaoRegister);