import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';
const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({feeds,username,onclick,content}) => {
    const feedList = feeds.map(
        (feed) => (
            feed && <FeedBox key = {feed.get('postId')}  feed={feed}/>
        )
    )
    return(
        <Box>
            <PostBox username = {username} onclick = {onclick} content={content}/>
            {feedList}
        </Box>
    );
}
export default FeedList;