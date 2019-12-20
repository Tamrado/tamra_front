import React from 'react';
import FriendTag from './FriendTag';
import FriendBox from './FriendBox';
const TagList = ({friends,opacity,onclick,close,display}) => {
    const tagList = friends.map(
        (friend) => (
            <FriendBox key = {friend.get('username')} friend = {friend} onclick = {onclick} />
        )
    )
    return(
        <FriendTag opacity = {opacity} display = {display} close = {close}>
            {tagList}
        </FriendTag>
    );
}
export default TagList;