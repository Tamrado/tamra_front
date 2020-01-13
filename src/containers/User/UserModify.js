import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,AuthError,Label} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as userPageActions from '../../redux/modules/userPage';
import {isEmail,isLength} from 'validator';
import debounce from 'lodash/debounce';
import * as userActions from '../../redux/modules/user';
import * as authActions from '../../redux/modules/auth';
import storage from '../..//lib/storage';


class UserModify extends Component{ 
 
    setError = (message,id) => {
        const{AuthActions,UserPageActions} = this.props;
        
        AuthActions.setErrorId({form: 'register',id});
        UserPageActions.setError({
            form: 'User',
            message
        });
    }
        

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
            window.location.href = '/@' + username+ "/password";
        }
    }

    componentDidMount(){
        this.checkIfUserPassed();
        this.initialModifyInfo();
    }
    componentWillUnmount(){
        const {UserPageActions} = this.props;
        UserPageActions.initializeForm('User');
        
    }

    checkEmailExists = debounce(async (email) => {
        const { UserPageActions,username } = this.props;
        try{
            await UserPageActions.checkEmailExists(email,username);
            if(this.props.result.get('issue')!== null) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        }catch(e){
            console.log(e);
        }
    },300);


    checkPhoneExists = debounce(async(phone) => {
        const {UserPageActions,username} = this.props;
        try{
            await UserPageActions.checkPhoneExists(phone,username);
            if(this.props.result.get('issue')!== null){
                this.setError('이미 존재하는 핸드폰 번호입니다.');
            } else {
                this.setError(null);
            } 
        }catch (e){
                console.log(e);
        }
    },300);

    validate = {
        email: (value) => {
            if(!isEmail(value)){
                this.setError('잘못된 이메일 형식 입니다.','email');
                return false;
            }
            return true;
        },
        password: (value) => {
            
            if(!new RegExp(/^(?=.*\d)(?=.*[~`!@#$%\\^&*()-])(?=.*[a-z])(?=.*[A-Z]).{9,12}$/).test(value)){
                this.setError('비밀번호는 8~12 글자의 알파벳 (대소문자 구분), 숫자, 특수문자로 이루어져야 합니다.','password');
                return false;
            }
            else if(new RegExp(/(\w)\1\1\1/).test(value)){
                this.setError('비밀번호는 같은 문자를 4번 이상 사용할 수 없습니다.','password');
                return false;
            }
            this.setError(null);
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value){
                this.setError('비밀번호 확인이 일치하지 않습니다.','passwordConfirm');
                return false;
            }
            this.setError(null);
            return true;
        },
        phone: (value)=> {
            if(!new RegExp(/^01(?:0|1|[6-9])-(\d{3}|\d{4})-(\d{4})$/).test(value)){
                this.setError('핸드폰 번호는 01x-xxx(x)-xxxx와 같은 형태로 입력해야 합니다.','phone');
                return false;
            }
            return true;
        },
        comment: (value)=> {
            if(!isLength(value, {min:0, max: 50})){
                this.setError('코멘트는 50자를 넘길 수 없습니다.','comment');
                return false;
            }
            this.setError(null);
            return true;
        },
        name: (value) => {
            if(!isLength(value, {min:1, max: 30})){
                this.setError('이름은 1자 이상 30자 이하여야 합니다.','name');
                return false;
            }
            this.setError(null);
            return true;
        },
        gender: (value) => {
            if(value == null){
                this.setError('성별은 반드시 입력해야 합니다.','gender');
                return false;
            }
            this.setError(null);
            return true;
        }

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
    const validation = this.validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;
    if( name.indexOf('email') > -1)
    this.checkEmailExists(value);
     else if(name.indexOf('phone') > -1) 
     this.checkPhoneExists(value);
}
handleLocalRegister = async () => {
    const{form, UserPageActions, error, history} = this.props;
    const {email, id,password, passwordConfirm, phone,name,comment,address,gender,birthday} = form.toJS();
    const {validate} = this;

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
            this.setError('조건에 맞는 데이터를 입력해주세요.');
        if(e.response.status === 409)
            this.setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.');
    }
    }
    render(){
        const inputStyle = {
            width: '15%',
            left: '5%',
            position: 'relative',
    outline: 'none',
    borderRadius: '0px',
    lineHeight: '2.5rem',
    fontSize: '1.2rem',
    paddingLeft: '0.5rem',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    paddingRight: '1rem',
    marginRight : '1rem'
        }
        const {error,form,errorId} = this.props
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender} =form.toJS();
        const {handleChange,handleLocalRegister,defaultNullChange,handleFileInput,checkedChange} = this; 
  
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
        userPage : state.userPage
    }),
    (dispatch)=>({
        UserPageActions : bindActionCreators(userPageActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions,dispatch)
    })
)(UserModify);