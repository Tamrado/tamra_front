import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TagList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import * as searchActions from '../../redux/modules/search';
import storage from '../../lib/storage';
import {closeModal,scrollingAction,setOpacity} from '../Function/PostModule';
class TagListContainer extends Component{
     
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        this.props.PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
      }
      handleScroll = (e) => {
       scrollingAction(e);
       setOpacity(this.props.opacity);
      }
    
    handleFriendInfo = async(e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        let count = 0;
        await PostActions.setFriendInfo({'username':id,'nickname': e.target.getAttribute('data-nickname'), 'thumbnail' : e.target.getAttribute('data-thumbnail')});
        PostActions.setWithDisplay('display');
        const{withData} = this.props;
        await withData.toJS().forEach(item => count++);
       
        if(count > 1){
            PostActions.setWithFriend(withData.toJS()[0].nickname+'님 외 '+String(count-1)+'명과 함께');
        }
        else{
            PostActions.setWithFriend( withData.toJS()[0].nickname+'님과 함께');
        }
        closeModal();
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
            PostActions.setWithFriend(withData.toJS()[0].nickname+'님 외 '+String(count-1)+'명과 함께');
        }
        else if(count > 0){
            PostActions.setWithFriend(withData.toJS()[0].nickname+'님과 함께');
        }
        else{
            PostActions.setWithDisplay('block'); 
            this.setState({
            withfriendDisplay : 'none'
        });
    }
    }

      handleSearch = () => {
          const{SearchActions,friendContent} = this.props;
          SearchActions.searchInFriendlist(friendContent);
          
      }
      handleSearchContent = (e) => {
        const {SearchActions} = this.props;
        const {innerText} = e.target;
        
        SearchActions.setFriendContent(innerText);
      }
      
      enterSearch = () => {
          if(window.event.keyCode === 13)
            this.handleSearch();
      }

    render(){
        const {friendList,friendContent,display,opacity} = this.props;
        const {handleFriendInfo,handleFriendCancel,
        handleSearch,handleSearchContent,enterSearch} = this;
        return(
            <TagList opacity = {opacity} friends = {friendList} search = {handleSearch} onclick = {handleFriendInfo} close={closeModal}
             display = {display} cancel = {handleFriendCancel} handlecontent = {handleSearchContent} content = {friendContent} enter = {enterSearch}/>
            
        );
    }
}

export default connect(
    (state) => ({
        friendContent : state.search.get('friendContent'),
        friendList : state.search.get('friendList'),
        display : state.post.get('display'),
        withdisplay : state.post.get('withDisplay'),
        withData : state.post.get('friendInfo'),
        opacity : state.post.get('opacity')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch)

    })
)(TagListContainer);