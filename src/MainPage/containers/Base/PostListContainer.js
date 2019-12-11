import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PostBox,FeedListBox} from '../../components/Base/PostList';
import totalImage from '../../../build/static/images/iconmonstr-globe-5-32.png';
import friendImage from '../../../build/static/images/iconmonstr-user-31-32.png';
import myImage from '../../../build/static/images/iconmonstr-user-1-32.png';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
class PostListContainer extends Component{
    static defaultProps = {
        data : []
    }

    componentDidMount(){
        this.getFeedList();
    }
    getFeedList = async() => {
        const{PostActions,username} = this.props;
        try{
            console.log(username);
            await PostActions.getFeedInformation(username);
            const info = this.props.result.toJS();
            await PostActions.setFeedInformation(info);
        }catch(e){
            console.log(e);
        }
        
    }

    render(){
        const {username,data} = this.props;
        const feedList = data.map(
            info => (<FeedListBox thumbnail={info.thumbnail} name= {info.author}/>)
        );
        return(
            <div>
            <PostBox username = {username}/>
            {feedList}
            </div>
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