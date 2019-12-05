import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FriendList,NicknameList} from '../../components/Base/FriendList';


class FriendListContainer extends Component{
    static defaultProps = {
        data : []
    }

    render(){
        const {data} = this.props;
        const nicknameList = data.map(
            info => (<NicknameList image={info.image} name= {info.name}/>)
        );
        return(
            <FriendList>
                {nicknameList}
                </FriendList>
            );
    }

}

export default connect(
    (state) => ({
        friendData : state.friendData
    }),
    (dispatch) => ({

    })
)(FriendListContainer);