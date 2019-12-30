import React from 'react';
import NicknameBox  from './NicknameBox';
import FriendList from './FriendList';

const NicknameList = ({friends,onclick}) => {
    const nicknameList = friends.map(
        (friend) => (
            <NicknameBox key = {friend.get('username')} friend={friend} onclick={onclick} />
        )
    )
    return(
        <FriendList>
        {nicknameList}
        </FriendList>
    );
}
export default NicknameList;