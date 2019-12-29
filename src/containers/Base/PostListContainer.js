import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/PostList';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import * as searchActions from '../../redux/modules/search';
import storage from '../../lib/storage';
class PostListContainer extends Component{
    openWriteModal = () => {
        this.props.PostActions.setWriteDisplay('block');
    }
    handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        const { innerHeight } = window;
      const { scrollHeight } = document.body;
    
      if (scrollTop+innerHeight >scrollHeight ) {
        setTimeout(this.getFeedList(),2000);
        setTimeout(this.props.PostActions.addPage(),2000);
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        this.props.PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
        this.getFeedList();
        setTimeout(this.props.PostActions.addPage(),2000);
      }
    
      getFeedList = async() => {
        const{PostActions,page,isTruePost} = this.props;
        if(isTruePost){
            const username = storage.get('loggedInfo').username;
            try{
                await PostActions.getFeedInformation(username,page);
                
                return;
            }catch(e){
                console.log(e);
               await PostActions.setFalsePost();
                return;
            }
            
        }
    }
    overHashTag = (e) =>{
        const {PostActions} = this.props;
        PostActions.setHashDisplay('block');
        PostActions.setKey(e.target.id);
    }
    outHashTag = (e) =>{
        const {PostActions} = this.props;
        PostActions.setHashDisplay('none');
        PostActions.setKey(e.target.id);
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
        const {writtenData,hashdisplay,keyid} = this.props;
        const {openWriteModal,overHashTag,outHashTag} = this;
       
        return(
            <PageWrapper>
            <FeedList feeds={data} username = {username} onclick = {openWriteModal} content ={
                writtenData.split('\n').map( line => {
            return (<div style={style} >{line}<br/></div>)
          })
        } hover = {overHashTag} nothover={outHashTag} hashdisplay={hashdisplay} keyid = {keyid} />
            </PageWrapper>
        );
    }
}

export default connect(
    (state) => ({
        writtenData : state.post.get('writtenData'),
        data : state.post.get('feed'),
        page : state.post.get('page'),
        isTruePost : state.post.get('isTruePost'),
        hashdisplay : state.post.get('hashdisplay'),
        keyid : state.post.get('keyid')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch)

    })
)(PostListContainer);