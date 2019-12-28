import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FriendList,NicknameList} from '../../components/FriendList';

import PageWrapper from '../../components/PageWrapper';
import * as friendActions from '../../redux/modules/friend';
class FriendListContainer extends Component{

    componentDidMount(){
        this.getFriendList();
    }
    
    getFriendList = () => {
        const{FriendActions} = this.props;
        try{
            FriendActions.getFriendListInfo();
        }catch(e){
            console.log(e);
        }
        
    }

    render(){
        const {friendData} = this.props;
        return(
            <PageWrapper>
            <NicknameList friends = {friendData} />
          </PageWrapper>
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
)(FriendListContainer);