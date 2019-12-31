import React, {Component} from 'react';
import Header, {RegisterButton,UserThumbnail,SearchList,Setting} from '../../components/Header';
import {FollowList} from '../../components/FollowMenu';
import {connect} from 'react-redux';
import * as userActions from '../../redux/modules/user';
import * as baseActions from '../../redux/modules/base';
import * as friendActions from '../../redux/modules/friend';
import * as searchActions from '../../redux/modules/search';
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

    render(){
    const {visible, user,followRequest,friendRequestNum,alarmRequestNum,headerVisible,userList,headerContent} = this.props;
    const{friendRequestVisible,alarmVisble,alarmMenuVisible,
        followMenuVisible,mypageVisible,mVisible,noFriendAddVisible} = this.state;
    const {handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,handleMyPageClick
        ,follow,setFollowNotificationUnavailable,handleSearchBox,handleUserClick} = this;
    let content,search,alarm,friendRequest,mypage,menu = null;

    if(!visible) return null;

    if(user.get('logged')){
        content = <UserThumbnail username={user.getIn(['loggedInfo','username'])} thumbnail={user.getIn(['loggedInfo','thumbnail'])} />;
        search = <SearchList userclick = {handleUserClick}
         onclick = {handleSearchBox} visible={headerVisible} users={userList} nickname={headerContent}/>;
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
        friendRequestNum : state.friend.get('friendRequestNum'),
        headerContent : state.search.get('headerContent'),
        userList : state.search.get('userList'),
        headerVisble : state.search.get('headervisible')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions,dispatch),
        FriendActions : bindActionCreators(friendActions,dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch)
    })
) (HeaderContainer);