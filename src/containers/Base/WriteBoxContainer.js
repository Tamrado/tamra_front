import { List} from 'immutable';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WriteBox,ImageList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import * as searchActions from '../../redux/modules/search';
import storage from '../../lib/storage';
import ShowLevelMenu from '../../components/Post/ShowLevelMenu';
class WriteBoxContainer extends Component{
    state  = {
        
        opacity : 0.8,
        showLevelDisplay : 'none',
        level : '전체 공개',
        filelist : List()
    };

    openShowLevel = () => {
        this.setState({
            showLevelDisplay : 'block'
        })
    }
    closeShowLevel = () => {
        this.setState({
            showLevelDisplay : 'none'
        })
    }

    handleImageChange = (e) => {
        e.preventDefault();
        const {PostActions} = this.props;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            const {filelist} = this.state;
            PostActions.setImage({'url' : reader.result});
            this.setState({
                filelist : filelist.concat({file})
            });
        }
        reader.readAsDataURL(file);
      }

      handleWriteBox = (e) => {
        const {PostActions} = this.props;
        const {innerText} = e.target;
        
        PostActions.setWrittenData(innerText);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
      }
      handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        
        this.setState({
            opacity : 0.8 - scrollTop / 800
        });
        if(this.state.opacity < 0)
           this.closeWriteModal();
      }
    
    openModal = () => {
        const{SearchActions,PostActions} = this.props;
        PostActions.setDisplay('block');
        SearchActions.setFriendList(this.props.friendData);
      }

      closeWriteModal = () => {
        this.props.PostActions.setWriteDisplay('none');
      }

      handleWithBox = () => {
        const{PostActions} = this.props;
        PostActions.setWithFriendDisplay('block');
    }

    handleImageCancel = (e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        PostActions.removeImage(id);
    }

    handleShowClick = () => {
        const {showLevelDisplay} = this.state;
        if(showLevelDisplay === 'none')this.openShowLevel();
        else this.closeShowLevel();
    }

    handleLevelClick = (e) => {
        const {id} = e.target;
        const {PostActions} = this.props;
        PostActions.setShowLevel({showLevel : id});
        if(id === 'public') this.setState({
            level : '전체 공개'
        });
        else if(id === 'private') this.setState({
            level : '나만 보기'
        });
        else this.setState({
            level : '친구 공개'
        })
        this.closeShowLevel();
    }

    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const username = storage.get('loggedInfo').nickname;
        const {images,writeDisplay,withdisplay,withfriend} = this.props;
        const {opacity,showLevelDisplay,level} = this.state;
        const {handleImageChange,handleWriteBox,openModal,closeWriteModal,handleWithBox,
            handleImageCancel,handleLevelClick,handleShowClick} = this;
        return(
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWriteBox} opacity = {opacity} click={openModal} display = {writeDisplay} 
            close = {closeWriteModal} showClick = {handleShowClick} showLevel={level} >
                <ShowLevelMenu showDisplay = {showLevelDisplay} onclick = {handleLevelClick}/>
                <ImageList image = {images} cancel = {handleImageCancel} change = {handleImageChange}/>
                </WriteBox>
        );
    }

}
export default connect(
    (state) => ({
        images : state.post.get('image'),
        withdisplay : state.post.get('withDisplay'),
        withfriend : state.post.get('withFriend'),
        isTruePost : state.post.get('isTruePost'),
        writeDisplay : state.post.get('writeDisplay'),
        friendData : state.friend.get('friend')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch)

    })
)(WriteBoxContainer);