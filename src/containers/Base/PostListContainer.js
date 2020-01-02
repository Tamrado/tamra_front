import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/PostList';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import * as timelineActions from '../../redux/modules/timeline';
import * as searchActions from '../../redux/modules/search';
import * as likeActions from '../../redux/modules/like';
import * as commentActions from '../../redux/modules/comment';
import storage from '../../lib/storage';
class PostListContainer extends Component{
    openWriteModal = () => {
        this.props.PostActions.setWriteDisplay('block');
    }
    handleScroll = async(e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        const { innerHeight } = window;
      const { scrollHeight } = document.body;
    
      if (scrollTop+innerHeight >scrollHeight & this.props.isTruePost) {
        this.getFeedList();
        await this.props.TimelineActions.addPage();
        }
    }
    componentDidMount= async() =>{
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        await this.props.PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
         await this.getFeedList();
        await this.props.TimelineActions.addPage();
      }

      getFeedList = async() => {
        const{TimelineActions,page,isTruePost} = this.props;
        if(isTruePost){
            try{
                await TimelineActions.getMainInformation(page);
                
            }catch(e){
               
                await TimelineActions.setFalsePost();
                
            }
            
        }
    }
    overHashTag = (e) =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('block');
        TimelineActions.setKey(e.target.id);
        TimelineActions.setCategoryId(e.target.dataset.category);
        TimelineActions.setSenderId(e.target.dataset.sender);
    }
    outHashTag = (e) =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('none');
          
    }
    handleStateClick = (e) =>{
        window.location.href =`/@:${e.target.id}`;
    }
    handleLikeClick = async(e) =>{
        const {LikeActions,TimelineActions,data} = this.props;
        const id = e.target.id;
        await TimelineActions.setLikeKey(id);
        await LikeActions.clickLike(id);
        await TimelineActions.setLike('none');
        try{
        await LikeActions.getLikeAndUserList(id,1);
        }catch(e){}
        const {totalNum} = this.props;
        await TimelineActions.setLikeNum(totalNum);
           
    }
    handleCancelClick =async(e) => {
        const {LikeActions,TimelineActions} = this.props;
        const id = e.target.id;
        await TimelineActions.setLikeKey(id);
        await LikeActions.cancelLike(id);
        await TimelineActions.setLike('block');
        try{
        await LikeActions.getLikeAndUserList(id,1);
        }catch(e){}
        const {totalNum} = this.props;
        await TimelineActions.setLikeNum(totalNum);
    }
    handleComment =async(e)=>{
        const {CommentActions,commentdisplay,page} = this.props;
        const {id} = e.target;
        const {category,sender} = e.target.dataset;
        CommentActions.setCommentCategory(category);
        CommentActions.setCommentId(id);
        CommentActions.setCommentSender(sender);
        if(commentdisplay === 'none'){
        CommentActions.setCommentDisplay('block');
        await CommentActions.showPostCommentList(id,page);
        await CommentActions.addPage();
        }
        else{
        CommentActions.setCommentDisplay('none');
        }
    }
    render(){
        
        const {data} = this.props;
        const style = {
            lineHeight: '160%'
        };
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const username = storage.get('loggedInfo').nickname;
        const thumbnail = storage.get('loggedInfo').thumbnail;
        const {writtenData,hashdisplay,keyid,category,sender,totalNum,commentList,commentdisplay,commentId,commentSender,commentCategory} = this.props;
        const {openWriteModal,overHashTag,outHashTag,handleStateClick,handleLikeClick,handleCancelClick,handleComment} = this;
        
        return(
            <PageWrapper>
            <FeedList mainfeed={data} username = {username} onclick = {openWriteModal} stateclick={handleStateClick} content ={
                writtenData.split('\n').map( line => {
            return (<div style={style} >{line}<br/></div>)
          })
        } hover = {overHashTag} nothover={outHashTag} hashdisplay={hashdisplay} keyid = {keyid} like={handleLikeClick}
         category = {category} sender = {sender} cancel={handleCancelClick} totalNum={totalNum} handleComment={handleComment}
         comment={commentList} commentdisplay ={commentdisplay} thumbnail={thumbnail} commentId={commentId}
          commentSender={commentSender} commentCategory={commentCategory} />
         
            </PageWrapper>
        );
    }
}

export default connect(
    (state) => ({
        writtenData : state.post.get('writtenData'),
        data : state.timeline.get('mainfeed'),
        page : state.timeline.get('page'),
        isTruePost : state.timeline.get('isTruePost'),
        hashdisplay : state.timeline.get('hashdisplay'),
        keyid : state.timeline.get('keyid'),
        category : state.timeline.get('categoryid'),
        sender : state.timeline.get('senderid'),
        totalNum : state.like.get('totalNum'),
        commentList : state.comment.get('commentList'),
        commentdisplay : state.comment.get('commentdisplay'),
        commentCategory : state.comment.get('commentCategory'),
        commentSender : state.comment.get('commentSender'),
        commentId : state.comment.get('commentId')
    }),
    (dispatch) => ({
        TimelineActions: bindActionCreators(timelineActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch)

    })
)(PostListContainer);