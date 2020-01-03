import React from 'react';
import WithBox from './WithBox';
import WithTag from './WithTag';
const WithList = ({friend,cancel,opacity,display,close}) => {
    const withList = friend.map(
        (item) => (
            <WithBox key = {item.get('username')} friend= {item} cancel = {cancel} />
        )
    )
    return (
        <WithTag opacity = {opacity} display={display} close={close}>
            {withList}
        </WithTag>
    );
}
export default WithList;