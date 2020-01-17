import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/Timeline';
import {PostPopup,Popup} from '../../components/Popup';
import * as friendActions from '../../redux/modules/friend';
import * as timelineActions from '../../redux/modules/timeline';
import * as likeActions from '../../redux/modules/like';
import * as baseActions from '../../redux/modules/base';
import * as postActions from '../../redux/modules/post';
import * as userActions from '../../redux/modules/user';
import {setUserActions,handleLogout} from '../Function/SignModule';
import {dateTimeToFormatted} from '../Function/dateTimeModule';
import storage from '../../lib/storage';
import * as commentActions from '../../redux/modules/comment';
import * as userPageActions from '../../redux/modules/userPage';
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
        await TimelineActions.getTimelinePostNum(id);
        await FriendActions.notifyIsFollowUser(id);
        }catch(e){
            console.log(e);
            
        }
        const{result} = this.props;
        TimelineActions.setComment(result.comment);
        TimelineActions.setThumbnail(result.thumbnail);
        TimelineActions.setUsername(result.username);
        TimelineActions.setNickname(result.nickname);
        

    }

    setTime = async() => {
        const{data,TimelineActions} = this.props;
                await Promise.all(
                    data.map(
                        async(feed,index) => {
                            let time = feed.get('timestamp');
                            let timestring = dateTimeToFormatted(time);
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
                            let time = comment.timestamp;
                            let timestring = dateTimeToFormatted(time);
                            await TimelineActions.setTimelineCommentTime({timestring:timestring,index : index,commentIndex:commentIndex});
                        }
                    )
                );
    }
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
        setUserActions(this.props.UserActions);
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
        || this.props.postNum !== nextProps.postNum || this.props.popupDisplay !== nextProps.popupDisplay ||
         this.props.postPopupDisplay !== nextProps.postPopupDisplay;
    }

    handleMenu = (e) => {
        const {data,TimelineActions,BaseActions} = this.props;
        const {id} = e.target;
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

    modifyClick = async(e) => {
        const {id} = e.target;
        const {data,TimelineActions} = this.props;
        const index = data.findIndex(item => item.get('postId')===parseInt(id));
        
        await TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
        await TimelineActions.setModifyVisible({'index' : index,'visible' : 'inline-block'});
    }
    get = (type) => {
        return {
            'modify' : '수정하시겠습니까?',
            'delete' : '삭제하시겠습니까?'
        }[type];
    }
    buttonClick = (e) => {
        const {PostActions,TimelineActions,data} = this.props;
        const {id} = e.target;
        const {category} = e.target.dataset;
        const index = data.findIndex(item => item.get('postId')===parseInt(id));
        TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
        PostActions.setPopupId(id);
        PostActions.setPostPopupDisplay('block');
        PostActions.setPopupCategory(category);
        PostActions.setPopupText(this.get(category));
    }
    deleteClick = async() => {
        const {PostActions,TimelineActions,data,userid,popupId} = this.props;
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

    handleImageChange = async(e) => {
        e.preventDefault();
        const {UserPageActions} = this.props;
        let file = e.target.files[0];
        var formdata = new FormData();
        formdata.set('file',file);
        await UserPageActions.modifyUserImage(formdata);
        const {userResult} = this.props;
        console.log(userResult.toJS());
        storage.remove('loggedInfo');
        storage.set('loggedInfo',userResult.toJS());
        window.location.reload();
      }

      handleImage =(e) =>{
        const {id} = e.target;
        const {imageid} = e.target.dataset;
        this.props.history.push(`/feed/@:${id}/image/:${imageid}`);
    }
    unavailableModify =(index,id) => {
        const {TimelineActions,data} = this.props;
        for(var i = 0; i < document.getElementsByName('^^content').length; i++){
            if(parseInt(document.getElementsByName('^^content')[i].id) === parseInt(id)){
                document.getElementsByName('^^content')[i].textContent = data.getIn([index,'content']);
                document.getElementsByName('^^content')[i].blur();
            }
        }
        TimelineActions.setModifyVisible({'index' : index,'visible' : 'none'});
    }
    handleCancel = (e) => {
        const {id} = e.target;
        const {data} = this.props;
        const index = data.findIndex(item => item.get('postId')===parseInt(id));
        this.unavailableModify(index,id);
    }
    handleWrite = async() => {
        const {TimelineActions,data,PostActions,popupId} = this.props;
        const index = data.findIndex(item => item.get('postId')===parseInt(popupId));
        let showLevel = data.getIn([index,'showLevel']);
        try{
        await PostActions.modifyFeedInformation({'showLevel' : showLevel, 'postId' : popupId, 'content' : data.getIn([index,'modifyText'])});
        }catch(e){
            if(e.response.status === 409){
                PostActions.setPopupText('글은 1000자 이하여야 합니다. 다시 입력해주세요.');
                PostActions.setPopupDisplay('block');
                return;
            }
        }
        this.unavailableModify(index,popupId);
        TimelineActions.setFeedContext({'index': index,'text': data.getIn([index,'modifyText'])});
        }
        handleWriteInput = (e) => {
            const {id,innerText} = e.target;
            const {TimelineActions,data} = this.props;
            const index = data.findIndex(item => item.get('postId')===parseInt(id));
            TimelineActions.setModifyText({'index' : index, 'modifyText' : innerText});
        }
        
        handleViewChange = (e) => {
            const {id} = e.target;
            const {TimelineActions,data,BaseActions} = this.props;
            const index = data.findIndex(item => item.get('postId')===parseInt(id));
        if(data.getIn([index,'showMenuVisible']) === 'none'){
            TimelineActions.setShowMenuVisible({'index':index, 'visible':'block'});
            BaseActions.setFollowMenuVisible('none');
            BaseActions.setAlarmMenuVisible('none');
            BaseActions.setUserMenuVisibility('none');
            TimelineActions.setMenuVisible({'index':index, 'visible':'none'});
        }
        else{
            TimelineActions.setShowMenuVisible({'index':index, 'visible':'none'});
        }
        }
        handleShowLevel = async(e) => {
            const {id} = e.target;
            const {postid} = e.target.dataset;
            console.log(postid);
            const {data,PostActions,TimelineActions} = this.props;
            const index = data.findIndex(item => item.get('postId')===parseInt(postid));
            try{
            await PostActions.modifyFeedInformation({'showLevel' : id, 'postId' : postid, 'content' : data.getIn([index,'content'])});
            }catch(e){

            }
            TimelineActions.setFeedShowlevel({'index':index,'showLevel':id});
            TimelineActions.setShowMenuVisible({'index':index, 'visible':'none'});
        }

        handleOk = () => {
            const {popupCategory,PostActions} = this.props;
            PostActions.setPostPopupDisplay('none');
            if(popupCategory === 'modify')
                this.handleWrite();

            if(popupCategory === 'delete')
                this.deleteClick();
            if(popupCategory === 'logout')
                handleLogout();
        }
        handlePopupCancel = () => {
        const {PostActions} = this.props;
        PostActions.setPostPopupDisplay('none');
        }
        handlePopupOk = () => {
            const {PostActions} = this.props;
        PostActions.setPopupDisplay('none');
        }

    render(){
        
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const commentThumbnail = storage.get('loggedInfo').thumbnail; 
        const hostUser = storage.get('loggedInfo').username;
        const {hashdisplay,keyid,totalNum,postPopupDisplay,popupText,popupDisplay} = this.props;
        const {followNum,followerNum,thumbnail,comment,username,nickname,postNum,followDisplay,isfollow,commentCategory} = this.props;
        const {handleFollowClick,overHashTag,outHashTag,handleLikeClick,handleCancelClick,enterComment,handleCommentAdd
            ,handleComment,handleMenu,handleImageChange,handleImage,handleCancel,modifyClick,handlePopupOk
            ,handleWriteInput,handleViewChange,handleShowLevel,handleOk,handlePopupCancel,buttonClick} = this;
        return(
            <div>
            <PageWrapper>
            <FeedList hostUser={hostUser} commentThumbnail = {commentThumbnail} change = {handleImageChange}
            thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick}
             followdisplay ={followDisplay} postNum={postNum} isfollow = {isfollow} like = {handleLikeClick}
             mainfeed={data} hashdisplay = {hashdisplay} hover = {overHashTag} handleComment = {handleComment}
             nothover={outHashTag} keyid = {keyid} cancel = {handleCancelClick} totalNum = {totalNum}
             enterComment = {enterComment} handleCommentAdd={handleCommentAdd} commentCategory={commentCategory}
             handleMenu = {handleMenu} modifyClick={modifyClick} deleteClick = {buttonClick} handleImage={handleImage}
             handleCancel = {handleCancel} handleWrite={buttonClick} handleWriteInput={handleWriteInput} 
             handleViewChange = {handleViewChange} handleShowLevel={handleShowLevel}/>
          </PageWrapper>
          <PostPopup handleOk={handleOk} right={'40%'} handleCancel={handlePopupCancel}
             text={popupText} display={postPopupDisplay} />
             <Popup handlePopupOk = {handlePopupOk} display={popupDisplay} text={popupText} />
          </div>
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
        lastComment : state.comment.get('lastComment'),
        userResult : state.userPage.get('result'),
        postPopupDisplay : state.post.get('postPopupDisplay'),
        popupText : state.post.get('popupText'),
        popupId : state.post.get('popupId'),
        popupDisplay : state.post.get('popupDisplay'),
        popupCategory : state.post.get('popupCategory')

    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch),
        BaseActions : bindActionCreators(baseActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        UserPageActions : bindActionCreators(userPageActions,dispatch),
        UserActions : bindActionCreators(userActions,dispatch)

    })
)(TimelineContainer);