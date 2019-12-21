import React, {Component} from 'react';
import Header, {RegisterButton,UserThumbnail,FriendSearch,Setting} from '../../components/Header';
import {FollowList} from '../../components/FollowMenu';
import {connect} from 'react-redux';
import * as userActions from '../../redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import * as friendActions from '../../redux/modules/friend';
import {bindActionCreators} from 'redux';
import menuImage from '../../build/static/images/iconmonstr-arrow-80-24.png';
import alarmImage from '../../build/static/images/iconmonstr-bell-thin-32.png';
import friendRequestImage from '../../build/static/images/iconmonstr-user-29-32.png';
import mypageImage from '../../build/static/images/iconmonstr-gear-10-32.png';
import hoverMenuImage from '../../build/static/images/iconmonstr-arrow-80-12.png';
import hoverAlarmImage from '../../build/static/images/iconmonstr-bell-thin-32 (1).png';
import hoverFriendRequestImage from '../../build/static/images/iconmonstr-user-29-32 (1).png';
import hoverMypageImage from '../../build/static/images/iconmonstr-gear-10-32 (1).png';
import UserMenuContainer from './UserMenuContainer';
class HeaderContainer extends Component {

    state = {
        friendRequestVisible : 'none',
        alarmVisble : 'none',
        mypageVisible : 'none',
        mVisible : 'none',
        followMenuVisible : 'none',
        alarmMenuVisible : 'none',
        noFriendAddVisible : 'none'
    }

    componentDidMount() {
       this.getFollowRequest();
    }
    getFollowRequest = async() => {
        const {FriendActions,followRequest} = this.props;
        try{
            await FriendActions.getFriendAlarmInfo();
        this.setState({
                friendRequestVisible : 'block',
                noFriendAddVisible : 'none'
            });
        }catch(e){
            console.log(e);
            this.setState({
                friendRequestVisible : 'none',
                noFriendAddVisible : 'block'
            });
            return;
        }
        
    }
    setFollowNotificationUnavailable = async(e) => {
        const {FriendActions} = this.props;
        const {id} = e.target;
        try{
            await FriendActions.deleteFriendAlarmNotification(id);
            this.handleFriendRequestClick();
            await this.getFollowRequest();
            
        }catch(e){
            return;
        }
    }
    handleThumbnailClick = () => {
        const {BaseActions,menuvisible} = this.props;
        if(!menuvisible)
            BaseActions.setUserMenuVisibility(true);
        
        else BaseActions.setUserMenuVisibility(false);
    }

    handleAlarmClick = () => {
        
    }

    handleFriendRequestClick = () => {
        if(this.state.followMenuVisible === 'none')
        this.setState({
            followMenuVisible : 'visible'
        });
        else
        this.setState({
            followMenuVisible : 'none'
        });
    }
    handleMyPageClick = () => {
        const {username} = this.props;
        window.location.href = '/@' + username+'/password';
    }
    follow = (e) => {
        const {FriendActions} = this.props;
        const {id} = e.target;
        try{
        FriendActions.follow(id);
        this.handleFriendRequestClick();
        window.location.reload();
        }catch(e){
            return;
        }
    }

    render(){
    const {visible, user,followRequest,friendRequestNum,alarmRequestNum} = this.props;
    const{friendRequestVisible,alarmVisble,alarmMenuVisible,
        followMenuVisible,mypageVisible,mVisible,noFriendAddVisible} = this.state;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleMyPageClick
        ,follow,setFollowNotificationUnavailable} = this;
    let content,search,alarm,friendRequest,mypage,menu = null;

    if(!visible) return null;

    if(user.get('logged')){
        content = <UserThumbnail thumbnail={user.getIn(['loggedInfo','thumbnail'])} />;
        search = <FriendSearch/>;
        alarm = <Setting resultvisible = {alarmVisble} image = {alarmImage} size = {'30px'}
         onclick = {handleAlarmClick} hoverimg={hoverAlarmImage}/>;
        
        friendRequest = <Setting resultvisible={friendRequestVisible} image = {friendRequestImage} size ={'30px'}
         onclick = {handleFriendRequestClick} hoverimg={hoverFriendRequestImage} alarmNum = {friendRequestNum}/>;
        
         mypage = <Setting resultvisible={mypageVisible} image = {mypageImage} size = {'35px'} onclick = {handleMyPageClick} hoverimg={hoverMypageImage}/>;
        
         menu = <Setting resultvisible={mVisible} image = {menuImage} size = {'12px'}  hoverimg = {hoverMenuImage} onclick={handleThumbnailClick}/>;
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
                <FollowList friend = {followRequest} deleteclick={setFollowNotificationUnavailable}
                follow = {follow} visible = {followMenuVisible} result={friendRequestVisible} 
                friendvisible = {noFriendAddVisible} />
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
        user: state.user,
        followRequest : state.friend.get('alarm'),
        friendRequestNum : state.friend.get('friendRequestNum')
        
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch),
        FriendActions : bindActionCreators(friendActions,dispatch)
    })
) (HeaderContainer);