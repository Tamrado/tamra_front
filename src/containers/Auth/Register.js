import React, {Component} from 'react';
import {RegisterComponent} from '../../components/Auth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import {setAuthActions,setError} from '../Function/ValidateModule';
import {handleChange,setAuthAction,setPostActions,handleRegister,
    registerNextPhase,makeFormData, setUserActions} from '../Function/SignModule';
    import * as postActions from '../../redux/modules/post';
    import {Popup} from '../../components/Popup';
class Register extends Component{  
        state = {
        file: null
        }
    
    componentWillUnmount(){
        const {AuthActions} = this.props;
        AuthActions.initializeForm('register');
    }
    componentDidMount(){
        const {AuthActions,PostActions,UserActions} = this.props;
        setAuthActions(AuthActions);
        setAuthAction(AuthActions);
        setPostActions(PostActions);
        setUserActions(UserActions);
    }

    handleFileInput=(e)=>{
            this.setState({
            file: e.target.files[0]
            });
        
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
        await Promise.all([makeFormData(this.state.file,form.toJS().id),handleRegister('register',form.toJS(),error)]);
        registerNextPhase(this.props.result);
        }catch(e){
           setError('다시 클릭해주세요.','main');
        }
    }
    render(){
        const {error,errorId,popupDisplay} = this.props;
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address} = this.props.form.toJS();
        const {handleLocalRegister,handleFileInput,enterRegister,handlePopupOk} = this;
        return(
            <div>
            <RegisterComponent error={error} errorId = {errorId} id = {id} password={password} 
            passwordConfirm = {passwordConfirm} email={email} name={name} phone={phone} birthday={birthday}
            comment={comment} address={address} handleChange={handleChange} handleLocalRegister={handleLocalRegister}
             handleFileInput={handleFileInput} enterRegister={enterRegister}/>
            <Popup right={'40%'} top = {'200px'} handlePopupOk = {handlePopupOk} display={popupDisplay} text={'회원가입이 완료었습니다.'} />
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
        password : state.auth.getIn(['register','form','password']),
        popupText : state.post.get('popupText'),
        popupId : state.post.get('popupId'),
        popupDisplay : state.post.get('popupDisplay')
    }),
    (dispatch)=>({
        AuthActions : bindActionCreators(authActions,dispatch),
        UserActions : bindActionCreators(userActions, dispatch),
        PostActions : bindActionCreators(postActions,dispatch)
    })
)(Register);