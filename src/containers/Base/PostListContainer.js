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
                await this.setPostTime();
            }catch(e){
                await TimelineActions.setFalsePost();
            }
            
        }
    }
    setPostTime = async() => {
        const{data,TimelineActions} = this.props;
                await Promise.all(
                    data.map(
                        async(feed,index) => {
                            let time = feed.getIn(['feed','timestamp']);
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setTime({timestring:timestring,index : index});
                        }
                    )
                );
    }

    setCommentTime = async(id) => {
        const{data,TimelineActions} = this.props;
        let index = data.findIndex(item => item.getIn(['feed','postId'])===parseInt(id));
        const comments = data.getIn([index,'feed','commentList']);
                await Promise.all(
                    comments.map(
                        async(comment,commentIndex) => {
                            console.log(comment.timestamp);
                            let time = comment.timestamp;
                            let timestring = this.dateTimeToFormatted(time);
                            await TimelineActions.setCommentTime({timestring:timestring,index : index,commentIndex:commentIndex});
                        }
                    )
                );
    }
    
    overHashTag = (e) =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('block');
        TimelineActions.setKey(e.target.id);
        TimelineActions.setCategoryId(e.target.dataset.category);
    }
    outHashTag = (e) =>{
        const {TimelineActions} = this.props;
        TimelineActions.setHashDisplay('none');
          
    }
    handleStateClick = (e) =>{
        window.location.href =`/@:${e.target.id}`;
    }
    handleLikeClick = async(e) =>{
        const {LikeActions,TimelineActions} = this.props;
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
        const {CommentActions,TimelineActions,data} = this.props;
        const {id} = e.target;
        const {category} = e.target.dataset;
        await TimelineActions.setCommentCategory(category);
        await TimelineActions.setCommentDisplay(id);
        const{commentdisplay} = this.props;
        if(commentdisplay === 'block'){
            let index = data.findIndex(item => item.getIn(['feed','postId'])===parseInt(id));
            let page = data.getIn([index,'feed','commentPage']);
            await CommentActions.showPostCommentList(id,page);
            await TimelineActions.setCommentPage(id);
            const{commentList,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setCommentList({'commentId' : id,'commentList':commentList,'trueComment' :false});
            else
            await TimelineActions.setCommentList({'commentId' : id,'commentList':commentList,'trueComment' :true});
            await this.setCommentTime(id);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.data !== this.props.data;
    }
   componentDidUpdate(prevProps, prevState, snapshot){
        if(snapshot){
            this.setPostTime();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data !== nextProps.data || this.props.writtenData !== nextProps.writtenData ||
        this.props.hashdisplay !== nextProps.hashdisplay;
    }
    handleCommentAdd = async(e) =>{
        const {id} = e.target;
        const {TimelineActions,CommentActions,data} = this.props;
        const index = data.findIndex(item => item.getIn(['feed','postId']) ===parseInt(id));
        if(data.getIn([index,'feed','trueComment'])){
            
            const page = data.getIn([index,'feed','commentPage']);
            try{
                await CommentActions.showPostCommentList(id,page);
                await TimelineActions.setCommentPage(id);
                const{commentList,lastComment}=this.props;
            if(lastComment)
            await TimelineActions.setCommentList({'commentId':id,'commentList':commentList,'trueComment' :false});
            else
            await TimelineActions.setCommentList({'commentId':id,'commentList':commentList,'trueComment' :true});
            await this.setCommentTime(id);
            }catch(e){
                TimelineActions.setCommentFalse(id);
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
            await TimelineActions.setCommentNum({'commentNum':commentNum,'commentId':id});
            await this.setCommentTime(id);
            
        }
    }
    renewComment=(id)=>
        setTimeout(async()=>{
            const {presentComment,TimelineActions} = this.props;
            await TimelineActions.renewComment({'commentId' : id,'presentComment':presentComment});
            await this.setCommentTime(id);
        },2000);

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
        const {openWriteModal,overHashTag,outHashTag,handleStateClick,handleLikeClick,enterComment,handleCommentAdd
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
          thumbnail={thumbnail} commentCategory={commentCategory} enterComment={enterComment}/>
         
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