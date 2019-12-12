import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FeedList} from '../../components/Base/PostList';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import storage from '../../../CommonFolder/lib/storage';
class PostListContainer extends Component{

    componentDidMount(){
        this.getFeedList();
    }
    
    getFeedList = async() => {
        const{PostActions} = this.props;
        const username = storage.get('loggedInfo').username;
        try{
            await PostActions.getFeedInformation(username);
        }catch(e){
            console.log(e);
        }
        
    }

    render(){
        const {data} = this.props;
        if(!storage.get('loggedInfo')) {
            window.location.href = '/auth/Login';
            return;
        }
        const username = storage.get('loggedInfo').username;
        return(
            <FeedList feeds={data} username = {username}/>
        );
    }
}

export default connect(
    (state) => ({
        data : state.post.get('feed')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)

    })
)(PostListContainer);