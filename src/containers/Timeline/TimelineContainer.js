import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/Timeline';
import * as friendActions from '../../redux/modules/friend';
import * as timelineActions from '../../redux/modules/timeline';
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

    handleMyTimeline = () =>{
        const {TimelineActions,FriendActions} = this.props;
        if(!storage.get('loggedInfo')) return ;
        const {thumbnail,comment,username,nickname} = storage.get('loggedInfo');
        TimelineActions.setComment(comment);
        TimelineActions.setThumbnail(thumbnail);
        TimelineActions.setUsername(username);
        TimelineActions.setNickname(nickname);
        TimelineActions.setFollowDisplay('none');
        try{
        FriendActions.getMyInfoNum();
        TimelineActions.getTimelinePostNum(username);
        }catch(e){
            window.location.replace('/');
        }
    }
    handleOtherTimeline =async()=>{
        const {TimelineActions,FriendActions,userid} = this.props;
        var id = userid.substr(1);
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
        TimelineActions.setFollowDisplay('block');
        FriendActions.notifyIsFollowUser(id);

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(snapshot || prevProps.userid !== this.props.userid){
        const {userid} = this.props;
        const {handleMyTimeline,handleOtherTimeline} = this;

        if(storage.get('loggedInfo') && ':'+storage.get('loggedInfo').username === userid){
            handleMyTimeline();
        }
        else{
            handleOtherTimeline();
        }
        }
    }
    componentDidMount=async()=>{
        this.props.TimelineActions.setKey(-1);
        this.props.TimelineActions.setMainfeed();
        this.props.TimelineActions.setIsTruePost();
        await this.props.TimelineActions.setPage();
        const {userid} = this.props;
        const {handleMyTimeline,handleOtherTimeline} = this;
        window.addEventListener("scroll", this.handleScroll);
        this.getFeedList();
        await this.props.TimelineActions.addPage();
        if(storage.get('loggedInfo') && ':'+storage.get('loggedInfo').username === userid){
            handleMyTimeline();
        }
        else{
            handleOtherTimeline();
        }
    }
    handleFollowClick =()=>{
        const {FriendActions,isfollow,userid} = this.props;
        const id = userid.substr(1);
        if(isfollow === '팔로우')
            FriendActions.follow(id);
        else
            FriendActions.unfollow({'friendId': id});
        
    }
    handleLikeClick = (e) =>{
        
    }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const {hashdisplay,keyid,data} = this.props;
        const {followNum,followerNum,thumbnail,comment,username,nickname,postNum,followDisplay,isfollow} = this.props;
        const {handleFollowClick,overHashTag,outHashTag,handleLikeClick} = this;
        return(
            <PageWrapper>
            <FeedList thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick}
             followdisplay ={followDisplay} postNum={postNum} isfollow = {isfollow} like = {handleLikeClick}
             mainfeed={data} hashdisplay = {hashdisplay} hover = {overHashTag} nothover={outHashTag} keyid = {keyid}/>
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
        keyid : state.timeline.get('keyid')

    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch)

    })
)(TimelineContainer);