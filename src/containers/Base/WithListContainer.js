import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WithList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import {scrollingAction,setOpacity,closeWithBox} from '../Function/PostModule';
class WithListContainer extends Component{
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
      handleScroll = (e) => {
        scrollingAction(e);
        setOpacity(this.props.opacity);
     
      }
    
    handleFriendCancel = async(e) => {
        const{PostActions} = this.props;
        const {id} = e.target;
        let count = 0;
        await PostActions.removeFriend(id);
        const{withData} = this.props;
        await withData.toJS().forEach(item => count++);
       
        if(count > 1){
            PostActions.setWithFriend(withData.toJS()[0].nickname+'님 외 '+String(count-1)+'명과 함께');
        }
        else if(count > 0){
            PostActions.setWithFriend(withData.toJS()[0].nickname+'님과 함께');
        }
        else{
            PostActions.setWithDisplay('none'); 
            PostActions.setWithFriendDisplay('none');
            
    }
    }

    render(){
        const {withData,withfriendDisplay,opacity} = this.props;
        const {handleFriendCancel} = this;
        return(
            <WithList friend = {withData} opacity = {opacity} display = {withfriendDisplay}
             cancel = {handleFriendCancel} close={closeWithBox} />
        );
    }
}

export default connect(
    (state) => ({
        withData : state.post.get('friendInfo'),
        withfriendDisplay :state.post.get('withFriendDisplay'),
        opacity : state.post.get('opacity')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)

    })
)(WithListContainer);