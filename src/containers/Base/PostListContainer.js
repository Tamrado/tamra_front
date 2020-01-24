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
import {setTimelineActions,setLikeActions,setCommentActions} from '../Function/setActionModule';
import {setCommentTime,renderCommentListAfterCommentAdd,clickCommentAdd,setCommentListDisplay,initializeCommentList,
    returnCommentContextAndInitalize} from '../Function/CommentModule';
import {outHashTag,overHashTag,getFeedList,setPostTime,scrollAction,clickLike,setTotalLikeAfterClickLike,
clickUnLike} from '../Function/PostModule';
class PostListContainer extends Component{
    componentDidMount= () =>{
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        setTimelineActions(this.props.TimelineActions);
        setLikeActions(this.props.LikeActions);
        setCommentActions(this.props.CommentActions);
        this.initializePage();
      }
      initializePage = async()=>{
          const{TimelineActions,PostActions} = this.props;
        await PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
         await getFeedList(1,true,null);
         await setPostTime('postList',this.props.data);
        await TimelineActions.addPage();
        this.timerId = setInterval(
            ()=>setPostTime('postList',this.props.data),60000);
      }
      componentWillUnmount() {
        clearInterval(this.timerId);
        clearInterval(this.commentTimer);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data || this.props.writtenData !== nextProps.writtenData ||
        this.props.hashdisplay !== nextProps.hashdisplay;
    }
    handleImage =(e) =>{
        const {id} = e.target;
        const {imageid} = e.target.dataset;
        this.props.history.push(`/feed/@:${id}/image/:${imageid}`);
    }
    handleComment =async(e)=>{
        const{id} = e.target;
        await setCommentListDisplay(e,'postList');
        const{commentdisplay,data} = this.props;
        if(commentdisplay === 'block'){
        await initializeCommentList(data,'postList',id);
        const{commentList,lastComment} = this.props;
        console.log(this.props.data.toJS());
        await renderCommentListAfterCommentAdd('postList',commentList,lastComment,id);
        setCommentTime(null,'postList',this.props.data,id);
        this.commentTimer = setInterval(()=>setCommentTime(null,'postList',this.props.data,id),60000);
        }
    }
    openWriteModal = () => {
        this.props.PostActions.setWriteDisplay('block');
    }
    handleScroll = async(e) => {
        const {isTruePost,page} = this.props;
        scrollAction(e,isTruePost,page,null);
    }
    
    handleStateClick = (e) =>{
        window.location.href =`/@:${e.target.id}`;
    }
    handleLikeClick = async(e) =>{
        await clickLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);
    }
    handleCancelClick =async(e) => {
        await clickUnLike(e);
        await setTotalLikeAfterClickLike(this.props.totalNum);
    }
   
   
    handleCommentAdd = async(e) =>{
        await clickCommentAdd(e,this.props.data,'postList');
        const {commentList,lastComment,data} = this.props;
        const {id} = e.target;
        await renderCommentListAfterCommentAdd('postList',commentList,lastComment,data,id);
    }
    enterComment = async(e) =>{
        if(window.event.keyCode === 13){
            const {id} = e.target;
        await returnCommentContextAndInitalize(e,null);
        var {commentNum,TimelineActions} = this.props;
        await TimelineActions.setCommentNum({'commentNum':commentNum,'commentId':id});
        await this.renewComment(id);   
        } 
    }
    renewComment=async(id)=>{
        const {presentComment,TimelineActions} = this.props;
        await TimelineActions.renewComment({'commentId' : id,'presentComment':presentComment});
        await setCommentTime(null,'postList',this.props.data,id);
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
        const {writtenData,hashdisplay,keyid,category,totalNum,commentCategory,PostActions} = this.props;
        const {openWriteModal,handleStateClick,handleLikeClick,enterComment,handleCommentAdd,handleImage
            ,handleCancelClick,handleComment} = this;
        if(writtenData === '') PostActions.setWrittenData(`${username}님, 무슨 일이 있으셨나요?`);
        return(
            <PageWrapper>
            <FeedList mainfeed={data} username = {username} onclick = {openWriteModal} stateclick={handleStateClick} content ={
                writtenData.split('\n').map( (line,index) => {
            return (<div key={index} style={style} >{line}<br/></div>)
          })}
           hover = {overHashTag} nothover={outHashTag} hashdisplay={hashdisplay} keyid = {keyid} like={handleLikeClick}
         category = {category} cancel={handleCancelClick} totalNum={totalNum} handleComment={handleComment} handleCommentAdd = {handleCommentAdd}
          thumbnail={thumbnail} commentCategory={commentCategory} enterComment={enterComment} handleImage={handleImage}/>
         
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
        TimelineActions: bindActionCreators(timelineActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch),
        CommentActions : bindActionCreators(commentActions,dispatch)

    })
)(PostListContainer);