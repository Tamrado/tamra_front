import {closeWriteModal} from './WriteModule';
import {PostActions,SearchActions,TimelineActions,LikeActions} from './setActionModule';
import {dateTimeToFormatted} from '../Function/dateTimeModule';
let opacity;
export const setOpacity = (Opacity) =>{
    opacity = Opacity;
}
export const closeWithBox = () => {
    PostActions.setWithFriendDisplay('none');
    
}
export const closeModal = () => {
    PostActions.setDisplay('none');
    SearchActions.setFriendContent('');
    
}
const writeBoxWithOpacity = ()=>{
    closeWriteModal();
    PostActions.setPopupDisplay('none');
    PostActions.setPostPopupDisplay('none');
}
const withBoxWithOpacity = ()=>{
    closeWithBox();
}
const tagBoxWithOpacity = () =>{
    closeModal();
}

export const scrollingAction = (e) => {
    const scrollTop =e.srcElement.scrollingElement.scrollTop;
    PostActions.setOpacity(0.8 - scrollTop / 800);
    if(opacity < 0){
        writeBoxWithOpacity();
        withBoxWithOpacity();
        tagBoxWithOpacity();
    }
  }

  export const getFeedList = async(page,isTruePost,userid) => {
    if(isTruePost){
        try{
            if(userid === null)
                await TimelineActions.getMainInformation(page);
            else
                await TimelineActions.getTimelineInformation(userid.substr(1),page);
        }catch(e){
            await TimelineActions.setFalsePost();
        }
        
    }
}

export const setPostTime = async(category,data) => {
    await Promise.all(
        data.map(
            async(feed,index) => {
                let time;
                if(category === 'postList')
                    time = feed.getIn(['feed','timestamp']);
                else
                    time = feed.get('timestamp');
                let timestring = dateTimeToFormatted(time);
                await TimelineActions.setTime({timestring:timestring,index : index});
                await TimelineActions.setTimelineTime({timestring:timestring,index : index});
            }
        )
    );
}

export const overHashTag = (e) =>{
    TimelineActions.setHashDisplay('block');
    TimelineActions.setKey(e.target.id);
    if(typeof e.target.dataset.category !== 'undefined')
        TimelineActions.setCategoryId(e.target.dataset.category);
}
export const outHashTag = () =>{
    TimelineActions.setHashDisplay('none');
}
export const handlePopupCancel = () => {
    PostActions.setPostPopupDisplay('none');
    }
export const handlePopupOk = () => {
    PostActions.setPopupDisplay('none');
    }
 

export const scrollAction = async(e,isTruePost,page,userid)=>{
    const scrollTop =e.srcElement.scrollingElement.scrollTop;
        const { innerHeight } = window;
      const { scrollHeight } = document.body;
    
      if (scrollTop+innerHeight >scrollHeight && isTruePost ) {
         getFeedList(page,isTruePost,userid);
         await TimelineActions.addPage();
        }
}
export const clickLike = async(e) =>{
    const id = e.target.id;
    await TimelineActions.setLikeKey(id);
    await LikeActions.clickLike(id);
    await TimelineActions.setDetailLike('none');
    await TimelineActions.setLike('none');
    await TimelineActions.setTimelineLike('none');
    try{
    await LikeActions.getLikeAndUserList(id,1);
    }catch(e){}    
}
export const setTotalLikeAfterClickLike = async(totalNum)=>{
    await TimelineActions.setDetailLikeNum(totalNum);
    await TimelineActions.setLikeNum(totalNum);
    await TimelineActions.setTimelineLikeNum(totalNum);
}

export const clickUnLike = async(e) =>{
    const id = e.target.id;
        await TimelineActions.setLikeKey(id);
        await LikeActions.cancelLike(id);
        await TimelineActions.setLike('block');
        await TimelineActions.setDetailLike('block');
        await TimelineActions.setTimelineLike('block');
        try{
        await LikeActions.getLikeAndUserList(id,1);
        }catch(e){}
}
