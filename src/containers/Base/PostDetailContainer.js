import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../../lib/storage';
import * as timelineActions from '../../redux/modules/timeline';
import * as commentActions from '../../redux/modules/comment';
import * as postActions from '../../redux/modules/post';
import * as likeActions from '../../redux/modules/like';
import {CommentList,DetailPostView} from '../../components/DetailPost';
class PostDetailContainer extends Component{
    state = {
        pageCount : 0
    }
    componentDidMount=async()=>{
        await this.renderPageInfo();
        await this.renderCommentInfo();
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
    setImageSize=async(index)=>{
        const{presentPost,PostActions} = this.props;
        let imageSize = await this.getImageSize(presentPost.getIn(['feed','files',index,'original']));
        await PostActions.setFileSize(imageSize);
    }
    renderPageInfo=async()=>{
    const {postid,TimelineActions,PostActions,imageIndex} = this.props;
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
        const {CommentActions,TimelineActions,presentPost,postid} = this.props;
        const id = postid.substr(1);
        let page = presentPost.getIn(['feed','commentPage']);
            await CommentActions.showPostCommentList(id,page);
            await TimelineActions.setDetailCommentPage(id);
            const{comments,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setDetailCommentList({'commentId' : id,'commentList':comments,'trueComment' :false});
            else
            await TimelineActions.setDetailCommentList({'commentId' : id,'commentList':comments,'trueComment' :true});
            await this.setCommentTime();
    }
    setPostTime = async() => {
        const{presentPost,TimelineActions} = this.props;
        let time = presentPost.getIn(['feed','timestamp']);
        let timestring = this.dateTimeToFormatted(time);
        await TimelineActions.setDetailTime(timestring);
    }

    setCommentTime = async() => {
        const{presentPost,TimelineActions,commentList} = this.props;
        const comments = commentList;
                await Promise.all(
                    comments.map(
                        async(comment,commentIndex) => {
                            let time = comment.timestamp;
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setDetailCommentTime({timestring:timestring,commentIndex:commentIndex});
                        }
                    )
                );
    }
    handleLeft = async() => {
        const {presentPost,imageIndex,history,postid,PostActions} = this.props;
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
        const {TimelineActions,CommentActions,presentPost,postid} = this.props;
        const id = postid.substr(1);
        if(presentPost.getIn(['feed','trueComment'])){
            
            const page = presentPost.getIn(['feed','commentPage']);
            try{
                await CommentActions.showPostCommentList(id,page);
                await TimelineActions.setDetailCommentPage(id);
                const{comments,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setDetailCommentList({'commentId':id,'commentList':comments,'trueComment' :false});
            else
            await TimelineActions.setDetailCommentList({'commentId':id,'commentList':comments,'trueComment' :true});
            await this.setCommentTime(id);
            }catch(e){
                TimelineActions.setCommentFalse(id);
            }
        } 
    }
    enterComment = async(e) =>{
        if(window.event.keyCode === 13){
            const {CommentActions,TimelineActions,postid} = this.props;
            const {innerText} = e.target;
            const id = postid.substr(1);
            var content = innerText;
            content = content.replace(/\r/g, "");
            content = content.replace(/\n/g, "");
            await CommentActions.writeComment({id,content});
            await CommentActions.showPostCommentList(id,1);
            this.renewComment(id);
            
            for(var i = 0; i < document.getElementsByName('^^comment').length; i++){
                console.log(document.getElementsByName('^^comment')[i].id);
                if(parseInt(document.getElementsByName('^^comment')[i].id) === parseInt(id)){
                    document.getElementsByName('^^comment')[i].textContent = '';
                    document.getElementsByName('^^comment')[i].blur();
                }
            }
            await CommentActions.getCommentNum(id);
            var {commentNum} = this.props;
            await TimelineActions.setCommentNum({'commentNum':commentNum,'commentId':id});
            await this.setCommentTime(id);
            
        }
    }
    renewComment=(id)=>
        setTimeout(async()=>{
            const {presentComment,TimelineActions} = this.props;
            await TimelineActions.renewDetailComment({'commentId' : id,'presentComment':presentComment});
            await this.setCommentTime(id);
        },2000);
        handleLikeClick = async(e) =>{
            const {LikeActions,TimelineActions} = this.props;
            const id = e.target.id;
            await TimelineActions.setLikeKey(id);
            await LikeActions.clickLike(id);
            await TimelineActions.setDetailLike('none');
            await TimelineActions.setLike('none');
            try{
            await LikeActions.getLikeAndUserList(id,1);
            }catch(e){}
            const {totalNum} = this.props;
            await TimelineActions.setDetailLikeNum(totalNum);
            await TimelineActions.setLikeNum(totalNum);
               
        }
        handleCancelClick =async(e) => {
            const {LikeActions,TimelineActions} = this.props;
            const id = e.target.id;
            await TimelineActions.setLikeKey(id);
            await LikeActions.cancelLike(id);
            await TimelineActions.setDetailLike('block');
            await TimelineActions.setLike('block');
            try{
            await LikeActions.getLikeAndUserList(id,1);
            }catch(e){}
            const {totalNum} = this.props;
            await TimelineActions.setDetailLikeNum(totalNum);
            await TimelineActions.setLikeNum(totalNum);
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
        presentComment : state.comment.get('presentComment')
    }),
    (dispatch) => ({
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch)
    })
)(PostDetailContainer);