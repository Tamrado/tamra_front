import React, {Component} from 'react';
import {Header} from '../../components/Header/Header';
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
import {setAlarmActions,setSearchActions,setFriendActions,setBaseActions} from '../Function/setActionModule';
import {setUserAndRender,setHeaderVisible,setFriendRequestNum,setUserList,setHeaderContent,setAlarmNum,content,search,alarm,friendRequest,mypage,menu,searchButton,
    setuserMenuVisible,setAlarmNumVisible,setHandleThumbnailClick,setHandleAlarmClick,setHandleFriendRequestClick,
setalarmMenuVisible,setfriendRequestVisible,setfollowMenuVisible} from '../Function/HeaderComponent';
import {setAlarmTime,thumbnailClick,setUsername,alarmClick,setUserMenuVisible,setAlarmMenuVisible,
    setFollowMenuVisible,follow,setFollowNotificationUnavailable,friendRequestClick,handleClickHome,getFollowRequest} from '../Function/HeaderModule';
class HeaderContainer extends Component {
    componentDidMount= async()=> {
        const{AlarmActions,SearchActions,FriendActions,BaseActions} = this.props;
        setAlarmActions(AlarmActions);
        setSearchActions(SearchActions);
        setFriendActions(FriendActions);
        setBaseActions(BaseActions);
        await getFollowRequest();
        await this.getAlarm();
        setUsername(this.props.username);
        this.timerId = setInterval(
            ()=>this.getAlarm(),60000);
        this.timer = setInterval(
            ()=>getFollowRequest(),60000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
        clearInterval(this.timer);
	}
    getAlarm = async() => {
        const {AlarmActions} = this.props;
        try{
            await Promise.all([AlarmActions.getAlarmNum(),AlarmActions.getAlarm()]);
            const{alarmList,alarmNum} = this.props;
            await setAlarmTime(alarmList);
            if(alarmList.size > 0)
                AlarmActions.setAlarmNoneVisible('none');
            else
                AlarmActions.setAlarmNoneVisible('block');
            if(alarmNum > 0)
                AlarmActions.setAlarmNumVisible('block');
            else
                AlarmActions.setAlarmNumVisible('none');
        }catch(e){
            AlarmActions.setAlarmNoneVisible('block');
            AlarmActions.setAlarmNumVisible('none');
        }
    }
    handleAlarmClick = ()=>{
        setAlarmMenuVisible(this.props.alarmMenuVisible);
        alarmClick();
    }
    handleThumbnailClick = () => {
        setUserMenuVisible(this.props.userMenuVisible);
        thumbnailClick();
    }
    handleFriendRequestClick = () => {
        setFollowMenuVisible(this.props.followMenuVisible);
        friendRequestClick();
    }
    handleSearchClick = async() => {
        const {SearchActions,page,headerContent} = this.props;
        await SearchActions.searchInHeader(headerContent,page,10);
        await SearchActions.setEmptyUserlist();
        await SearchActions.setAddPage();
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
        ,alarmNoneVisible,noFriendAddVisible} = this.props;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleAllRead,handleAlarmInfoClick} = this;
    setUserAndRender(user);setFriendRequestNum(friendRequestNum);setHeaderVisible(headerVisible);setUserList(userList);setHeaderContent(headerContent);
    setAlarmNum(alarmNum); setuserMenuVisible(userMenuVisible); setAlarmNumVisible(alarmNumVisible);setHandleAlarmClick(handleAlarmClick);
    setHandleFriendRequestClick(handleFriendRequestClick); setHandleThumbnailClick(handleThumbnailClick);setalarmMenuVisible(alarmMenuVisible);
    setfriendRequestVisible(friendRequestVisible); setfollowMenuVisible(followMenuVisible);
    
    if(!visible) return null;

        return(
            
            <Header home={handleClickHome}>
                {search}
                {searchButton}
                {content}
                {alarm}
                {friendRequest}
                {mypage}
                {menu}
                <AlarmList alarms={alarmList} visible={alarmMenuVisible} alarmvisible={alarmNoneVisible}
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
        friendRequestVisible : state.alarm.get('friendRequestVisible'),
        alarmNumVisible : state.alarm.get('alarmNumVisible'),
        noFriendAddVisible : state.alarm.get('noFriendAddVisible'),
        alarmNoneVisible : state.alarm.get('alarmNoneVisible')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch),
        FriendActions : bindActionCreators(friendActions,dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        AlarmActions : bindActionCreators(alarmActions,dispatch)
    })
) (HeaderContainer);