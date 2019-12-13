import React from 'react';
import NicknameBox  from './NicknameBox';
import FriendList from './FriendList';

const NicknameList = ({friends}) => {
    const nicknameList = friends.map(
        (friend) => (
            <NicknameBox  friend={friend}  />
        )
    )
    return(
        <FriendList>
        {nicknameList}
        </FriendList>
    );
}
export default NicknameList;