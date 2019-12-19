import React, {Component} from 'react';
import {WriteBox} from '../../components/Post';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import storage from '../../lib/storage';
class WriteContainer extends Component{
    
    state  = {
        opacity : 1
    };
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
      handleScroll = (e) => {
        const scrollTop =e.srcElement.scrollingElement.scrollTop;
        this.setState({
            opacity : 1 - scrollTop / 400
        });
        console.log(this.state.opacity);
        if(this.state.opacity < 0){
            storage.set('scroll',scrollTop);
            window.location.href='/';
        }

        }
      
    
    handleWrite = () => {

    }
    render(){
        if(!storage.get('loggedInfo')) {
            window.location.href = '/auth/Login';
            return;
        }
        const username = storage.get('loggedInfo').nickname;
        const {handleWrite} = this;
        return (
            <WriteBox username = {username} onclick = {handleWrite} opacity = {this.state.opacity}/>
        );
    };
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)

    })
)(WriteContainer);