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

class WriteBoxContainer extends Component{
    state  = {
        
        opacity : 0.8,
        showLevelDisplay : 'none',
        level : '전체 공개'
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
            PostActions.setImage({'url' : reader.result});
            PostActions.updateFilelist(file);
        }
        try{
        reader.readAsDataURL(file);
        }catch(e){
            this.setPopupMessage('파일 등록에 실패했습니다. 다시 시도해주세요.');
        }
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
        if(this.state.opacity < 0){
           this.closeWriteModal();
           this.props.PostActions.setPopupDisplay('none');
           this.props.PostActions.setPostPopupDisplay('none');
        }
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

    handleWriteClickButton = () => {
        const {PostActions} = this.props;
        PostActions.setPostPopupDisplay('block');
    }
    handleCancel = () => {
        const {PostActions} = this.props;
        PostActions.setPostPopupDisplay('none');
    }
    setPopupMessage = (text) => {
        const {PostActions} = this.props;
        PostActions.setPostPopupDisplay('none');
        PostActions.setPopupDisplay('block');
        PostActions.setPopupText(text);
    }
    handleWriteClick = async() => {
        const {PostActions,content,showLevel,friendInfo,filelist} = this.props;
        const {setPopupMessage} = this;
        var tags = friendInfo.toJS();
        if(content.length > 1000){
            console.log('*');
            setPopupMessage('글은 1000자 이하여야 합니다. 다시 입력해주세요.');
            return;
        }
        if(filelist.size > 9){
            setPopupMessage('이미지는 9장까지 게시할 수 있습니다.');
            return;
        }
        try{
        await PostActions.uploadFeed({content,showLevel,tags});
        }catch(e){
            if(e.response.status === 409){
                setPopupMessage('글은 1000자 이하여야 합니다. 다시 입력해주세요.');
                return;
            }
        }
        const {postId} = this.props;
        try{
        await filelist.forEach((value,index,filelist)=>{
                var formdata = new FormData();
                formdata.set('file',value.get('file'));
                if(postId !== -1 && formdata.get('file') !== null)
                    PostActions.uploadImage(formdata,postId);
        });
    }catch(e){
        await PostActions.deleteFeed(postId);
        setPopupMessage('글을 게시하는 데 실패했습니다. 다시 시도해주세요.');
        return;
        }
        PostActions.setDisplay('none');
        PostActions.setWithFriendDisplay('none');
        PostActions.setWithDisplay('none');
        PostActions.setWriteDisplay('none');
        PostActions.setWrittenData('');
        document.getElementById('^^content').textContent = '';
        PostActions.initializeFilelist();
        PostActions.initializeImage();
        PostActions.setPostPopupDisplay('none');
        this.renewMain();
    }
   
    renewMain=()=>
    setTimeout(async()=>{
        const {postId,TimelineActions} = this.props;
        await TimelineActions.getFeedInformationDetail(postId);
        await TimelineActions.renewMainInformation();
    },4000);
    handlePhotoDelete = async(e) =>{
        const {id} = e.target;
        const {PostActions} = this.props;
        await PostActions.deleteFile(id);
    }
    handlePopupOk=()=>{
        const {PostActions} = this.props;
        PostActions.setPopupDisplay('none');
    }
   componentWillUnmount(){
    clearTimeout(this.renewMain);
   }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const username = storage.get('loggedInfo').nickname;
        const {images,writeDisplay,withdisplay,withfriend,popupDisplay,postPopupDisplay,popupText} = this.props;
        const {opacity,showLevelDisplay,level} = this.state;
        const {handleImageChange,handleWriteBox,openModal,closeWriteModal,handleWithBox,
            handleImageCancel,handleLevelClick,handleShowClick,handleWriteClick,handlePhotoDelete,
            handleWriteClickButton,handleCancel,handlePopupOk} = this;
        return(
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWriteBox} opacity = {opacity} click={openModal} display = {writeDisplay} 
            close = {closeWriteModal} showClick = {handleShowClick} showLevel={level} writeClick={handleWriteClickButton} >
                <ShowLevelMenu showDisplay = {showLevelDisplay} onclick = {handleLevelClick} top = {'59px'} left = {'800px'}/>
                <ImageList image = {images} cancel = {handleImageCancel} change = {handleImageChange} handlePhotoDelete = {handlePhotoDelete}/>
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
        popupText : state.post.get('popupText')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch)

    })
)(WriteBoxContainer);