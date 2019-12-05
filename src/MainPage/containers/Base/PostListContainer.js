import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PostBox,PostingBox} from '../../components/Base/PostList';
class PostListContainer extends Component{

    render(){
        const {username} = this.props;
        return(
            <PostBox username = {username}></PostBox>

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