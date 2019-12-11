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
        const{PostActions,name} = this.props;
        try{
            await PostActions.getFeedInformation(name);
        }catch(e){
            console.log(e);
        }
        
    }

    render(){
        const {data,name} = this.props;
        return(
            <FeedList feeds={data} name = {name}/>
        );
    }
}

export default connect(
    (state) => ({
        data : state.post.get('feed'),
        name : storage.get("loggedInfo").username
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)

    })
)(PostListContainer);