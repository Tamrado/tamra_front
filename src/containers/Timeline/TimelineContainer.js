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
import * as authActions from '../../redux/modules/auth';
import * as commentActions from '../../redux/modules/comment';
import {setUserActions,setTimelineActions,setPostActions,setFriendActions,setLikeActions,setCommentActions,
setBaseActions,setAuthActions} from '../Function/setActionModule';
import {handleLogout} from '../Function/SignModule';
import {setCommentTime,renderCommentListAfterCommentAdd,clickCommentAdd,returnCommentContextAndInitalize,setCommentListDisplay,initializeCommentList} from '../Function/CommentModule';
import {setPostTime,getFeedList,overHashTag,outHashTag,handlePopupCancel,handlePopupOk,scrollAction,
    clickLike,setTotalLikeAfterClickLike,clickUnLike} from '../Function/PostModule';
import storage from '../../lib/storage';
import { getProfileInfo,setProfileInfo,clickFollow,openOrCloseFeedMenu,modifyFeed,popupButtonClick,popupButtonDelete,
handleShowMenuVisible,handleWriteModifyLetter,modifyUserImage,changeUserInfoStorage,unavailableModify,postLetterToModify,
modifyShowLevel} from '../Function/TimelineModule';

class TimelineContainer extends Component{
    componentDidMount=()=>{
        window.addEventListener("scroll", this.handleScroll);
        const {UserActions,TimelineActions,PostActions,FriendActions,LikeActions,CommentActions,BaseActions,
        AuthActions} = this.props;
        setUserActions(UserActions);
        setTimelineActions(TimelineActions);
        setPostActions(PostActions);
        setBaseActions(BaseActions);
        setFriendActions(FriendActions);
        setLikeActions(LikeActions);
        setCommentActions(CommentActions);
        setAuthActions(AuthActions);
        this.initialize();
        
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
        clearInterval(this.commentTimer);
    }
    initialize=async()=>{
        const {handleTimelineProfile} = this;
        await getFeedList(1,true,this.props.userid);
        await setPostTime('timeline',this.props.data);
        this.timerId = setInterval(
            ()=>setPostTime('timeline',this.props.data),60000);
        await this.props.TimelineActions.addPage();
        await handleTimelineProfile();
    }
    handleScroll = async(e) => {
        const {isTruePost,page,userid} = this.props;
        scrollAction(e,isTruePost,page,userid);
    }
      
    handleTimelineProfile =async()=>{
        await getProfileInfo(this.props.userid);
        await setProfileInfo(this.props.result);
    }
    
    handleFollowClick =async()=>{
        const {isfollow,userid} = this.props;
        clickFollow(isfollow,userid);
    }
    handleLikeClick = async(e) =>{
        await clickLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);      
    }
    handleUnLikeClick =async(e) => {
        await clickUnLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);
    }
    handleComment =async(e)=>{
        const{id} = e.target;
        await setCommentListDisplay(e,'timeline');
        const{commentdisplay,data} = this.props;
        if(commentdisplay ==='block'){
            try{
                await initializeCommentList(data,'timeline',id);
                const{commentList,lastComment} = this.props;
                await renderCommentListAfterCommentAdd('timeline',commentList,lastComment,id);
                setCommentTime(null,'timeline',this.props.data,id);
                this.commentTimer = setInterval(()=>setCommentTime(null,'timeline',this.props.data,id),60000);
            }catch(e){}    
    }
    }
    handleImage =(e) =>{
        const {id} = e.target;
        const {imageid} = e.target.dataset;
        this.props.history.push(`/feed/@:${id}/image/:${imageid}`);
    }
    handleCommentAdd = async(e) =>{
        const{id} = e.target;
        await clickCommentAdd(e,this.props.data,'timeline');
        const {commentList,lastComment} = this.props;
        await renderCommentListAfterCommentAdd('timeline',commentList,lastComment,id);
        await setCommentTime(null,'timeline',this.props.data,id);
    }
    enterComment = async(e) =>{
        const{id} = e.target;
        if(window.event.keyCode === 13){
           await returnCommentContextAndInitalize(e,null);
        await this.renewComment(id);
        var {TimelineActions,commentNum} = this.props;
        await TimelineActions.setCommentNum({'commentNum':commentNum,'commentId':id});
        }
    }
    renewComment=async(id)=>{
            const {presentComment,TimelineActions} = this.props;
            await TimelineActions.renewTimelineComment({'commentId' : id,'presentComment':presentComment});
            await setCommentTime(null,'timeline',this.props.data,id);
        };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data || this.props.result !== nextProps.result || 
        this.props.followDisplay !== nextProps.followDisplay || this.props.comment !== nextProps.comment ||
        this.props.username !== nextProps.username || this.props.nickname !== nextProps.nickname || 
        this.props.thumbnail !== nextProps.thumbnail || this.props.hashdisplay !== nextProps.hashdisplay
        || this.props.postNum !== nextProps.postNum || this.props.popupDisplay !== nextProps.popupDisplay ||
         this.props.postPopupDisplay !== nextProps.postPopupDisplay;
    }

    handleMenu = (e) => {
        const {id} = e.target;
        openOrCloseFeedMenu(this.props.data,id);
    }

    modifyClick = async(e) => {
        const {id} = e.target;
        await modifyFeed(this.props.data,id);
    }
    
    buttonClick = (e) => {
        const {id} = e.target;
        const {category} = e.target.dataset;
        popupButtonClick(this.props.data,id,category);
    }
    deleteClick = async() => {
        const {data,userid,popupId} = this.props;
        await popupButtonDelete(data,userid,popupId);
    }

    handleImageChange = async(e) => {
        await modifyUserImage(e);
        await new Promise(changeUserInfoStorage(this.props.userResult));
      }

    handleCancel = (e) => {
        const {id} = e.target;
        const {data} = this.props;
        const index = data.findIndex(item => item.get('postId')===parseInt(id));
        unavailableModify(index,id,data);
    }
    handleWrite = async() => {
        const {TimelineActions,data,popupId} = this.props;
        postLetterToModify(data,popupId);
        const index = data.findIndex(item => item.get('postId')===parseInt(popupId));
        unavailableModify(index,popupId,this.props.data);
        TimelineActions.setFeedContext({'index': index,'text': data.getIn([index,'modifyText'])});
    }
    handleWriteInput = (e) => {
        const {id,innerText} = e.target;
        handleWriteModifyLetter(this.props.data,innerText,id);
    }
        
    handleViewChange = (e) => {
        const {id} = e.target;
        handleShowMenuVisible(this.props.data,id);
    }
    handleShowLevel = async(e) => {
        const {id} = e.target;
        const {postid} = e.target.dataset;
        modifyShowLevel(this.props.data,postid,id);
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

    render(){
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const commentThumbnail = storage.get('loggedInfo').thumbnail; 
        const hostUser = storage.get('loggedInfo').username;
        const {hashdisplay,keyid,totalNum,postPopupDisplay,popupText,popupDisplay} = this.props;
        const {followNum,followerNum,thumbnail,comment,username,nickname,postNum,followDisplay,isfollow,commentCategory} = this.props;
        const {handleFollowClick,handleLikeClick,handleUnLikeClick,enterComment,handleCommentAdd
            ,handleComment,handleMenu,handleImageChange,handleCancel,modifyClick,handleImage
            ,handleWriteInput,handleViewChange,handleShowLevel,handleOk,buttonClick} = this;
        return(
            <div>
            <PageWrapper>
            <FeedList hostUser={hostUser} commentThumbnail = {commentThumbnail} change = {handleImageChange}
            thumbnail = {thumbnail} comment ={comment} username={username} nickname={nickname}
            followNum = {followNum} followerNum = {followerNum}  followclick={handleFollowClick}
             followdisplay ={followDisplay} postNum={postNum} isfollow = {isfollow} like = {handleLikeClick}
             mainfeed={data} hashdisplay = {hashdisplay} hover = {overHashTag} handleComment = {handleComment}
             nothover={outHashTag} keyid = {keyid} cancel = {handleUnLikeClick} totalNum = {totalNum}
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
        userResult : state.auth.get('result'),
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
        UserActions : bindActionCreators(userActions,dispatch),
        AuthActions: bindActionCreators(authActions,dispatch)

    })
)(TimelineContainer);