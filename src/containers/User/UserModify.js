import React, {Component} from 'react';
import {ModifyComponent} from '../../components/User';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../redux/modules/user';
import * as authActions from '../../redux/modules/auth';
import * as postActions from '../../redux/modules/post';
import storage from '../..//lib/storage';
import {setAuthAction,setUserActions,setPostActions,handleRegister,handleChange} from '../Function/SignModule';
import {setError,setAuthActions} from '../Function/ValidateModule';
import {Popup} from '../../components/Popup';

class UserModify extends Component{        

    componentDidMount(){
        const{AuthActions,PostActions,UserActions} = this.props;
        setAuthAction(AuthActions);
        setAuthActions(AuthActions);
        setPostActions(PostActions);
        setUserActions(UserActions);
        this.checkIfUserPassed();
        this.initialModifyInfo();
        
    }
    checkIfUserPassed = () => {
        const{username} = this.props;
        if(!storage.get('passed')) window.location.href = '/@' + username+ "/password";
        else storage.remove('passed');
    }
    
    initialModifyInfo = async() => {
        const{AuthActions,username} = this.props;
        try{
        await AuthActions.checkUserAndGetUser();
        const user = this.props.result.toJS();
        await AuthActions.setUserData({form:'register',data:user});
        if(this.props.gender === null)
            await AuthActions.setGender(0);
        }
        catch(e){
            storage.remove('passed');
            window.location.replace('/@' + username+ "/password");
        }
    }

    enterRegister = () => {
        if(window.event.keyCode === 13)
          this.handleLocalRegister();
    }
    
    handleLocalRegister = async() => {
        const{form,error} = this.props;
        try{
        await handleRegister('modify',form.toJS(),error);
        }catch(e){
            setError('다시 클릭해주세요.','main');
        }
    }

    handlePopupOk = () => {
        const{PostActions} = this.props;
        PostActions.setPopupDisplay('none');
        window.location.replace('/');
    }
    render(){
        const {error,form,errorId,popupDisplay} = this.props
        const {id,password,passwordConfirm,email,name,phone,birthday,comment,address,gender} =form.toJS();
        const {handleLocalRegister,handlePopupOk,enterRegister} = this; 
            return(
                <div>
                <ModifyComponent error={error} errorId = {errorId} id = {id} password={password} 
            passwordConfirm = {passwordConfirm} email={email} name={name} phone={phone} birthday={birthday}
            comment={comment} address={address} handleChange={handleChange} handleLocalRegister={handleLocalRegister}
             gender={gender} enterRegister={enterRegister}/>
                <Popup handlePopupOk = {handlePopupOk} right={'40%'} top = {'100px'} display={popupDisplay} text={'수정이 완료었습니다.'} />
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
        userPage : state.auth,
        pw : state.auth.getIn(['register','form','password']),
        popupDisplay : state.post.get('popupDisplay'),
        gender : state.auth.getIn(['register','form','gender'])
    }),
    (dispatch)=>({
        UserActions : bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch)
    })
)(UserModify);