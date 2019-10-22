import React, {Component} from 'react';
import UserHead from 'components/User/UserHead';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userPageActions from 'redux/modules/userPage';

class UserHeadContainer extends Component {
    
    getUserInfo = async() => {
        const{UserPageActions} = this.props;
        try{
            UserPageActions.getUserInfo();
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getUserInfo();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.username !== this.props.username){
            this.getUserInfo();
        }
    }
    render(){
        const {username,thumbnail,fetched} = this.props;
        if(!fetched) return null;
        return (
            <UserHead username={username} thumbnail={thumbnail}/>
        );
    
    }
}

export default connect(
    (state) => ({
        thumbnail: state.userPage.getIn(['info','profile','thumbnail']),
        fetched: state.pender.success['userPage/GET_USER_INFO']
    }),
    (dispatch)=> ({
        UserPageActions: bindActionCreators(userPageActions, dispatch)
    })
)(UserHeadContainer);