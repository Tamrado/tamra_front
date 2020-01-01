import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/Timeline';
import * as friendActions from '../../redux/modules/friend';
import * as timelineActions from '../../redux/modules/timeline';
import * as likeActions from '../../redux/modules/like';
import storage from '../../lib/storage';
class TimelineContainer extends Component{
    
    handleScroll = async(e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        const { innerHeight } = window;
      const { scrollHeight } = document.body;
    
      if (scrollTop+innerHeight >scrollHeight && this.props.isTruePost ) {
         this.getFeedList();
         await this.props.TimelineActions.addPage();
        }
    }
      getFeedList = async() => {
        const{TimelineActions,page,isTruePost,userid} = this.props;
        var username = userid.substr(1);
        if(isTruePost){
            try{
                 await TimelineActions.getTimelineInformation(username,page);
            }catch(e){
                console.log(e);
                await TimelineActions.setFalsePost();
            }
            
            
        }
    }
    overHashTag = (e) =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('block');
        TimelineActions.setKey(e.target.id);
    }
    outHashTag = () =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('none');
    }

    handleTimeline =async()=>{
        const {TimelineActions,FriendActions,userid} = this.props;
        var id = userid.substr(1);
        const {username} = storage.get('loggedInfo');
        if(username === id)TimelineActions.setFollowDisplay('none');
        else TimelineActions.setFollowDisplay('block');
        try{
        await FriendActions.getOtherInfoNum(id);
        TimelineActions.getTimelinePostNum(id);
        }catch(e){
            window.location.replace('/');
        }
        const{result} = this.props;
        TimelineActions.setComment(result.comment);
        TimelineActions.setThumbnail(result.thumbnail);
        TimelineActions.setUsername(result.username);
        TimelineActions.setNickname(result.nickname);
        FriendActions.notifyIsFollowUser(id);

    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.userid !== this.props.userid;
    }
   componentDidUpdate(prevProps, prevState, snapshot){
        
        if(snapshot){
        
        const {handleTimeline} = this;
        handleTimeline();
        }
    }
    
    componentDidMount=async()=>{
        const {handleTimeline} = this;
        window.addEventListener("scroll", this.handleScroll);
        await this.getFeedList();
        await this.props.TimelineActions.addPage();
        await handleTimeline();
    }
    handleFollowClick =async()=>{
        const {FriendActions,isfollow,userid} = this.props;
        const id = userid.substr(1);
        if(isfollow === '팔로우')
            await FriendActions.follow(id);
        else
            await FriendActions.unfollow({'friendId': id});
        await FriendActions.getOtherInfoNum(id);
    }
    handleLikeClick = async(e) =>{
        const {LikeActions,TimelineActions} = this.props;
        const id = e.target.id;
        await TimelineActions.setLikeKey(id);
        await LikeActions.clickLike(id);
        await TimelineActions.setTimelineLike('none');
        try{
        await LikeActions.getLikeAndUserList(id,1);
        }catch(e){}
        const {totalNum} = this.props;
        await TimelineActions.setTimelineLikeNum(totalNum);
           
    }
    handleCancelClick =async(e) => {
        const {LikeActions,TimelineActions} = this.props;
        const id = e.target.id;
        await TimelineActions.setLikeKey(id);
        await LikeActions.cancelLike(id);
        await TimelineActions.setTimelineLike('block');
        try{
        await LikeActions.getLikeAndUserList(id,1);
        }catch(e){}
        const {totalNum} = this.props;
        await TimelineActions.setTimelineLikeNum(totalNum);
    }
    render(){
        
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const {hashdisplay,keyid,totalNum} = this.props;
        const {followNum,followerNum,thumbnail,comment,username,nickname,postNum,followDisplay,isfollow} = this.props;
        const {handleFollowClick,overHashTag,outHashTag,handleLikeClick,handleCancelClick} = this;
        return(
            <PageWrapper>
            <FeedList thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick}
             followdisplay ={followDisplay} postNum={postNum} isfollow = {isfollow} like = {handleLikeClick}
             mainfeed={data} hashdisplay = {hashdisplay} hover = {overHashTag} 
             nothover={outHashTag} keyid = {keyid} cancel = {handleCancelClick} totalNum = {totalNum}/>
          </PageWrapper>
            );
    }
}
export default connect(
    (state) => ({
        user : state.user.getIn(['loggedInfo','username']),
        followNum : state.friend.get('followNum'),
        result : state.friend.get('result'),
        followerNum : state.friend.get('followerNum'),
        thumbnail : state.timeline.get('thumbnail'),
        comment : state.timeline.get('comment'),
        username : state.timeline.get('username'),
        nickname : state.timeline.get('nickname'),
        postNum : state.timeline.get('postNum'),
        followDisplay : state.timeline.get('followdisplay'),
        isfollow : state.friend.get('isFollow'),
        data : state.timeline.get('mainfeed'),
        page : state.timeline.get('page'),
        isTruePost : state.timeline.get('isTruePost'),
        hashdisplay : state.timeline.get('hashdisplay'),
        keyid : state.timeline.get('keyid'),
        totalNum : state.like.get('totalNum')

    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch)

    })
)(TimelineContainer);