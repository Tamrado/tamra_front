import React from 'react';
import menuImage from '../../build/static/images/iconmonstr-arrow-80-24.png';
import alarmImage from '../../build/static/images/iconmonstr-bell-thin-32.png';
import friendRequestImage from '../../build/static/images/iconmonstr-user-29-32.png';
import mypageImage from '../../build/static/images/iconmonstr-gear-10-32.png';
import hoverMenuImage from '../../build/static/images/iconmonstr-arrow-80-12.png';
import hoverAlarmImage from '../../build/static/images/iconmonstr-bell-thin-32 (1).png';
import hoverFriendRequestImage from '../../build/static/images/iconmonstr-user-29-32 (1).png';
import hoverMypageImage from '../../build/static/images/iconmonstr-gear-10-32 (1).png';
import {RegisterButton,UserThumbnail,SearchList,Setting} from '../../components/Header';
import {SearchButton} from '../../components/Header/Header';
import {handleMyPageClick,handleProfileClick,handleSearchBox,handleUserClick} from './HeaderModule';
let user,friendRequestNum,headerVisible,userList,headerContent,alarmNum,userMenuVisible,alarmNumVisible,
handleThumbnailClick,handleAlarmClick,handleFriendRequestClick,alarmMenuVisible,followMenuVisible,friendRequestVisible;
export let content,search,alarm,friendRequest,mypage,menu,searchButton = null;
export const setalarmMenuVisible=(AlarmMenuVisible)=>{
    alarmMenuVisible = AlarmMenuVisible;
}
export const setfollowMenuVisible=(FollowMenuVisible)=>{
    followMenuVisible = FollowMenuVisible;
}
export const setfriendRequestVisible=(FriendRequestVisible)=>{
    friendRequestVisible = FriendRequestVisible;
}
export const setUserAndRender = (User) =>{
    user = User;
if(user.size > 0 &&user.get('logged')){
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
}
export const setFriendRequestNum = (FriendRequestNum) =>{
    friendRequestNum = FriendRequestNum;
}
export const setHeaderVisible = (HeaderVisible) =>{
    headerVisible = HeaderVisible;
}
export const setUserList = (UserList) =>{
    userList = UserList;
}
export const setHeaderContent = (HeaderContent)=>{
    headerContent = HeaderContent;
}
export const setAlarmNum = (AlarmNum)=>{
    alarmNum = AlarmNum;
}
export const setuserMenuVisible = (UserMenuVisible)=>{
    userMenuVisible = UserMenuVisible;
}
export const setAlarmNumVisible = (AlarmNumVisible)=>{
    alarmNumVisible = AlarmNumVisible;
}
export const setHandleThumbnailClick = (HandleThumbnailClick)=>{
    handleThumbnailClick = HandleThumbnailClick;
}
export const setHandleAlarmClick =(HandleAlarmClick)=>{
    handleAlarmClick = HandleAlarmClick;
}
export const setHandleFriendRequestClick = (HandleFriendRequestClick)=>{
    handleFriendRequestClick = HandleFriendRequestClick;
}

