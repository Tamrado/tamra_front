import React, {Component} from 'react';
import * as authActions from '../../redux/modules/auth';
import UserHead from '../../components/User/UserHead';
import {InputWithLabel,AuthButton,AuthContent,AuthError} from '../../components/Auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../../lib/storage';
import {setAuthActions} from '../Function/setActionModule';
import {setError} from '../Function/ValidateModule';
class UserHeadContainer extends Component {
    componentDidMount(){
        const{AuthActions} = this.props;
        if(!storage.get('loggedInfo')) return;
        setAuthActions(AuthActions);
        let username = storage.get('loggedInfo').username;
        if(username.includes('Kakao')){
            storage.set('passed','true');
            window.location.replace('/@' + username+'/info');
            return;
        }
        AuthActions.getUserInfo(username);
        AuthActions.setUserThumbnail(storage.get('loggedInfo').thumbnail);
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
    handleClick = async() => {
        const{AuthActions,form,username} = this.props;
        const{password} = form.toJS();
        try{
            await AuthActions.checkUserAndGetInfo({password});
            const data = this.props.result.toJS();
            await AuthActions.setUserData({data}); 
            storage.set('passed','true');
        } catch(e){
            console.log(e);
            return setError("비밀번호가 틀렸습니다. 다시 입력해주세요.",'password');
        }
        window.location.href =  '/@' + username+'/info';
        
    } 
    enter = () => {
        if(window.event.keyCode === 13)
        this.handleClick();
    }

    render(){
        const { error } = this.props;
        const {username,thumbnail,fetched,password} = this.props;
        const {handleChange,handleClick,enter} = this;
        if(!fetched) return null;
        return (
            <AuthContent title='MY PAGE'>
            <UserHead username={username} thumbnail={thumbnail}/>
            <InputWithLabel label = "비밀번호 입력" name="password" placeholder="비밀번호"
                type="password"
                value={password} onChange={handleChange} enter={enter}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleClick} >확인</AuthButton>
                
            </AuthContent>

        );
    
    }
}

export default connect(
    (state) => ({
        thumbnail: state.auth.get('thumbnail'),
        error: state.auth.getIn(['register','error']),
        result : state.auth.get('result'),
        fetched: state.pender.success['auth/GET_USER_INFO'],
        form : state.auth.getIn(['register','form']),
        userpage : state.userPage
    }),
    (dispatch)=> ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(UserHeadContainer);