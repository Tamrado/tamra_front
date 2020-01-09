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
        const { match } = this.props;
        const { postid } = match.params;
        return (
            <PostDetailContainer postid={postid}/>
            
        )
    }
}
export default ImageDetail;