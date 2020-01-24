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
import {setUserActions,setTimelineActions,setPostActions,setFriendActions,setLikeActions,setCommentActions} from '../Function/setActionModule';
import {handleLogout} from '../Function/SignModule';
import {setCommentTime,renderCommentListAfterCommentAdd,clickCommentAdd,returnCommentContextAndInitalize,setCommentListDisplay,initializeCommentList} from '../Function/CommentModule';
import {setPostTime,getFeedList,overHashTag,outHashTag,handlePopupCancel,handlePopupOk,scrollAction,
    clickLike,setTotalLikeAfterClickLike,clickUnLike} from '../Function/PostModule';
import storage from '../../lib/storage';
import { getProfileInfo,setProfileInfo,clickFollow } from '../Function/TimelineModule';

class TimelineContainer extends Component{
    componentDidMount=()=>{
        window.addEventListener("scroll", this.handleScroll);
        const {UserActions,TimelineActions,PostActions,FriendActions,LikeActions,CommentActions} = this.props;
        setUserActions(UserActions);
        setTimelineActions(TimelineActions);
        setPostActions(PostActions);
        setFriendActions(FriendActions);
        setLikeActions(LikeActions);
        setCommentActions(CommentActions);
        this.initialize();
        
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
        await initializeCommentList(data,'timeline',id);
        const{commentList,lastComment} = this.props;
        await renderCommentListAfterCommentAdd('timeline',commentList,lastComment,id);
        setCommentTime(null,'timeline',this.props.data,id);
        this.commentTimer = setInterval(()=>setCommentTime(null,'timeline',this.props.data,id),60000);
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
        const {commentList,lastComment,data} = this.props;
        await renderCommentListAfterCommentAdd('timeline',commentList,lastComment,data,id);
    }
    enterComment = async(e) =>{
        const{id} = e.target;
        if(window.event.keyCode === 13){
            returnCommentContextAndInitalize(e,null);
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
        const {AuthActions} = this.props;
        let file = e.target.files[0];
        var formdata = new FormData();
        formdata.set('file',file);
        await AuthActions.modifyUserImage(formdata);
        const {userResult} = this.props;
        console.log(userResult.toJS());
        storage.remove('loggedInfo');
        storage.set('loggedInfo',userResult.toJS());
        window.location.reload();
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