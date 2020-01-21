import React, {Component} from 'react';
import {SearchButton,Header} from '../../components/Header/Header';
import {RegisterButton,UserThumbnail,SearchList,Setting} from '../../components/Header';
import {FollowList} from '../../components/FollowMenu';
import {AlarmList} from '../../components/Alarm';
import {connect} from 'react-redux';
import * as userActions from '../../redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import * as friendActions from '../../redux/modules/friend';
import * as searchActions from '../../redux/modules/search';
import * as alarmActions from '../../redux/modules/alarm';
import {bindActionCreators} from 'redux';
import UserMenuContainer from './UserMenuContainer';
import menuImage from '../../build/static/images/iconmonstr-arrow-80-24.png';
import alarmImage from '../../build/static/images/iconmonstr-bell-thin-32.png';
import friendRequestImage from '../../build/static/images/iconmonstr-user-29-32.png';
import mypageImage from '../../build/static/images/iconmonstr-gear-10-32.png';
import hoverMenuImage from '../../build/static/images/iconmonstr-arrow-80-12.png';
import hoverAlarmImage from '../../build/static/images/iconmonstr-bell-thin-32 (1).png';
import hoverFriendRequestImage from '../../build/static/images/iconmonstr-user-29-32 (1).png';
import hoverMypageImage from '../../build/static/images/iconmonstr-gear-10-32 (1).png';
import {setAlarmActions,setAlarmTime} from '../Function/AlarmModule';
class HeaderContainer extends Component {
    componentDidMount() {
        setAlarmActions(alarmActions);
        this.getFollowRequest();
        this.getAlarm();
    }
    getFollowRequest = async() => {
        const {FriendActions} = this.props;
        try{
            await FriendActions.getFriendAlarmInfo();
        this.setState({
                friendRequestVisible : 'block',
                noFriendAddVisible : 'none'
            });
        }catch(e){
            this.setState({
                friendRequestVisible : 'none',
                noFriendAddVisible : 'block'
            });
            return;
        }
    }
    
    getAlarm = async () => {
        const {AlarmActions} = this.props;
        try{
            await Promise.all([AlarmActions.getAlarmNum(),AlarmActions.getAlarm()]);
            const {alarmList,alarmNum} = this.props;
            await setAlarmTime(alarmList);
            if(alarmList.size > 0)
            this.setState({ alarmNonevisible : 'none'});
            else
                this.setState({ alarmNonevisible : 'block'});
            if(alarmNum > 0)
                this.setState({alarmNumVisible : 'block'});
            else
                this.setState({alarmNumVisible: 'none'});
            
        }catch(e){
            this.setState({
                alarmNonevisible : 'block',
                alarmNumVisible : 'none'
            });
        }
    }
    setFollowNotificationUnavailable = async(e) => {
        const {FriendActions} = this.props;
        const {id} = e.target;
        try{
            await FriendActions.deleteFriendAlarmNotification({'userId' : id});
            this.handleFriendRequestClick();
            this.getFollowRequest();
            
        }catch(e){
            return;
        }
    }
    handleThumbnailClick = () => {
        const {BaseActions,userMenuVisible} = this.props;
        if(userMenuVisible === 'none')
            BaseActions.setUserMenuVisibility('block');
        
        else BaseActions.setUserMenuVisibility('none');
    }

    handleAlarmClick = () => {
        const{BaseActions,alarmMenuVisible} = this.props;
     if(alarmMenuVisible === 'none'){
        BaseActions.setAlarmMenuVisible('block');
        BaseActions.setFollowMenuVisible('none');
        BaseActions.setUserMenuVisibility('none');
    }
     else
        BaseActions.setAlarmMenuVisible('none');
    }

    handleFriendRequestClick = () => {
        const{BaseActions,followMenuVisible} = this.props;
        if(followMenuVisible === 'none'){
            BaseActions.setAlarmMenuVisible('none');
        BaseActions.setFollowMenuVisible('block');
        BaseActions.setUserMenuVisibility('none');
    }
        else
        BaseActions.setFollowMenuVisible('none');
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
        await SearchActions.setEmptyUserlist();
        await SearchActions.setAddPage();
    }

    handleUserClick = async(e) => {
        window.location.href = `/@:${e.target.id}`;
    }
    handleClickHome = () => {
        window.location.href = '/';
    }
    handleAllRead = async() => {
        const {AlarmActions,BaseActions} = this.props;
        await AlarmActions.setAllReadAlarm();
        await this.getAlarm();
        BaseActions.setAlarmMenuVisible('none');

    }

    render(){
    const {visible, user,followRequest,friendRequestNum,headerVisible,alarmMenuVisible,
        userList,headerContent,alarmList,alarmNum,userMenuVisible,followMenuVisible,friendRequestVisible,alarmNumVisible
        ,alarmNonevisible,noFriendAddVisible} = this.props;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleMyPageClick
        ,follow,setFollowNotificationUnavailable,handleSearchBox,handleUserClick,handleProfileClick,
        handleClickHome,handleAllRead,handleAlarmInfoClick} = this;
    let content,search,alarm,friendRequest,mypage,menu,searchButton = null;
    
    if(!visible) return null;

    if(user.get('logged')){
        content = <UserThumbnail profileClick={handleProfileClick}  username={user.getIn(['loggedInfo','username'])} thumbnail={user.getIn(['loggedInfo','thumbnail'])} />;
        search = <SearchList userclick = {handleUserClick}
         onclick = {handleSearchBox} visible={headerVisible} users={userList} />;
        alarm = <Setting key={'alarm'} resultvisible = {alarmNumVisible} alarmNum = {alarmNum}image = {alarmImage} size = {'30px'}
         onclick = {handleAlarmClick} hoverimg={hoverAlarmImage} tvisible={alarmMenuVisible}/>;
        searchButton = <SearchButton onClick={()=>{window.location.href=`/search/${headerContent}`}}/>
        friendRequest = <Setting key={'friendRequest'} tvisible={followMenuVisible} resultvisible={friendRequestVisible} image = {friendRequestImage} size ={'30px'}
         onclick = {handleFriendRequestClick} hoverimg={hoverFriendRequestImage} alarmNum = {friendRequestNum}/>;
        
         mypage = <Setting key={'mypage'} tvisible = {'none'}resultvisible={'none'} image = {mypageImage} size = {'35px'} onclick = {handleMyPageClick} hoverimg={hoverMypageImage}/>;
        
         menu = <Setting key={'menu'} left ={'10px'} tvisible = {userMenuVisible} resultvisible={'none'} image = {menuImage} size = {'12px'}  hoverimg = {hoverMenuImage} onclick={handleThumbnailClick}/>;
    }
    else{
        content = <RegisterButton/>;
    }
        return(
            
            <Header home={handleClickHome}>
                {search}
                {searchButton}
                {content}
                {alarm}
                {friendRequest}
                {mypage}
                {menu}
                <AlarmList alarms={alarmList} visible={alarmMenuVisible} alarmvisible={alarmNonevisible}
                handleAllRead={handleAllRead} handleAlarmInfoClick={handleAlarmInfoClick}/>
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
        userMenuVisible : state.base.get('userMenuVisible'),
        visible: state.base.getIn(['header', 'visible']),
        username: state.user.getIn(['loggedInfo','username']),
        user: state.user,
        followRequest : state.friend.get('alarm'),
        friendRequestNum : state.friend.get('friendRequestNum'),
        headerContent : state.search.get('headerContent'),
        userList : state.search.get('userList'),
        headerVisble : state.search.get('headervisible'),
        alarmList : state.alarm.get('alarmList'),
        alarmNum : state.alarm.get('alarmNum'),
        followMenuVisible : state.base.get('followMenuVisible'),
        alarmMenuVisible : state.base.get('alarmMenuVisible'),
        
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch),
        FriendActions : bindActionCreators(friendActions,dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        AlarmActions : bindActionCreators(alarmActions,dispatch)
    })
) (HeaderContainer);