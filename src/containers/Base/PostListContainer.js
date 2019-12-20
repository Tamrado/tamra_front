import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/PostList';
import {WriteBox,TagList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
class PostListContainer extends Component{

    state  = {
        display : 'none',
        writeDisplay : 'none',
        opacity : 1
    };
  
    openModal = () => {
      this.setState({ 
        display : 'block'
        });
    }
    openWriteModal = () => {
        this.setState({
            writeDisplay : 'block'
        })
    }
  
    closeModal = () => {
      this.setState({ 
        display : 'none' 
        }); 
    }
    closeWriteModal = () => {
        this.setState({ 
            writeDisplay : 'none' 
          }); 
      }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.getFeedList();
      }
      handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        this.setState({
            opacity : 1 - scrollTop / 400
        });
        if(this.state.opacity < 0){
           this.closeWriteModal();
        }

        }
    
    handleWrite = () => {

    }
    handleFriendInfo = (e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        PostActions.setFriendInfo({'id':id,'nickname': e.target.getAttribute('data')});
        this.closeModal();
    }
    
    getFeedList = async() => {
        const{PostActions} = this.props;
        const username = storage.get('loggedInfo').username;
        try{
            await PostActions.getFeedInformation(username);
        }catch(e){
            console.log(e);
        }
        
    }

    handleFriendCancel = () => {
        const{PostActions} = this.props;
        const {id} = e.target;
        PostActions.removeFriend(id);
    }

    render(){
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            window.location.href = '/auth/Login';
            return;
        }
        const username = storage.get('loggedInfo').nickname;
        const {friendData} = this.props;
        const {opacity,display,writeDisplay} = this.state;
        const {handleWrite,handleFriendInfo,openModal,closeModal,openWriteModal,closeWriteModal} = this;
        return(
            <div>
            <WriteBox username = {username} onclick = {handleWrite} opacity = {opacity} click={openModal} display = {writeDisplay} close = {closeWriteModal}/>
            <TagList opacity = {opacity} friends = {friendData} onclick = {handleFriendInfo} close={closeModal} display = {display}/>
            <PageWrapper>
            <FeedList feeds={data} username = {username} onclick = {openWriteModal} cancel = {handleFriendCancel} />
            </PageWrapper>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        data : state.post.get('feed'),
        friendData : state.friend.get('friend')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch)

    })
)(PostListContainer);