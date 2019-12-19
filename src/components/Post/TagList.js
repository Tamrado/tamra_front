import React from 'react';
import FriendTag from './FriendTag';
import FriendBox from './FriendBox';
const TagList = ({friends,opacity}) => {
    const tagList = friends.map(
        (friend) => (
            <FriendBox key = {friend.get('username')} friend = {friend} />
        )
    )
    return(
        <FriendTag opacity = {opacity}>
            {tagList}
        </FriendTag>
    );
}
export default TagList;