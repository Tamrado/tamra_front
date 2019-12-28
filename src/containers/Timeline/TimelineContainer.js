import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageWrapper from '../../components/PageWrapper';
import {Profile} from '../../components/Timeline';
import * as friendActions from '../../redux/modules/friend';
import * as timelineActions from '../../redux/modules/timeline';
import storage from '../../lib/storage';
class TimelineContainer extends Component{
    state = {
        followdisplay : 'none'
    }
    handleMyTimeline = () =>{
        const {TimelineActions,FriendActions} = this.props;
        const {thumbnail,comment,username,nickname} = storage.get('loggedInfo');
        TimelineActions.setComment(comment);
        TimelineActions.setThumbnail(thumbnail);
        TimelineActions.setUsername(username);
        TimelineActions.setNickname(nickname);
        this.setState=({
            followdisplay : 'none'
        });
        FriendActions.getFriendInfo();
    }
    componentDidMount(){
        const {userid} = this.props;
        const {handleMyTimeline} = this;
        console.log(userid);
        if(storage.get('loggedInfo') && ':'+storage.get('loggedInfo').username === userid){
            handleMyTimeline();
        }
    }
    handleFollowClick =()=>{
        const {FriendActions} = this.props;
        FriendActions.follow()
    }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        
        const {followNum,followerNum,thumbnail,comment,username,nickname} = this.props;
        const {handleFollowClick} = this;
        const {followdisplay} = this.state;
        return(
            <PageWrapper>
            <Profile thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick} followdisplay ={followdisplay}/>
          </PageWrapper>
            );
    }
}
export default connect(
    (state) => ({
        followNum : state.friend.get('followNum'),
        followerNum : state.friend.get('followerNum'),
        thumbnail : state.timeline.get('thumbnail'),
        comment : state.timeline.get('comment'),
        username : state.timeline.get('username'),
        nickname : state.timeline.get('nickname')
    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch)

    })
)(TimelineContainer);