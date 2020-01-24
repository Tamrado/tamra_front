export let CommentActions,PostActions,AuthActions,UserActions,SearchActions,TimelineActions,BaseActions,
AlarmActions,FriendActions,LikeActions;

export const setPostActions = (postActions)=> {
    PostActions = postActions;
}

export const setAuthActions = (authActions) => {
    AuthActions = authActions;
}

export const setUserActions = (userActions) => {
    UserActions=userActions;
}
export const setSearchActions=(searchActions)=>{
    SearchActions = searchActions;
}
export const setTimelineActions=(timelineActions)=>{
    TimelineActions = timelineActions;
}
export const setBaseActions = (baseActions)=>{
    BaseActions = baseActions;
}
export const setAlarmActions =(alarmActions)=>{
    AlarmActions = alarmActions;
}
export const setFriendActions = (friendActions)=>{
    FriendActions = friendActions;
}
export const setCommentActions = (commentActions) =>{
    CommentActions = commentActions;
}
export const setLikeActions = (likeActions) =>{
    LikeActions = likeActions;
}