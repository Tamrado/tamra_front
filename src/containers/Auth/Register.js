import React, {Component} from 'react';
import {RegisterComponent} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import storage from '../../lib/storage';
import {setError,validate,checkEmailExists,checkIdExists,checkPhoneExists,
    setAuthActions,setPassword} from '../Function/ValidateModule';

class Register extends Component{  
        state = {
        file: null
        }
    
    componentWillUnmount(){
        const {AuthActions} = this.props;
        AuthActions.initializeForm('register');
    }
    componentDidMount(){
        const {AuthActions} = this.props;
        setAuthActions(AuthActions);
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

    handleFileInput=(e)=>{
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
    setPassword(this.props.password);
    const validation = validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;
    if( name.indexOf('email') > -1)
        checkEmailExists(value);
    else if(name.indexOf('id') > -1) 
        checkIdExists(value); 
     else if(name.indexOf('phone') > -1) 
        checkPhoneExists(value);
    
}
handleLocalRegister = async() => {
    const{form, AuthActions, error, history,UserActions} = this.props;
    const {email, id, password, passwordConfirm, phone,name,comment,address,gender,birthday} = form.toJS();
    const formData = new FormData();
    if(this.state.file !== null)
        formData.append('file',this.state.file);
    else
        formData.append('file',null);
    formData.append('userId',id);

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
            setError('조건에 맞는 데이터를 입력해주세요.');
        if(e.response.status === 409)
            setError('다른 회원과 일치하는 데이터가 있습니다. 다시 입력해주세요.');
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
            setError('알 수 없는 에러가 발생했습니다.');
        if(e.response.status === 409)
            setError('다른 회원의 아이디와 동일합니다. 다시 입력해주세요.');
        if(e.response.status === 411)
            setError('조건에 맞는 데이터를 입력해주세요.');
    }
    }
    enterRegister = () => {
        if(window.event.keyCode === 13)
          this.handleLocalRegister();
    }
    render(){
        const {error,errorId} = this.props;
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address} = this.props.form.toJS();
        const {handleChange,handleLocalRegister,defaultNullChange,handleFileInput,checkedChange,enterRegister} = this;
        return(
            <RegisterComponent error={error} errorId = {errorId} id = {id} password={password} 
            passwordConfirm = {passwordConfirm} email={email} name={name} phone={phone} birthday={birthday}
            comment={comment} address={address} handleChange={handleChange} handleLocalRegister={handleLocalRegister}
            defaultNullChange={defaultNullChange} handleFileInput={handleFileInput} checkedChange={checkedChange}
            enterRegister={enterRegister}/>
        );
        }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register','form']),
        error: state.auth.getIn(['register','error']),
        errorId: state.auth.getIn(['register','errorId']),
        result: state.auth.get('result'),
        password : state.auth.getIn(['register','form','password'])
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch)
    })
)(Register);