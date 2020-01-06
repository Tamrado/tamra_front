import React, {Component} from 'react';
import Header, {RegisterButton,UserThumbnail,SearchList,Setting} from '../../components/Header';
import {FollowList} from '../../components/FollowMenu';
import {AlarmList} from '../../components/Alarm';
import {connect} from 'react-redux';
import * as userActions from '../../redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import * as friendActions from '../../redux/modules/friend';
import * as searchActions from '../../redux/modules/search';
import * as alarmActions from '../../redux/modules/alarm';
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
        alarmNumVisible : 'none',
        mypageVisible : 'none',
        mVisible : 'none',
        followMenuVisible : 'none',
        alarmMenuVisible : 'none',
        noFriendAddVisible : 'none',
        friendvisible : 'none',
        alarmNonevisible : 'none'
    }

    componentDidMount() {
       this.getFollowRequest();
       this.getAlarm();
    }
    getFollowRequest = () => {
        const {FriendActions,followRequest} = this.props;
        try{
             FriendActions.getFriendAlarmInfo();
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
    getAlarm = () => {
        const {AlarmActions} = this.props;
        try{
             AlarmActions.getAlarmNum();
             AlarmActions.getAlarm();
            const {alarmList} = this.props;
            if(alarmList.size > 0)
            this.setState({ alarmNonevisible : 'block', alarmNumVisible : 'block'});
            else
                this.setState({ alarmNonevisible : 'none', alarmNumVisible : 'block'});
            
            
        }catch(e){
            this.setState({
                alarmNonevisible : 'none',
                alarmNumVisible : 'none'
            });
        }
    }
    setFollowNotificationUnavailable = async(e) => {
        const {FriendActions} = this.props;
        const {id} = e.target;
        try{
            console.log(id);
            await FriendActions.deleteFriendAlarmNotification({'userId' : id});
            this.handleFriendRequestClick();
            this.getFollowRequest();
            
        }catch(e){
            console.log(e);
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
     if(this.state.alarmMenuVisible === 'none')
     this.setState({
         alarmMenuVisible : 'block'
     });
     else
     this.setState({
         alarmMenuVisible : 'none'
     });
    }

    handleFriendRequestClick = () => {
        if(this.state.followMenuVisible === 'none')
        this.setState({
            followMenuVisible : 'block',
            friendvisible : 'block'
        });
        else
        this.setState({
            followMenuVisible : 'none',
            friendvisible : 'none'
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

    handleProfileClick = () => {
        const{username} = this.props;
        window.location.href =`/@:${username}`;
    }

    handleSearchBox = async(e) => {
        const {SearchActions} = this.props;
        const {innerText} = e.target;
        
        await SearchActions.setHeaderContent(innerText);
        const {headerContent} = this.props;
        try{
        await SearchActions.searchInHeader(headerContent,1,5);
        }catch(e){
            SearchActions.setEmptyUserlist();
        }
        await SearchActions.setHeaderVisible('block');
    }

    handleSearchClick = async() => {
        const {SearchActions,page,headerContent} = this.props;
        await SearchActions.searchInHeader(headerContent,page,10);
        await SearchActions.setAddPage();
    }

    handleUserClick = async(e) => {
        window.location.href = `/@:${e.target.id}`;
    }
    handleClickHome = () => {
        window.location.href = '/';
    }

    render(){
    const {visible, user,followRequest,friendRequestNum,headerVisible,
        userList,headerContent,alarmList,alarmNum,userMenuVisible} = this.props;
    const{friendRequestVisible,alarmNumVisible,alarmMenuVisible, friendvisible,alarmNonevisible,
        followMenuVisible,mypageVisible,mVisible,noFriendAddVisible} = this.state;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleMyPageClick
        ,follow,setFollowNotificationUnavailable,handleSearchBox,handleUserClick,handleProfileClick,handleClickHome} = this;
    let content,search,alarm,friendRequest,mypage,menu,menuVisible = null;
    
    if(!visible) return null;
    if(!userMenuVisible) menuVisible='none';
    else menuVisible = 'block';

    if(user.get('logged')){
        content = <UserThumbnail profileClick={handleProfileClick}  username={user.getIn(['loggedInfo','username'])} thumbnail={user.getIn(['loggedInfo','thumbnail'])} />;
        search = <SearchList userclick = {handleUserClick}
         onclick = {handleSearchBox} visible={headerVisible} users={userList} nickname={headerContent}/>;
        alarm = <Setting key={'alarm'} resultvisible = {alarmNumVisible} alarmNum = {alarmNum}image = {alarmImage} size = {'30px'}
         onclick = {handleAlarmClick} hoverimg={hoverAlarmImage} tvisible={alarmMenuVisible}/>;
        
        friendRequest = <Setting key={'friendRequest'} tvisible={friendvisible} resultvisible={friendRequestVisible} image = {friendRequestImage} size ={'30px'}
         onclick = {handleFriendRequestClick} hoverimg={hoverFriendRequestImage} alarmNum = {friendRequestNum}/>;
        
         mypage = <Setting key={'mypage'} tvisible = {'none'}resultvisible={mypageVisible} image = {mypageImage} size = {'35px'} onclick = {handleMyPageClick} hoverimg={hoverMypageImage}/>;
        
         menu = <Setting key={'menu'} left ={'10px'} tvisible = {menuVisible} resultvisible={mVisible} image = {menuImage} size = {'12px'}  hoverimg = {hoverMenuImage} onclick={handleThumbnailClick}/>;
    }
    else{
        content = <RegisterButton/>;
    }
        return(
            
            <Header home={handleClickHome}>
                {search}
                {content}
                {alarm}
                {friendRequest}
                {mypage}
                {menu}
                <AlarmList alarms={alarmList} visible={alarmMenuVisible} alarmvisible={alarmNonevisible}/>
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
        userMenuVisible : state.base.getIn(['userMenu','visible']),
        visible: state.base.getIn(['header', 'visible']),
        menuvisible: state.base.getIn(['userMenu','visible']),
        username: state.user.getIn(['loggedInfo','username']),
        user: state.user,
        followRequest : state.friend.get('alarm'),
        friendRequestNum : state.friend.get('friendRequestNum'),
        headerContent : state.search.get('headerContent'),
        userList : state.search.get('userList'),
        headerVisble : state.search.get('headervisible'),
        alarmList : state.alarm.get('alarmList'),
        alarmNum : state.alarm.get('alarmNum')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch),
        FriendActions : bindActionCreators(friendActions,dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        AlarmActions : bindActionCreators(alarmActions,dispatch)
    })
) (HeaderContainer);