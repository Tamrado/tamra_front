import React, {Component} from 'react';
import { List } from 'immutable';
import {connect} from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import {FeedList} from '../../components/PostList';
import {WriteBox,TagList,WithList,ImageList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
import ShowLevelMenu from '../../components/Post/ShowLevelMenu';
class PostListContainer extends Component{
    state  = {
        display : 'none',
        writeDisplay : 'none',
        opacity : 1,
        withfriend : null,
        withdisplay : 'none',
        withfriendDisplay : 'none',
        filelist : List(),
        showLevelDisplay : 'none',
        level : '전체 공개'
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
    openShowLevel = () => {
        this.setState({
            showLevelDisplay : 'block'
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
      closeShowLevel = () => {
        this.setState({
            showLevelDisplay : 'none'
        })
    }
     
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.props.PostActions.setWrittenData(storage.get('loggedInfo').nickname + '님 무슨 일이 있으셨나요?');
        this.getFeedList();
      }
      handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        const { innerHeight } = window;
      const { scrollHeight } = document.body;
        this.setState({
            opacity : 1 - scrollTop / 400
        });
        if(this.state.opacity < 0){
           this.closeWriteModal();
           this.closeModal();
           this.closeWithBox();
        }
      if ((innerHeight + scrollTop) > scrollHeight) {
        this.getFeedList();
        }
      }
    
    handleWriteBox = (e) => {
        const {PostActions} = this.props;
        const {innerText} = e.target;
        
        PostActions.setWrittenData(innerText);
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
    
    getFeedList = async() => {
        const{PostActions,page,isTruePost} = this.props;
        if(isTruePost){
            const username = storage.get('loggedInfo').username;
            try{
                await PostActions.getFeedInformation(username,page);
                await PostActions.addPage();
            }catch(e){
                console.log(e);
               await PostActions.setFalsePost();
                return;
            }
        }
        
    }
    handleImageCancel = (e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        PostActions.removeImage(id);
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

    handleImageChange = (e) => {
        e.preventDefault();
        const {PostActions} = this.props;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            const {filelist} = this.state;
            PostActions.setImage({'url' : reader.result});
            console.log(filelist);
            this.setState({
                filelist : filelist.concat({file})
            });
        }
        reader.readAsDataURL(file);
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
        const {data} = this.props;
        const style = {
            lineHeight: '160%'
        };
        if(!storage.get('loggedInfo')) {
            window.location.href = '/auth/login?expired';
            return;
        }
        const username = storage.get('loggedInfo').nickname;
        const {friendData,withData,images,writtenData} = this.props;
        const {opacity,display,writeDisplay,withdisplay,withfriend,withfriendDisplay,showLevelDisplay,level} = this.state;
        const {handleImageChange,closeWithBox,handleWriteBox,handleFriendInfo,openModal,closeModal,openWriteModal,
            closeWriteModal,handleFriendCancel,handleWithBox,handleImageCancel,handleLevelClick,handleShowClick} = this;
        return(
            <div>
            <WriteBox withdisplay = {withdisplay}  withclick = {handleWithBox} friend = {withfriend} username = {username} 
            onclick = {handleWriteBox} opacity = {opacity} click={openModal} display = {writeDisplay} 
            close = {closeWriteModal} showClick = {handleShowClick} showLevel={level} >
                <ShowLevelMenu showDisplay = {showLevelDisplay} onclick = {handleLevelClick}/>
                <ImageList image = {images} cancel = {handleImageCancel} change = {handleImageChange}/>
                </WriteBox>
            <WithList friend = {withData} opacity = {opacity} display = {withfriendDisplay}
             cancel = {handleFriendCancel} close={closeWithBox} />
            <TagList opacity = {opacity} friends = {friendData} onclick = {handleFriendInfo} close={closeModal}
             display = {display} cancel = {handleFriendCancel}/>
            <PageWrapper>
            <FeedList feeds={data} username = {username} onclick = {openWriteModal} content ={
                writtenData.split('\n').map( line => {
            return (<div style={style} >{line}<br/></div>)
          })
        } />
            </PageWrapper>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        data : state.post.get('feed'),
        withData : state.post.get('friendInfo'),
        friendData : state.friend.get('friend'),
        images : state.post.get('image'),
        writtenData : state.post.get('writtenData'),
        page : state.post.get('page'),
        isTruePost : state.post.get('isTruePost'),
        showLevel : state.post.get('showLevel')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        FriendActions: bindActionCreators(friendActions, dispatch)

    })
)(PostListContainer);