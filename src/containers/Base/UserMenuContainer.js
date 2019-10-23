import React, {Component} from 'react';
import {UserMenuItem,UserMenu, Username} from 'components/Base/UserMenu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import * as userActions from 'redux/modules/user';
import PropTypes from 'prop-types';
import storage from 'lib/storage';

class UserMenuContainer extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    handleSetUserInfo = async() => {
        window.location.href='/member';
    }


    handleLogout = async()=> {
        const {UserActions} = this.props;

        try{
            await UserActions.logout();
        }catch (e){
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href='/';
    }

    render(){
        const{visible, username} = this.props;
        const {handleLogout,handleSetUserInfo} = this;

        if(!visible){
            return null;
        }
        return (
            <UserMenu>
                <Username username={username}/>
                <UserMenuItem onClick={handleSetUserInfo}>설정</UserMenuItem>
                <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
                </UserMenu>
        );
    }
}

export default connect(

    (state) => ({
        visible : state.base.getIn(['userMenu','visible']),
        username: state.user.getIn(['loggedInfo','username'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(UserMenuContainer);