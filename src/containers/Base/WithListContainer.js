import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WithList} from '../../components/Post';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';

class WithListContainer extends Component{
    state  = {
        opacity : 0.8
    };
    
      closeWithBox = () => {
          this.props.PostActions.setWithFriendDisplay('none');
          
      }
      
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
      handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        
        this.setState({
            opacity : 0.8 - scrollTop / 800
        });
        if(this.state.opacity < 0){
           this.closeWithBox();
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
        const {withData,withfriendDisplay} = this.props;
        const {opacity} = this.state;
        const {closeWithBox,handleFriendCancel} = this;
        return(
            <WithList friend = {withData} opacity = {opacity} display = {withfriendDisplay}
             cancel = {handleFriendCancel} close={closeWithBox} />
        );
    }
}

export default connect(
    (state) => ({
        withData : state.post.get('friendInfo'),
        withfriendDisplay :state.post.get('withFriendDisplay')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)

    })
)(WithListContainer);