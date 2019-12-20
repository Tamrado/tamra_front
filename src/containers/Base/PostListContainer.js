import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/PostList';
import {WriteBox,TagList,WithList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
class PostListContainer extends Component{

    state  = {
        display : 'none',
        writeDisplay : 'none',
        opacity : 1,
        withfriend : null,
        withdisplay : 'none',
        withfriendDisplay : 'none'
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
    handleWithBox = () => {
        this.setState({
            withfriendDisplay: 'block'
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
      closeWithBox = () => {
          this.setState({
              withfriendDisplay : 'none'
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
           this.closeModal();
           this.closeWithBox();
        }

        }
    
    handleWrite = () => {

    }
    handleFriendInfo = async(e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        let count = 0;
        await PostActions.setFriendInfo({'id':id,'nickname': e.target.getAttribute('data-nickname'), 'thumbnail' : e.target.getAttribute('data-thumbnail')});
        this.setState({
            withdisplay : 'block'
        });
        const{withData} = this.props;
        console.log(withData.toJS());
        await withData.toJS().forEach(item => count++);
       
        if(count > 1){
            this.setState({
                withfriend : withData.toJS()[0].nickname+'님 외 '+String(count-1)+'명과 함께' 
            });
        }
        else{
            this.setState({
                withfriend : withData.toJS()[0].nickname+'님과 함께' 
            });
        }
        this.closeModal();
    }
    
    getFeedList = () => {
        const{PostActions} = this.props;
        const username = storage.get('loggedInfo').username;
        try{
            PostActions.getFeedInformation(username);
        }catch(e){
            console.log(e);
        }
        
    }
    
    handleFriendCancel = async(e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        let count = 0;
        await PostActions.removeFriend(id);
        const{withData} = this.props;
        console.log(withData.toJS());
        await withData.toJS().forEach(item => count++);
       
        if(count > 1){
            this.setState({
                withfriend : withData.toJS()[0].nickname+'님 외 '+String(count-1)+'명과 함께' 
            });
        }
        else if(count > 0){
            this.setState({
                withfriend : withData.toJS()[0].nickname+'님과 함께' 
            });
        }
        else this.setState({
            withdisplay : 'none',
            withfriendDisplay : 'none'
        });
    }

    render(){
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            window.location.href = '/auth/Login';
            return;
        }
        const username = storage.get('loggedInfo').nickname;
        const {friendData,withData} = this.props;
        const {opacity,display,writeDisplay,withdisplay,withfriend,withfriendDisplay} = this.state;
        const {closeWithBox,handleWrite,handleFriendInfo,openModal,closeModal,openWriteModal,closeWriteModal,handleFriendCancel,handleWithBox} = this;
        return(
            <div>
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWrite} opacity = {opacity} click={openModal} display = {writeDisplay} close = {closeWriteModal}/>
            <WithList friend = {withData} opacity = {opacity} display = {withfriendDisplay}
             cancel = {handleFriendCancel} close={closeWithBox} />
            <TagList opacity = {opacity} friends = {friendData} onclick = {handleFriendInfo} close={closeModal}
             display = {display} cancel = {handleFriendCancel}/>
            <PageWrapper>
            <FeedList feeds={data} username = {username} onclick = {openWriteModal}  />
            </PageWrapper>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        data : state.post.get('feed'),
        withData : state.post.get('friendInfo'),
        friendData : state.friend.get('friend')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch)

    })
)(PostListContainer);