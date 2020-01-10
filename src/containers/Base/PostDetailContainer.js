import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../../lib/storage';
import * as timelineActions from '../../redux/modules/timeline';
import * as commentActions from '../../redux/modules/comment';
import * as postActions from '../../redux/modules/post';
import {CommentList,DetailPostView} from '../../components/DetailPost';
class PostDetailContainer extends Component{
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
    renderPageInfo=async()=>{
    const {postid,TimelineActions,PostActions,imageIndex} = this.props;
    let index = imageIndex.substr(1);
    const id = postid.substr(1);
    await TimelineActions.getFeedInformationDetail(id);
    await this.setPostTime();
    const{presentPost} = this.props;
    let imageSize = await this.getImageSize(presentPost.getIn(['feed','files',index,'original']));
    PostActions.setFileSize(imageSize);
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
            await TimelineActions.setCommentPage(id);
            const{comments,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setCommentList({'commentId' : id,'commentList':comments,'trueComment' :false});
            else
            await TimelineActions.setCommentList({'commentId' : id,'commentList':comments,'trueComment' :true});
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
                            console.log(comment.timestamp);
                            let time = comment.timestamp;
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setDetailCommentTime({timestring:timestring,commentIndex:commentIndex});
                        }
                    )
                );
    }
    handleLeft = () => {
        const {presentPost,imageIndex,history,postid} = this.props;
        let index = imageIndex.substr(1);
        let imageSize = presentPost.getIn(['feed','files']).size;
        if(parseInt(index) === 0) history.push(`/feed/@${postid}/image/:${imageSize-1}`);
        else history.push(`/feed/@${postid}/image/:${parseInt(index)-1}`);
    }
    handleRight = () => {
        const {presentPost,imageIndex,history,postid} = this.props;
        let index = imageIndex.substr(1);
        let imageSize = presentPost.getIn(['feed','files']).size;
        if(parseInt(index) === imageSize-1) history.push(`/feed/@${postid}/image/:0`);
        else history.push(`/feed/@${postid}/image/:${parseInt(index)+1}`);
    }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const {thumbnail,username,nickname} = storage.get('loggedInfo');
        const {presentPost,commentList,fileSize,imageIndex,history} = this.props;
        const {handleLeft,handleRight} = this;
        let index = imageIndex.substr(1);
        return (
            <DetailPostView mainfeed = {presentPost.toJS()}  fileSize = {fileSize} imageIndex = {index}
             history={history} handleLeft={handleLeft} handleRight={handleRight} >
                <CommentList comments = {commentList} commentThumbnail = {thumbnail} name={nickname}
            userId= {username}/>
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
        fileSize : state.post.get('fileSize')
    }),
    (dispatch) => ({
        TimelineActions : bindActionCreators(timelineActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch)
    })
)(PostDetailContainer);