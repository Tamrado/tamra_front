import React, {Component} from 'react';
import {AuthContent,InputWithLabel,AuthButton,RightAlignedLink,AuthError,Label} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import {isEmail,isAlphanumeric,isLength} from 'validator';
import debounce from 'lodash/debounce';
import * as userActions from '../../redux/modules/user';
import storage from '../../../CommonFolder/lib/storage';

class Register extends Component{  

    constructor(props) {

        super(props);
        
        this.state = {
        
        file: null
        }
        this.handleFileInput = this.handleFileInput.bind(this);
    }
    setError = (message) => {
        const{AuthActions} = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    checkEmailExists = debounce(async (email) => {
        const { AuthActions } = this.props;
        try{
            await AuthActions.checkEmailExists(email,'null');
            this.setError(null);
        }catch(e){
            this.setError('이미 존재하는 이메일입니다.');
        }
    },300);

    checkIdExists = debounce(async(id)=> {
        const {AuthActions} = this.props;
        try{
            await AuthActions.checkIdExists(id);
                this.setError(null);
            
        } catch (e){
            this.setError('이미 존재하는 아이디입니다.');
        }
    },300);

    checkPhoneExists = debounce(async(phone) => {
        const {AuthActions} = this.props;
        try{
            await AuthActions.checkPhoneExists(phone,'null');
                this.setError(null);
            
        }catch (e){
            this.setError('이미 존재하는 핸드폰 번호입니다.');
        }
    },300);

    validate = {
        email: (value) => {
            if(!isEmail(value)){
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
            id: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, {min:9, max: 15})) {
                this.setError('아이디는 9~15 글자의 알파벳 혹은 숫자로 이루어져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            var passwordRules = /^(?=.*\\d)(?=.*[~`!@#$%\\^&*()-])(?=.*[a-z])(?=.*[A-Z]).{9,12}$/;
            if(new RegExp(passwordRules).test(value)){
                this.setError('비밀번호는 9~12 글자의 알파벳 (대소문자 구분), 숫자, 특수문자로 이루어져야 합니다.');
                return false;
            }
            if(new RegExp(/(\w)\1\1\1/).test(value)){
                this.setError('비밀번호는 같은 문자를 4번 이상 사용할 수 없습니다.');
                return false;
            }
            this.setError(null);
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value){
                this.setError('비밀번호 확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null);
            return true;
        },
        phone: (value)=> {
            if(!new RegExp(/^01(?:0|1|[6-9])-(\d{3}|\d{4})-(\d{4})$/).test(value)){
                this.setError('핸드폰 번호는 01x-xxx(x)-xxxx와 같은 형태로 입력해야 합니다.');
                return false;
            }
            return true;
        },
        comment: (value)=> {
            if(!isLength(value, {min:0, max: 50})){
                this.setError('코멘트는 50자를 넘길 수 없습니다.');
                return false;
            }
            this.setError(null);
            return true;
        },
        name: (value) => {
            if(!isLength(value, {min:1, max: 30})){
                this.setError('이름은 1자 이상 30자 이하여야 합니다.');
                return false;
            }
            this.setError(null);
            return true;
        },
        gender: (value) => {
            if(value == null){
                this.setError('성별은 반드시 입력해야 합니다.');
                return false;
            }
            this.setError(null);
            return true;
        }

    }
    
    componentWillUnmount(){
        const {AuthActions} = this.props;
        AuthActions.initializeForm('register');
    }

    checkedChange = (e) =>{
        const {AuthActions} = this.props;
        const {name, value} = e.target.checked;
        AuthActions.changeInput({
          name,
          value,
          form: 'register'  
        });
    }

    defaultNullChange = (e) =>{
        const {AuthActions} = this.props;
        const {name, value} = e.target;
        AuthActions.changeInput({
          name,
          value,
          form: 'register'  
        });
        
    }

    handleFileInput(e){
            this.setState({
            file: e.target.files[0]
            });
        
      }
    handleChange = (e) =>{
    const {AuthActions} = this.props;
    const {name, value} = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'register'  
    });
    const validation = this.validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;
    if( name.indexOf('email') > -1)
    this.checkEmailExists(value);
    else if(name.indexOf('id') > -1) 
     this.checkIdExists(value); 
     else if(name.indexOf('phone') > -1) 
     this.checkPhoneExists(value);
    
}
handleLocalRegister = async () => {
    const{form, AuthActions, error, history,UserActions} = this.props;
    const {email, id, password, passwordConfirm, phone,name,comment,address,gender,birthday} = form.toJS();
    const formData = new FormData();
    if(this.state.file !== null)
        formData.append('file',this.state.file);
    else
        formData.append('file',null);
    formData.append('userId',id);
    const {validate} = this;

    if(error) return; //현재 에러 있는 상태라면 진행 x
    if(!validate['email'](email)
    || !validate['id'](id)
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
        await AuthActions.localRegister({
            email,id,password,name,comment,phone,address,gender,birthday
        });
    } catch(e){
        if(e.response.status === 411)
            this.setError('조건에 맞는 데이터를 입력해주세요.');
        if(e.response.status === 409)
            this.setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.');
    }
    try{
        await AuthActions.localRegisterImage(
            formData
        );
        const loggedInfo = this.props.result.toJS();
        storage.set('loggedInfo', loggedInfo);
        UserActions.setLoggedInfo(loggedInfo);
        UserActions.setValidated(true);
        history.push('/');
    } catch(e){
        if(e.response.status === 422)
            this.setError('알 수 없는 에러가 발생했습니다.');
        if(e.response.status === 409)
            this.setError('다른 회원의 아이디와 동일합니다. 다시 입력해주세요.');
        if(e.response.status === 411)
            this.setError('조건에 맞는 데이터를 입력해주세요.');
    }
    }
    render(){
        const {error} = this.props;
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender} = this.props.form.toJS();
        const {handleChange,handleLocalRegister,defaultNullChange,handleFileInput,checkedChange} = this;
        return(
            <AuthContent title='회원가입'>
                <InputWithLabel label = "아이디" name="id" placeholder="아이디"
                value = {id}
                onChange={handleChange}/>
                <InputWithLabel label = "비밀번호" name="password" placeholder="비밀번호"
                type="password"
                value={password} onChange={handleChange}
                />
                <InputWithLabel label = "비밀번호 확인" name="passwordConfirm" placeholder="다시 한번 입력"
                type="password"
                value={passwordConfirm} onChange={handleChange}
                />
                <InputWithLabel label = "생년월일" name="birthday" placeholder="****-**-**"
                type="date"
                value = {birthday} onChange={defaultNullChange}
                />
                <InputWithLabel label = "이메일" name="email" placeholder="timeline@naver.com"
                type="email"
                value = {email}
                onChange={handleChange}/>
                <InputWithLabel label = "핸드폰 번호" name="phone" placeholder="010-1234-1234"
                value={phone}
                onChange={handleChange}/>
                <InputWithLabel label = "이름" name="name" placeholder="이름"
                value = {name} onChange={handleChange}/>
                <InputWithLabel label = "코멘트" name="comment" placeholder="반갑습니다."
                value = {comment} onChange={handleChange} /> <br/>
                <Label label = "성별"></Label>
                <input name= "gender" type="radio" value='0' onChange={checkedChange} />여성
                <input name="gender" type="radio" value ={1}  onChange={checkedChange}/>남성
                <input name="gender" type="radio"value={2} onChange={checkedChange} />others
                <InputWithLabel label ="주소" name ="address" placeholder="서울" value = {address} onChange={defaultNullChange} />
                <InputWithLabel label = "프로필 사진" name ="image" type="file" onChange={handleFileInput}></InputWithLabel>
                {
                    error && <AuthError>{error}</AuthError>
                }               
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
        }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register','form']),
        error: state.auth.getIn(['register','error']),
        result: state.auth.get('result')
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch)
    })
)(Register);