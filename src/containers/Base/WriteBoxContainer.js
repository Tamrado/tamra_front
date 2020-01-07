import { List,Map} from 'immutable';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WriteBox,ImageList} from '../../components/Post';
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

    handleWriteClick = async() => {
        const {PostActions,content,showLevel,friendInfo,filelist} = this.props;
        var tags = friendInfo.toJS();
        try{
            console.log('ㅎㅇ');
        await PostActions.uploadFeed({content,showLevel,tags});
        console.log('ㅂㅇ');
        }catch(e){

        }
        try{
        filelist.map(
            (item,index) => {
                var formdata = new FormData();
                formdata.set('file',item.get('file'));
                console.log(index);
                const {postId} = this.props;
                console.log(postId);
                return PostActions.uploadImage(formdata,postId);
            }
        )
        }catch(e){
            console.log(e);
        }
         PostActions.setDisplay('none');
         PostActions.setWithFriendDisplay('none');
         PostActions.setWithDisplay('none');
         PostActions.setWriteDisplay('none');
         PostActions.setWrittenData('');
        document.getElementById('^^content').textContent = '';
         PostActions.initializeFilelist();
         PostActions.initializeImage();
        try{
            this.renewMain();
            
        }catch(e){
            console.log(e);
        }
    }
   
    renewMain=()=>
        setTimeout(async()=>{
            const {postId,TimelineActions} = this.props;
            await TimelineActions.getFeedInformationDetail(postId);
            await TimelineActions.renewMainInformation();
        },3000);
    
   componentWillUnmount(){
    clearTimeout(this.renewMain);
   }
    render(){
        if(!storage.get('loggedInfo')) {
            
            return null;
        }
        const username = storage.get('loggedInfo').nickname;
        const {images,writeDisplay,withdisplay,withfriend} = this.props;
        const {opacity,showLevelDisplay,level} = this.state;
        const {handleImageChange,handleWriteBox,openModal,closeWriteModal,handleWithBox,
            handleImageCancel,handleLevelClick,handleShowClick,handleWriteClick} = this;
        return(
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWriteBox} opacity = {opacity} click={openModal} display = {writeDisplay} 
            close = {closeWriteModal} showClick = {handleShowClick} showLevel={level} writeClick={handleWriteClick} >
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
        friendData : state.friend.get('friend'),
        content : state.post.get('writtenData'),
        showLevel : state.post.get('showLevel'),
        friendInfo : state.post.get('friendInfo'),
        postId : state.post.get('postId'),
        filelist : state.post.get('filelist')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        SearchActions : bindActionCreators(searchActions,dispatch),
        TimelineActions : bindActionCreators(timelineActions,dispatch)

    })
)(WriteBoxContainer);