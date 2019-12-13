import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FriendList,NicknameList} from '../../components/Base/FriendList';
import {bindActionCreators} from 'redux';
import * as friendActions from '../../redux/modules/friend';

class FriendListContainer extends Component{

    componentDidMount(){
        this.getFriendList();
    }
    
    getFriendList = async() => {
        const{FriendActions} = this.props;
        try{
            await FriendActions.getFriendListInfo();
        }catch(e){
            console.log(e);
        }
        
    }

    render(){
        const {friendData} = this.props;
        return(
            <NicknameList friends = {friendData} />
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