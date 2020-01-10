import React, { Component } from 'react';
import storage from '../lib/storage';
import {PostDetailContainer} from '../containers/Base';
class ImageDetail extends Component {
    componentDidMount(){
        this.initializeUserInfo();
    }
    initializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        if(!loggedInfo){
            window.location.href = '/auth/login?expired';
            return;
        }
    }
    render() {
        const { match,history } = this.props;
        const { postid,index } = match.params;
        return (
            <PostDetailContainer postid={postid} imageIndex={index} history={history}/>
            
        )
    }
}
export default ImageDetail;