import React, {Component} from 'react';
import Header, {RegisterButton,UserThumbnail,FriendSearch,Setting} from '../../components/Base/Header';
import {connect} from 'react-redux';
import * as userActions from '../../../Auth/redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import {bindActionCreators} from 'redux';
import menuImage from '../../../build/static/images/iconmonstr-arrow-80-24.png';
import alarmImage from '../../../build/static/images/iconmonstr-bell-thin-32.png';
import friendRequestImage from '../../../build/static/images/iconmonstr-user-29-32.png';
import mypageImage from '../../../build/static/images/iconmonstr-gear-10-32.png';
import hoverMenuImage from '../../../build/static/images/iconmonstr-arrow-80-12.png';
import hoverAlarmImage from '../../../build/static/images/iconmonstr-bell-thin-32 (1).png';
import hoverFriendRequestImage from '../../../build/static/images/iconmonstr-user-29-32 (1).png';
import hoverMypageImage from '../../../build/static/images/iconmonstr-gear-10-32 (1).png';
import UserMenuContainer from './UserMenuContainer';
class HeaderContainer extends Component {

    handleThumbnailClick = () => {
        const {BaseActions,menuvisible} = this.props;
        if(!menuvisible)BaseActions.setUserMenuVisibility(true);
        else BaseActions.setUserMenuVisibility(false);
    }

    handleAlarmClick = () => {
        
    }

    handleFriendRequestClick = () => {

    }
    handleMyPageClick = () => {
        const {username} = this.props;
        window.location.href = '/@' + username+'/password';
    }
    handleMenuClick = () => {

    }

    render(){
    const {visible, user} = this.props;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleMenuClick,handleMyPageClick} = this;
    let content,search,alarm,friendRequest,mypage,menu = null;

    if(!visible) return null;

    if(user.get('logged')){
        content = <UserThumbnail thumbnail={user.getIn(['loggedInfo','thumbnail'])} />;
        search = <FriendSearch/>;
        alarm = <Setting image = {alarmImage} size = {'30px'} onclick = {handleAlarmClick} hoverimg={hoverAlarmImage}/>;
        friendRequest = <Setting image = {friendRequestImage} size ={'30px'} onclick = {handleFriendRequestClick} hoverimg={hoverFriendRequestImage}/>;
        mypage = <Setting image = {mypageImage} size = {'35px'} onclick = {handleMyPageClick} hoverimg={hoverMypageImage}/>;
        menu = <Setting image = {menuImage} size = {'12px'}  hoverimg = {hoverMenuImage} onclick={handleThumbnailClick}/>;
    }
    else{
        content = <RegisterButton/>;
    }
        return(
            
            <Header>
                {search}
                {content}
                {alarm}
                {friendRequest}
                {mypage}
                {menu}
                <UserMenuContainer eventTypes="click"/>
           </Header>
            
        
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        menuvisible: state.base.getIn(['userMenu','visible']),
        username: state.user.getIn(['loggedInfo','username']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch)
    })
) (HeaderContainer);