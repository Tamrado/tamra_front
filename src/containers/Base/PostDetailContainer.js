import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../../lib/storage';
import * as timelineActions from '../../redux/modules/timeline';
import * as commentActions from '../../redux/modules/comment';
import * as postActions from '../../redux/modules/post';
import * as likeActions from '../../redux/modules/like';
import {CommentList,DetailPostView} from '../../components/DetailPost';
import {clickDetailCommentAdd,renderDetailCommentListAfterCommentAdd,setCommentTime,initializeDetailCommentList,
    returnCommentContextAndInitalize} from '../Function/CommentModule';
import {setTimelineActions,setLikeActions,setCommentActions} from '../Function/setActionModule';
import {clickLike,clickUnLike,setTotalLikeAfterClickLike} from '../Function/PostModule';
import {dateTimeToFormatted} from '../Function/dateTimeModule';
class PostDetailContainer extends Component{
    state = {
        pageCount : 0
    }
    componentDidMount=async()=>{
        this.timerId = setInterval(
            ()=>this.setPostTime(),60000);
        setTimelineActions(this.props.TimelineActions);
        setLikeActions(this.props.LikeActions);
        setCommentActions(this.props.CommentActions);
        await this.renderPageInfo();
        await this.renderCommentInfo();
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
        clearInterval(this.commentTimer);
    }
    setImageSize=async(index)=>{
        const{presentPost,PostActions} = this.props;
        let imageSize = await this.getImageSize(presentPost.getIn(['feed','files',index,'original']));
        await PostActions.setFileSize(imageSize);
    }
    renderPageInfo=async()=>{
    const {postid,TimelineActions,imageIndex} = this.props;
    let index = imageIndex.substr(1);
    const id = postid.substr(1);
    await TimelineActions.getFeedInformationDetail(id);
    await this.setPostTime();
    const{presentPost} = this.props;
    await this.setImageSize(index);
    if(presentPost.getIn(['feed','files']) > 1)
        TimelineActions.setImageArrowVisible('block');
    }
    getImageSize= (url)=> {
        return new Promise((resolve, reject) => {
          let image = new Image()
          image.onload = () => {
            resolve({
              width: image.naturalWidth,
              height: image.naturalHeight
            })
          }
          image.src = url
        })
      }
    renderCommentInfo =async()=>{
        console.log(1);
        const{presentPost,postid} = this.props;
        const id = postid.substr(1);
        await initializeDetailCommentList(presentPost,postid);
        const{comments,lastComment}=this.props;
        await renderDetailCommentListAfterCommentAdd(comments,lastComment,id);
        await setCommentTime(this.props.commentList,'detail',this.props.data,id);
        this.commentTimer = setInterval(()=>setCommentTime(this.props.commentList,'detail',this.props.data,id),60000);
    }
    setPostTime = async() => {
        const{presentPost,TimelineActions} = this.props;
        let time = presentPost.getIn(['feed','timestamp']);
        let timestring = dateTimeToFormatted(time);
        await TimelineActions.setDetailTime(timestring);
    }
    handleLeft = async() => {
        const {presentPost,imageIndex,history,postid} = this.props;
        let index = imageIndex.substr(1);
        let imageSize = presentPost.getIn(['feed','files']).size;
        this.setState({
            pageCount : this.state.pageCount + 1
        });
        if(parseInt(index) === 0) {
            await this.setImageSize(imageSize -1);
            history.push(`/feed/@${postid}/image/:${imageSize-1}`);
        }
        else {
            await this.setImageSize(parseInt(index)-1);
            history.push(`/feed/@${postid}/image/:${parseInt(index)-1}`);
        }
    }
    handleRight = async() => {
        const {presentPost,imageIndex,history,postid,PostActions} = this.props;
        let index = imageIndex.substr(1);
        let size = await this.getImageSize(presentPost.getIn(['feed','files',index,'original']));
        PostActions.setFileSize(size);
        this.setState({
            pageCount : this.state.pageCount + 1
        });
        let imageSize = presentPost.getIn(['feed','files']).size;
        if(parseInt(index) === imageSize-1) {
            await this.setImageSize(0);
            history.push(`/feed/@${postid}/image/:0`);
        }
        else {
            await this.setImageSize(parseInt(index)+1);
            history.push(`/feed/@${postid}/image/:${parseInt(index)+1}`);
        }
    }
    handleCommentAdd = async() =>{
        const {presentPost,postid} = this.props;
        await clickDetailCommentAdd(postid,presentPost);
        const{comments,lastComment} = this.props;
        await renderDetailCommentListAfterCommentAdd(comments,lastComment,postid.substr(1));
        await setCommentTime(this.props.commentList,'detail',this.props.data,postid.substr(1));
    }
    enterComment = async(e) =>{
        if(window.event.keyCode === 13){
        await returnCommentContextAndInitalize(e,null);
        var {TimelineActions,commentNum,postid} = this.props;
        await TimelineActions.setCommentNum({'commentNum':commentNum,'commentId':postid.substr(1)});
        await this.renewComment(postid.substr(1));  
        }
    }
    renewComment=async(id)=>{
            const {presentComment,TimelineActions,postid} = this.props;
            await TimelineActions.renewDetailComment({'commentId' : id,'presentComment':presentComment});
            await TimelineActions.renewComment({'commentId' : id,'presentComment':presentComment});
            await setCommentTime(this.props.commentList,'detail',this.props.data,postid.substr(1));
        };
    handleLikeClick = async(e) =>{
        await clickLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);
               
    }
    handleCancelClick =async(e) => {
        await clickUnLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);
        }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const {thumbnail,username,nickname} = storage.get('loggedInfo');
        const {presentPost,commentList,fileSize,imageIndex,history,trueComment,postid} = this.props;
        const {handleLeft,handleRight,enterComment,handleCommentAdd,handleCancelClick,
            handleLikeClick} = this;
        let index = imageIndex.substr(1);
        let postId = postid.substr(1);
        return (
            <DetailPostView mainfeed = {presentPost.toJS()}  fileSize = {fileSize} imageIndex = {index}
             history={history} handleLeft={handleLeft} handleRight={handleRight} pageCount = {this.state.pageCount} > 
                <CommentList comments = {commentList} commentThumbnail = {thumbnail} name={nickname}
            userId= {username} enterComment = {enterComment} handleCommentAdd = {handleCommentAdd}
            trueComment = {trueComment} postId={postId} mainfeed = {presentPost.toJS()} cancel={handleCancelClick}
            like = {handleLikeClick}/>
            </DetailPostView>
        )
    }
}
export default connect(
    (state) => ({
        presentPost : state.timeline.get('presentPost'),
        lastComment : state.comment.get('lastComment'),
        comments : state.comment.get('commentList'),
        commentList : state.timeline.getIn(['presentPost','feed','commentList']),
        fileSize : state.post.get('fileSize'),
        commentNum : state.comment.get('commentNum'),
        trueComment : state.timeline.getIn(['presentPost','feed','trueComment']),
        totalNum : state.like.get('totalNum'),
        presentComment : state.comment.get('presentComment'),
        data : state.timeline.get('mainfeed')
    }),
    (dispatch) => ({
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch)
    })
)(PostDetailContainer);