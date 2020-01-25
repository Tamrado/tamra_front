import storage from '../../lib/storage';
import {FriendActions,TimelineActions,BaseActions,PostActions} from './setActionModule';
export const getProfileInfo = async(userid) =>{
    var id = userid.substr(1);
        const {username} = storage.get('loggedInfo');
        if(username === id)TimelineActions.setFollowDisplay('none');
        else TimelineActions.setFollowDisplay('block');
        try{
        await FriendActions.getOtherInfoNum(id);
        await TimelineActions.getTimelinePostNum(id);
        if(username !== id) await FriendActions.notifyIsFollowUser(id);
        }catch(e){
            window.location.replace('/notfound');
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
export const openOrCloseFeedMenu=(data,id)=>{
    const index = data.findIndex(item => item.get('postId')===parseInt(id));
    if(data.getIn([index,'modifyVisible']) === 'block') return;
    if(data.getIn([index,'menuVisible']) === 'none'){
        TimelineActions.setShowMenuVisible({'index':index, 'visible':'none'});
        BaseActions.setFollowMenuVisible('none');
        BaseActions.setAlarmMenuVisible('none');
        BaseActions.setUserMenuVisibility('none');
        TimelineActions.setMenuVisible({'index':index, 'visible':'block'});
    }
    else{
        TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
    }
}
export const modifyFeed=async(data,id)=>{
    const index = data.findIndex(item => item.get('postId')===parseInt(id));
        await TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
        await TimelineActions.setModifyVisible({'index' : index,'visible' : 'inline-block'});
}

const selectWordforMethod = (type) => {
    return {
        'modify' : '수정하시겠습니까?',
        'delete' : '삭제하시겠습니까?'
    }[type];
}
export const popupButtonClick=(data,id,category)=>{
    const index = data.findIndex(item => item.get('postId')===parseInt(id));
        TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
        PostActions.setPopupId(id);
        PostActions.setPostPopupDisplay('block');
        PostActions.setPopupCategory(category);
        PostActions.setPopupText(selectWordforMethod(category));
}
export const popupButtonDelete =async(data,userid,popupId)=>{
    const index = data.findIndex(item => item.get('postId')===parseInt(popupId));
        const userId = userid.substr(1);
        try{
            await PostActions.deleteFeed(popupId);
            await TimelineActions.deleteFeed(index);
            await TimelineActions.getTimelinePostNum(userId);
        }catch(e){
            console.log(e);
        }
}