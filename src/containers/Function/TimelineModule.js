import storage from '../../lib/storage';
import {FriendActions,TimelineActions} from './setActionModule';
export const getProfileInfo = async(userid) =>{
    var id = userid.substr(1);
        const {username} = storage.get('loggedInfo');
        if(username === id)TimelineActions.setFollowDisplay('none');
        else TimelineActions.setFollowDisplay('block');
        try{
        await FriendActions.getOtherInfoNum(id);
        await TimelineActions.getTimelinePostNum(id);
        if(username !== id)await FriendActions.notifyIsFollowUser(id);
        }catch(e){
            window.location.href = '/notfound';
        }
}
export const setProfileInfo = async(result) =>{
    TimelineActions.setComment(result.comment);
    TimelineActions.setThumbnail(result.thumbnail);
    TimelineActions.setUsername(result.username);
    TimelineActions.setNickname(result.nickname);
}
export const clickFollow = async(isfollow,userid)=>{
    const id = userid.substr(1);
    if(isfollow === '팔로우')
        await FriendActions.follow(id);
    else
        await FriendActions.unfollow({'friendId': id});
    await FriendActions.getOtherInfoNum(id);
}