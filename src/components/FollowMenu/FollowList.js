import React from 'react';
import FollowBox from './FollowBox';
import FollowMenuBox from './FollowMenuBox';

const FollowList = ({friend,deleteclick,follow,result,alarm,visible,friendvisible}) => {
    const followList = friend.map(
        (item) => (
            item && <FollowBox key = {item.get('username')} friend = {item} deleteclick={deleteclick}
             follow ={follow} />
        )
    )
    return(
        <FollowMenuBox fvisible = {friendvisible} alarm = {alarm} visible = {visible}>
            {followList}
            </FollowMenuBox>
    );
}
export default FollowList;