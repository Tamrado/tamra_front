import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink} from 'components/Auth';
import { bindActionCreators } from '../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

class Register extends Component{
    
    componentWillUnmount(){
        const {AuthActions} = this.props;
        AuthActions.initializeForm('register')
    }

    handleChange = (e) =>{
    const {AuthActions} = this.props;
    const {name, value} = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'register'  
    });
}
    render(){
        const {id,password,passwordConfirm,email,name,phone,birthday,comment} = this.props.form.toJS();
        const {handleChange} = this;
        return(
            <AuthContent title='회원가입'>
                <InputWithLabel label = "아이디" name="id" placeholder="아이디"
                value = {id}
                onChange={handleChange}/>
                <InputWithLabel label = "비밀번호" name="password" placeholder="비밀번호"
                value={password}
                onChange={handleChange}/>
                <InputWithLabel label = "비밀번호 확인" name="passwordConfirm" placeholder="다시 한번 입력"
                value={passwordConfirm}
                onChange={handleChange}/>
                <InputWithLabel label = "생년월일" name="birthday" placeholder="****-**-**"
                value = {birthday}
                onChange={handleChange}/>
                <InputWithLabel label = "이메일" name="email" placeholder="timeline@naver.com"
                value = {email}
                onChange={handleChange}/>
                <InputWithLabel label = "핸드폰 번호" name="phone" placeholder="010-1234-1234"
                value={phone}
                onChange={handleChange}/>
                <InputWithLabel label = "이름" name="name" placeholder="이름"
                value = {name}
                onChange={handleChange}/>
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다."
                value = {comment}
                onChange={handleChange}/>                
                <AuthButton>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
        }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register','form'])
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch)
    })
)(Register);