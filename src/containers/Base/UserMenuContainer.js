import React, {Component} from 'react';
import {UserMenuItem,UserMenu, Username} from '../../components/UserMenu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../../redux/modules/base';
import * as userActions from '../../redux/modules/user';
import * as postActions from '../../redux/modules/post';
import {PostPopup} from '../../components/Popup';
import PropTypes from 'prop-types';
import storage from '../../lib/storage';
class UserMenuContainer extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    handleLogoutButtonClick = () => {
        const {PostActions} = this.props;
        PostActions.setPostPopupDisplay('block');
        PostActions.setPopupText('로그아웃하시겠습니까?');
    }

    handleLogout = async()=> {
        const {UserActions} = this.props;

        try{
            await UserActions.logout();
        }catch (e){
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href='/auth/Login';
    }
    handleCancel = async() => {
        const {PostActions,BaseActions} = this.props;
        PostActions.setPostPopupDisplay('none');
        BaseActions.setUserMenuVisibility('none');
    }

    render(){
        const{visible, username,BaseActions,postPopupDisplay,popupText} = this.props;
        const {handleLogout,handleLogoutButtonClick,handleCancel} = this;

        if(visible === 'none'){
            return null;
        }
        else {
            BaseActions.setFollowMenuVisible('none');
            BaseActions.setAlarmMenuVisible('none');
        }
        return (
            <div>
            <UserMenu>
                <Username username={username}/>
                <UserMenuItem onClick={handleLogoutButtonClick}>로그아웃</UserMenuItem>
                </UserMenu>
            <PostPopup handleOk={handleLogout} right={'40%'} handleCancel={handleCancel}
             text={popupText} display={postPopupDisplay} />
                </div>
        );
    }
}

export default connect(

    (state) => ({
        visible : state.base.get('userMenuVisible'),
        username: state.user.getIn(['loggedInfo','username']),
        display : state.post.get('popupDisplay'),
        postPopupDisplay : state.post.get('postPopupDisplay'),
        popupText : state.post.get('popupText')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        PostActions : bindActionCreators(postActions, dispatch)
    })
)(UserMenuContainer);