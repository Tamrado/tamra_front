import React, {Component} from 'react';
import {WriteBox} from '../../components/Base/Post';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../redux/modules/post';
import storage from '../../../CommonFolder/lib/storage';
class WriteContainer extends Component{

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
            <WriteBox username = {username} onclick = {handleWrite}/>
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