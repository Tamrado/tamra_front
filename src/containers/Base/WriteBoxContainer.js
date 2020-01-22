import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WriteBox,ImageList} from '../../components/Post';
import {PostPopup,Popup} from '../../components/Popup';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import * as searchActions from '../../redux/modules/search';
import * as timelineActions from '../../redux/modules/timeline';
import storage from '../../lib/storage';
import ShowLevelMenu from '../../components/Post/ShowLevelMenu';
import {scrollingAction,setOpacity} from '../Function/PostModule';
import {setPostActions,handleLevelClick,makeImageThumbnailAndFile,handleWriteClickButton,handleCancel
    ,handleWriteBox,handleFileDelete,handlePopupOk,handleWithBox,closeWriteModal,handleImageCancel,setSearchActions,
uploadOnlyContent,uploadImages,setTimelineActions} from '../Function/WriteModule';
class WriteBoxContainer extends Component{
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if(!storage.get('loggedInfo')) return ;
        setPostActions(this.props.PostActions);
        setSearchActions(this.props.SearchActions);
        setTimelineActions(this.props.TimelineActions);
      }
      handleScroll = (e) => {
        scrollingAction(e);
        setOpacity(this.props.opacity);
      }
    
    handleShowClick = () => {
        const {showLevelDisplay,PostActions} = this.props;
        if(showLevelDisplay === 'none')
            PostActions.setShowLevelDisplay('block');
        else
            PostActions.setShowLevelDisplay('none');
    }
    openModal = () => {
        const{SearchActions,PostActions} = this.props;
        PostActions.setDisplay('block');
        SearchActions.setFriendList(this.props.friendData);
      }

    handleWriteClick = async() => {
        const {content,showLevel,friendInfo,filelist} = this.props;
        await uploadOnlyContent(friendInfo,content,filelist,showLevel);
        const {postId} = this.props;
        await uploadImages(filelist,postId);
    }
   
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const username = storage.get('loggedInfo').nickname;
        const {images,writeDisplay,withdisplay,withfriend,popupDisplay,postPopupDisplay,popupText,opacity,showLevelDisplay,level} = this.props;
        const {openModal,handleShowClick,handleWriteClick} = this;
        return(
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWriteBox} opacity = {opacity} click={openModal} display = {writeDisplay} 
            close = {closeWriteModal} showClick = {handleShowClick} showLevel={level} writeClick={handleWriteClickButton} >
                <ShowLevelMenu showDisplay = {showLevelDisplay} onclick = {handleLevelClick} top = {'59px'} left = {'800px'}/>
                <ImageList image = {images} cancel = {handleImageCancel} change = {makeImageThumbnailAndFile} handlePhotoDelete = {handleFileDelete}/>
                <Popup text={popupText} display = {popupDisplay} handlePopupOk={handlePopupOk}/>
                <PostPopup right={'30%'} opacity={opacity} text={'게시하시겠습니까?'} fixedDisplay = {'block'} display = {postPopupDisplay} handleOk={handleWriteClick} handleCancel={handleCancel}/>
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
        friendData : state.friend.get('friend'),
        content : state.post.get('writtenData'),
        showLevel : state.post.get('showLevel'),
        friendInfo : state.post.get('friendInfo'),
        postId : state.post.get('postId'),
        filelist : state.post.get('filelist'),
        clear : state.post.get('clear'),
        popupDisplay : state.post.get('popupDisplay'),
        postPopupDisplay : state.post.get('postPopupDisplay'),
        popupText : state.post.get('popupText'),
        showLevelDisplay : state.post.get('showLevelDisplay'),
        opacity : state.post.get('opacity'),
        level : state.post.get('level')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch)

    })
)(WriteBoxContainer);