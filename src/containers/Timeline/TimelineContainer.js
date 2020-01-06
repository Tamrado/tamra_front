import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/Timeline';
import * as friendActions from '../../redux/modules/friend';
import * as timelineActions from '../../redux/modules/timeline';
import * as likeActions from '../../redux/modules/like';
import storage from '../../lib/storage';
import * as commentActions from '../../redux/modules/comment';
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
    setTime = async() => {
        const{data,TimelineActions} = this.props;
                await Promise.all(
                    data.map(
                        async(feed,index) => {
                            let time = feed.get('timestamp');
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setTimelineTime({timestring:timestring,index : index});
                        }
                    )
                );
    }
    setCommentTime = async(id) => {
        const{data,TimelineActions} = this.props;
        let index = data.findIndex(item => item.get('postId')===parseInt(id));
        const comments = data.getIn([index,'commentList']);
                await Promise.all(
                    comments.map(
                        async(comment,commentIndex) => {
                            console.log(comment.timestamp);
                            let time = comment.timestamp;
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setTimelineCommentTime({timestring:timestring,index : index,commentIndex:commentIndex});
                        }
                    )
                );
    }
    dateTimeToFormatted=(dt)=> {
		const min = 60 * 1000;
		const c = new Date();
		var d = new Date(dt);
		var minsAgo = Math.floor((c - d) / (min));

		var result = {
            'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) 
            + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') 
            +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  
            + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
            'month' : d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) 
            + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate(),
			'formatted': ''
		};

		if (minsAgo < 60) { // 1시간 내
			result.formatted = minsAgo + '분 전';
		} else if (minsAgo < 60 * 24) { // 하루 내
			result.formatted = Math.floor(minsAgo / 60) + '시간 전';
		} else if(minsAgo < 60 * 24 * 30) { // 하루 이상
			result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
		} else{
            result.formatted = result.month;
        }
		return result.formatted;
	};
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.userid !== this.props.userid || prevProps.data !== this.props.data;
    }
   componentDidUpdate(prevProps, prevState, snapshot){
        
        if(snapshot && prevProps.userid !== this.props.userid){
        const {handleTimeline} = this;
        handleTimeline();
        }
        else if(snapshot && prevProps.data !== this.props.data){
            this.setTime();
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
    handleComment =async(e)=>{
        const {CommentActions,TimelineActions,data} = this.props;
        const {id} = e.target;
        const {category} = e.target.dataset;
        await TimelineActions.setCommentCategory(category);
        await TimelineActions.setTimelineCommentDisplay(id);
        const{commentdisplay} = this.props;
        if(commentdisplay === 'block'){
            let index = data.findIndex(item => item.get('postId')===parseInt(id));
            let page = data.getIn([index,'commentPage']);
            await CommentActions.showPostCommentList(id,page);
            await TimelineActions.setTimelineCommentPage(id);
            const{commentList,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setTimelineCommentList({'commentId' : id,'commentList':commentList,'trueComment' :false});
            else
            await TimelineActions.setTimelineCommentList({'commentId' : id,'commentList':commentList,'trueComment' :true});
            await this.setCommentTime(id);
        }
    }
    handleCommentAdd = async(e) =>{
        const {id} = e.target;
        const {TimelineActions,CommentActions,data} = this.props;
        const index = data.findIndex(item => item.get('postId') ===parseInt(id));
        if(data.getIn([index,'trueComment'])){
            
            const page = data.getIn([index,'commentPage']);
            try{
                await CommentActions.showPostCommentList(id,page);
                await TimelineActions.setTimelineCommentPage(id);
                const{commentList,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setTimelineCommentList({'commentId':id,'commentList':commentList,'trueComment' :false});
            else
            await TimelineActions.setTimelineCommentList({'commentId':id,'commentList':commentList,'trueComment' :true});
            await this.setCommentTime(id);
            }catch(e){
                TimelineActions.setTimelineCommentFalse(id);
            }
        } 
    }
    enterComment = async(e) =>{
        if(window.event.keyCode === 13){
            const {CommentActions,TimelineActions} = this.props;
            const {innerText,id} = e.target;
            console.log(id);
            var content = innerText;
            content = content.replace(/\r/g, "");
            content = content.replace(/\n/g, "");
            await CommentActions.writeComment({id,content});
            await CommentActions.showPostCommentList(id,1);
            this.renewComment(id);
            for(var i = 0; i < document.getElementsByName('^^comment').length; i++){
                if(parseInt(document.getElementsByName('^^comment')[i].id) === parseInt(id)){
                    document.getElementsByName('^^comment')[i].textContent = '';
                    document.getElementsByName('^^comment')[i].blur();
                }
            }
            await CommentActions.getCommentNum(id);
            var {commentNum} = this.props;
            await TimelineActions.setTimelineCommentNum({'commentNum':commentNum,'commentId':id});
            await this.setCommentTime(id);
            
        }
    }
    renewComment=(id)=>
        setTimeout(async()=>{
            const {presentComment,TimelineActions} = this.props;
            await TimelineActions.renewTimelineComment({'commentId' : id,'presentComment':presentComment});
            await this.setCommentTime(id);
        },2000);

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data || this.props.result !== nextProps.result || 
        this.props.followDisplay !== nextProps.followDisplay || this.props.comment !== nextProps.comment ||
        this.props.username !== nextProps.username || this.props.nickname !== nextProps.nickname || 
        this.props.thumbnail !== nextProps.thumbnail || this.props.hashdisplay !== nextProps.hashdisplay
        || this.props.postNum !== nextProps.postNum;
    }
    render(){
        
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const commentThumbnail = storage.get('loggedInfo').thumbnail; 
        console.log(commentThumbnail);
        const {hashdisplay,keyid,totalNum} = this.props;
        const {followNum,followerNum,thumbnail,comment,username,nickname,postNum,followDisplay,isfollow,commentCategory} = this.props;
        const {handleFollowClick,overHashTag,outHashTag,handleLikeClick,handleCancelClick,enterComment,handleCommentAdd
            ,handleComment} = this;
        return(
            <PageWrapper>
            <FeedList  commentThumbnail = {commentThumbnail} 
            thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick}
             followdisplay ={followDisplay} postNum={postNum} isfollow = {isfollow} like = {handleLikeClick}
             mainfeed={data} hashdisplay = {hashdisplay} hover = {overHashTag} handleComment = {handleComment}
             nothover={outHashTag} keyid = {keyid} cancel = {handleCancelClick} totalNum = {totalNum}
             enterComment = {enterComment} handleCommentAdd={handleCommentAdd} commentCategory={commentCategory} />
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
        totalNum : state.like.get('totalNum'),
        commentList : state.comment.get('commentList'),
        commentNum : state.comment.get('commentNum'),
        commentCategory : state.timeline.get('commentCategory'),
        commentdisplay : state.timeline.get('commentdisplay'),
        postId : state.post.get('postId'),
        presentComment : state.comment.get('presentComment'),
        lastComment : state.comment.get('lastComment')

    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch)

    })
)(TimelineContainer);