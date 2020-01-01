import React from 'react';
import SearchBox from './SearchBox';
import FriendSearch from './FriendSearch';

const SearchList = ({onclick,nickname,visible,users,userclick}) => {
    const userList = users.map(
        (user)=>(
        <SearchBox key = {user.get('username')} user={user} visible={visible} onclick={userclick}/>
        )
    )

    return(
        <FriendSearch onclick = {onclick} nickname = {nickname}>{userList}</FriendSearch>
    );
}
export default SearchList;