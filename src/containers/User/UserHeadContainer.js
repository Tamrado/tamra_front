import React, {Component} from 'react';

import UserHead from '../../components/User/UserHead';
import {InputWithLabel,AuthButton,AuthContent,AuthError} from '../../components/Auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userPageActions from '../../redux/modules/userPage';
import storage from '../../lib/storage';

class UserHeadContainer extends Component {
    componentDidMount(){
        if(!storage.get('loggedInfo')) return;
        let username = storage.get('loggedInfo').username;
        if(username.includes('Kakao')){
            storage.set('passed','true');
            window.location.replace('/@' + username+'/info');
        }
        this.getUserInfo();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.username !== this.props.username){
            this.getUserInfo();
        }
    }
    
    getUserInfo = async() => {
        const{UserPageActions, username} = this.props;
        try{
            await UserPageActions.getUserInfo(username);
            const info = this.props.result.toJS();
            await UserPageActions.setUserInfo(info);
        }catch(e){
            console.log(e);
        }
        
    }

    setError = (message) => {
        const {UserPageActions} = this.props;
        UserPageActions.setError({
            form : 'User',
            message
        });
        return false;
    }

    handleChange = (e) =>{
        const {UserPageActions} = this.props;
        const {name, value} = e.target;
        UserPageActions.changeInput({
            name,
            value,
            form: 'User'  
        });
    }
    handleClick = async() => {
        const{UserPageActions,form,username} = this.props;
        const{password} = form.toJS();
        try{
            await UserPageActions.checkUserAndGetInfo({password});
            const data = this.props.result.toJS();
            await UserPageActions.setUserData({data}); 
            storage.set('passed','true');
        } catch(e){
            console.log(e);
            return this.setError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
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
        thumbnail: state.userPage.getIn(['info','thumbnail']),
        error: state.userPage.getIn(['User','error']),
        result : state.userPage.get('result'),
        fetched: state.pender.success['userPage/GET_USER_INFO'],
        form : state.userPage.getIn(['User','form']),
        userpage : state.userPage
    }),
    (dispatch)=> ({
        UserPageActions: bindActionCreators(userPageActions, dispatch)
    })
)(UserHeadContainer);