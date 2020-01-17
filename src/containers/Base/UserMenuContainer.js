import React, {Component} from 'react';
import {UserMenuItem,UserMenu, Username} from '../../components/UserMenu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../../redux/modules/base';
import * as userActions from '../../redux/modules/user';
import * as postActions from '../../redux/modules/post';
import {handleLogout,setUserActions} from '../Function/SignModule';
import {PostPopup} from '../../components/Popup';
import PropTypes from 'prop-types';
class UserMenuContainer extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount=()=>{
        setUserActions(this.props.UserActions);

    }
    handleLogoutButtonClick = (e) => {
        const {PostActions} = this.props;
        const{id} = e.target;
        PostActions.setPostPopupDisplay('block');
        PostActions.setPopupText('로그아웃하시겠습니까?');
        PostActions.setPopupCategory(id);
    }

    
    handleCancel = async() => {
        const {PostActions,BaseActions} = this.props;
        PostActions.setPostPopupDisplay('none');
        BaseActions.setUserMenuVisibility('none');
    }

    render(){
        const{visible, username,BaseActions,postPopupDisplay,popupText} = this.props;
        const {handleLogoutButtonClick,handleCancel} = this;

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
                <UserMenuItem item={'logout'} onClick={handleLogoutButtonClick}>로그아웃</UserMenuItem>
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