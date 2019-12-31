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
        this.props.TimelineActions.setKey(-1);
        this.props.TimelineActions.setMainfeed();
        this.props.TimelineActions.setIsTruePost();
        await this.props.TimelineActions.setPage();
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        this.props.PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
         this.getFeedList();
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
    handleLikeClick = (e) =>{
        const {likedisplay,LikeActions,TimelineActions} = this.props;
        TimelineActions.setKey(e.target.id);
        if(likedisplay === 'none'){
            LikeActions.clickLike(e.target.id);
        }
        else{
            LikeActions.cancelLike(e.target.id);
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
        const {writtenData,hashdisplay,keyid,category,sender,likedisplay} = this.props;
        const {openWriteModal,overHashTag,outHashTag,handleStateClick,handleLikeClick} = this;
        
        return(
            <PageWrapper>
            <FeedList mainfeed={data} username = {username} onclick = {openWriteModal} stateclick={handleStateClick} content ={
                writtenData.split('\n').map( line => {
            return (<div style={style} >{line}<br/></div>)
          })
        } hover = {overHashTag} nothover={outHashTag} hashdisplay={hashdisplay} keyid = {keyid} like={handleLikeClick}
         category = {category} sender = {sender} likedisplay={likedisplay}/>
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
        likedisplay : state.like.get('likedisplay')
    }),
    (dispatch) => ({
        TimelineActions: bindActionCreators(timelineActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        PostActions : bindActionCreators(postActions,dispatch),
        LikeActions : bindActionCreators(likeActions,dispatch)

    })
)(PostListContainer);