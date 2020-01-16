import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,AuthError,Label} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as userPageActions from '../../redux/modules/userPage';
import * as userActions from '../../redux/modules/user';
import * as authActions from '../../redux/modules/auth';
import storage from '../..//lib/storage';
import {setError,validate,checkEmailExists,checkPhoneExists,inputStyle
    ,setAuthActions,setPassword} from '../Function/ValidateModule';

class UserModify extends Component{        

    checkIfUserPassed = () => {
        const{username} = this.props;
        if(!storage.get('passed')) window.location.href = '/@' + username+ "/password";
        else storage.remove('passed');
    }
    
    initialModifyInfo = async() => {
        const{username,UserPageActions} = this.props;
        try{
        await UserPageActions.checkUserAndGetUser();
        const user = this.props.result.toJS();
        UserPageActions.setUserData(user);
        
        }
        catch(e){
            console.log(e);
            window.location.replace('/@' + username+ "/password");
        }
    }

    componentDidMount(){
        this.checkIfUserPassed();
        this.initialModifyInfo();
        setAuthActions(this.props.AuthActions);
    }
    componentWillUnmount(){
        const {UserPageActions} = this.props;
        UserPageActions.initializeForm('User');
        
    }

    checkedChange = (e) =>{
        const {UserPageActions} = this.props;
        const {name, value} = e.target.checked;
        UserPageActions.changeInput({
          name,
          value,
          form: 'User'  
        });
    }

    defaultNullChange = (e) =>{
        const {UserPageActions} = this.props;
        const {name, value} = e.target;
        UserPageActions.changeInput({
          name,
          value,
          form: 'User'  
        });
    }
    handleChange = (e) =>{
    const {UserPageActions} = this.props;
    const {name, value} = e.target;
    UserPageActions.changeInput({
      name,
      value,
      form: 'User'  
    });
    setPassword(this.props.password);
    const validation = validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;
    if( name.indexOf('email') > -1)
        checkEmailExists(value);
     else if(name.indexOf('phone') > -1) 
        checkPhoneExists(value);
}
handleLocalRegister = async () => {
    const{form, UserPageActions, error} = this.props;
    const {email, id,password, passwordConfirm, phone,name,comment,address,gender,birthday} = form.toJS();

    if(error) return; //현재 에러 있는 상태라면 진행 x
    if(!validate['email'](email)
    || !validate['password'](password)
    || !validate['passwordConfirm'](passwordConfirm)
    || !validate['name'](name)
    || !validate['comment'](comment)
    || !validate['phone'](phone)
    || !validate['gender'](gender)
    ){
        //하나라도 실패하면 진행 하지 않음
        return;
    }
    
    try{
        await UserPageActions.modifyUserInfo({
            email,id,password,name,comment,phone,address,gender,birthday
        });
        window.location.href = '/';
        storage.remove('passed');
        } catch(e){
            if(e.response.status === 411)
                setError('조건에 맞는 데이터를 입력해주세요.');
        if(e.response.status === 409)
                setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.');
    }
    }
    render(){
        const {error,form,errorId} = this.props
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender} =form.toJS();
        const {handleChange,handleLocalRegister,defaultNullChange,checkedChange} = this; 
  
                return(
                <AuthContent title='MY PAGE'>
                <InputWithLabel label = "아이디" name="id" placeholder="아이디"
                value = {id}
                disabled/>
                <InputWithLabel label = "비밀번호" name="password" placeholder="비밀번호"
                type="password"
                value={password} onChange={handleChange}
                />
                {
                    errorId === 'password' &&error && <AuthError>{error}</AuthError>
                }  
                <InputWithLabel label = "비밀번호 확인" name="passwordConfirm" placeholder="다시 한번 입력"
                type="password"
                value={passwordConfirm} onChange={handleChange}
                />
                {
                    errorId === 'passwordConfirm' &&error && <AuthError>{error}</AuthError>
                }  
                <InputWithLabel label = "생년월일" name="birthday" 
                type="date" 
                value = {birthday} onChange={defaultNullChange}
                />
                {
                    errorId === 'birthday' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "이메일" name="email" placeholder="timeline@naver.com" 
                type="email"
                defaultValue = {email}
                onChange={handleChange}/>
                {
                    errorId === 'email' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "핸드폰 번호" name="phone" placeholder="010-1234-1234" 
                defaultValue={phone}
                onChange={handleChange}/>
                {
                    errorId === 'phone' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "이름" name="name" placeholder="이름" 
                defaultValue = {name} onChange={handleChange}/>
                {
                    errorId === 'name' &&error && <AuthError>{error}</AuthError>
                } 
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다."
                defaultValue = {comment} onChange={handleChange} /> <br/>
                {
                    errorId === 'comment' &&error && <AuthError>{error}</AuthError>
                } 
                <Label label = "성별"></Label>
                {
                    errorId === 'gender' &&error && <AuthError>{error}</AuthError>
                } 
                <input style ={inputStyle} name= "gender" type="radio" value = {Number('0')} defaultChecked = {Number(gender)} onChange={checkedChange} />여자
                <input style ={inputStyle} name="gender" type="radio" value = {Number('1')} defaultChecked ={Number(gender)}  onChange={checkedChange}/>남자
                <input style ={inputStyle} name="gender" type="radio" value = {Number('2')} defaultChecked ={Number(gender)} onChange={checkedChange} />others
                <InputWithLabel label ="주소" name ="address" placeholder="서울" defaultValue = {address} onChange={defaultNullChange} />
                {
                    errorId === 'address' &&error && <AuthError>{error}</AuthError>
                }              
                <AuthButton onClick={handleLocalRegister}>확인</AuthButton>
                </AuthContent>
            );
        }
}

export default connect(
    (state) => ({
        form: state.userPage.getIn(['User','form']),
        error: state.userPage.getIn(['User','error']),
        errorId: state.auth.getIn(['register','errorId']),
        result: state.userPage.get('result'),
        userPage : state.userPage,
        password : state.userPage.getIn(['User','form','password'])
    }),
    (dispatch)=>({
        UserPageActions : bindActionCreators(userPageActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions,dispatch)
    })
)(UserModify);