import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';
const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({feeds,username,onclick,content,hashdisplay,hover}) => {
    const feedList = feeds.map(
        (feed) => {
            return feed && <FeedBox key = {feed.get('postId')} count = {feed.get('files').size} feed={feed}
             hashdisplay = {hashdisplay} hover = {hover}/>
        }
    )
    return(
        <Box>
            <PostBox username = {username} onclick = {onclick} content={content} />
            {feedList}
        </Box>
    );
}
export default FeedList;