import {dateTimeToFormatted} from './dateTimeModule';
let AlarmActions,FriendActions,userMenuVisible,alarmMenuVisible,followMenuVisible,username,BaseActions,SearchActions;
export const setBaseActions = (baseActions)=>{
    BaseActions = baseActions;
}
export const setAlarmActions =(alarmActions)=>{
    AlarmActions = alarmActions;
}
export const setFriendActions = (friendActions)=>{
    FriendActions = friendActions;
}
export const setUserMenuVisible = (UserMenuVisible)=>{
    userMenuVisible = UserMenuVisible;
}
export const setAlarmMenuVisible = (AlarmMenuVisible)=>{
    alarmMenuVisible = AlarmMenuVisible;
}
export const setFollowMenuVisible = (FollowMenuVisible)=>{
    followMenuVisible = FollowMenuVisible;
}
export const setSearchActions=(searchActions)=>{
    SearchActions = searchActions;
}
export const setUsername = (Username) =>{
    username = Username;
}
export const setAlarmTime = async(alarmList)=>{
    await Promise.all(alarmList.map(
        async(alarm,index) =>{
            let time = alarm.get('timestamp');
            let dateString = dateTimeToFormatted(time);
            await AlarmActions.setAlarmTime({dateString:dateString,index : index});
        }
    )
);
}
export const getFollowRequest = async() => {
    try{
        await FriendActions.getFriendAlarmInfo();
        AlarmActions.setFriendRequestVisible('block');
        AlarmActions.setNoFriendAddVisible('none');
    }catch(e){
        AlarmActions.setFriendRequestVisible('none');
        AlarmActions.setNoFriendAddVisible('block');
        return;
    }
}


export const setFollowNotificationUnavailable = async(e) => {
    const {id} = e.target;
    try{
        await FriendActions.deleteFriendAlarmNotification({'userId' : id});
        friendRequestClick();
        getFollowRequest();
        
    }catch(e){
        return;
    }
}
export const thumbnailClick = () => {
    if(userMenuVisible === 'none')
        BaseActions.setUserMenuVisibility('block');
    
    else BaseActions.setUserMenuVisibility('none');
}

export const alarmClick = () => {
 if(alarmMenuVisible === 'none'){
    BaseActions.setAlarmMenuVisible('block');
    BaseActions.setFollowMenuVisible('none');
    BaseActions.setUserMenuVisibility('none');
}
 else
    BaseActions.setAlarmMenuVisible('none');
}

const friendRequestClick = () => {
    if(followMenuVisible === 'none'){
        BaseActions.setAlarmMenuVisible('none');
    BaseActions.setFollowMenuVisible('block');
    BaseActions.setUserMenuVisibility('none');
}
    else
    BaseActions.setFollowMenuVisible('none');
}
export{friendRequestClick};
export const handleMyPageClick = () => {
    window.location.href = '/@' + username+'/password';
}
export const follow = (e) => {
    const {id} = e.target;
    try{
    FriendActions.follow(id);
    window.location.reload();
    }catch(e){
        return;
    }
}

export const handleProfileClick = () => {
    window.location.href =`/@:${username}`;
}

export const handleSearchBox = async(e) => {
    const {innerText} = e.target;
    try{
       await Promise.all([SearchActions.setHeaderContent(innerText),SearchActions.searchInHeader(innerText,1,5)]);
    }catch(e){
        SearchActions.setEmptyUserlist();
    }
    await SearchActions.setHeaderVisible('block');
}

export const handleUserClick = async(e) => {
    window.location.href = `/@:${e.target.id}`;
}
export const handleClickHome = () => {
    window.location.href = '/';
}

