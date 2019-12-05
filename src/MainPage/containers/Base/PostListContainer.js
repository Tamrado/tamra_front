import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PostBox,FeedListBox} from '../../components/Base/PostList';
import totalImage from '../../../build/static/images/iconmonstr-globe-5-32.png';
import friendImage from '../../../build/static/images/iconmonstr-user-31-32.png';
import myImage from '../../../build/static/images/iconmonstr-user-1-32.png';
class PostListContainer extends Component{

    render(){
        const {username} = this.props;
        return(
            <div>
            <PostBox username = {username}/>
            <FeedListBox></FeedListBox>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        username: state.user.getIn(['loggedInfo','username'])
    }),
    (dispatch) => ({

    })
)(PostListContainer);