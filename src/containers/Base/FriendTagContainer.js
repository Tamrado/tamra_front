import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';
import storage from '../../lib/storage';
import {TagList} from '../../components/Post';
class FriendTagContainer extends Component{
    state  = {
        opacity : 1
    };
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }
    handleScroll = (e) => {
      const scrollTop =e.srcElement.scrollingElement.scrollTop;
      this.setState({
          opacity : 1 - scrollTop / 400
      });
      console.log(this.state.opacity);
      if(this.state.opacity < 0){
          window.location.href='/';
      }

      }

      handleFriendInfo = (e) => {
          
      }

    render(){
        const {friendData} = this.props;
        return(
            <TagList opacity = {this.state.opacity} friends = {friendData} onclick = {}/>
        );
    }
}
export default connect(
    (state) => ({
        friendData : state.friend.get('friend')
    }),
    (dispatch) => ({
        FriendActions: bindActionCreators(friendActions, dispatch)
    })
)(FriendTagContainer);