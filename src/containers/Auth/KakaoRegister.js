import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink,AuthError} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import {setAuthActions,setUserActions,setPostActions} from '../Function/setActionModule';
import {setError} from '../Function/ValidateModule';
import {setMatchId,handleRegister,registerNextPhase,handleChange} from '../Function/SignModule';
import * as userActions from '../../redux/modules/user';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
import {Popup} from '../../components/Popup';

class KakaoRegister extends Component{ 
    componentDidMount(){
        const{AuthActions,PostActions,match,UserActions} = this.props;
        if(!storage.get('kakaologin')) return null;
        storage.remove('kakaologin');
        setAuthActions(AuthActions);
        setPostActions(PostActions);
        setUserActions(UserActions);
        setMatchId(match.params.id);
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
        handleLocalRegister = async() => {
            const{form,error} = this.props;
            try{
            await handleRegister('kakaoRegister',form.toJS(),error);
            registerNextPhase(this.props.result);
            }catch(e){
                setError('다시 클릭해주세요.','main');
            }
        }
render(){
    const {error,errorId,popupDisplay} = this.props;
        const {email,comment} = this.props.form.toJS();
        const {handleLocalRegister,enterRegister,handlePopupOk} = this;
    return(
        <div>
        <AuthContent title='SIGN UP'>
                <InputWithLabel label = "이메일(필수)" name="email" placeholder="timeline@naver.com" enter = {enterRegister}
                value = {email}
                onChange={handleChange}/>
                 {
                    errorId === 'email' &&error && <AuthError>{error}</AuthError>
                }               
                <InputWithLabel label = "코멘트(선택)" name="comment" placeholder="반갑습니다."
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