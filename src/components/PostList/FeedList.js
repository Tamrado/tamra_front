import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({feeds,username,onclick,content,hashdisplay,hover,nothover,keyid}) => {
    const tagslist = feeds.map(
        (feed) => {
            if(feed && keyid === feed.get('postId') && feed.get('tags').size > 0){
           const hashTagList = feed.get('tags').map(
                (hash) => {
                    return <div key = {feed.get('postId').toString() + feed.get('username')}>{hash.get('nickname')}<br/></div>
                }
            )
           return <div key = {feed.get('postId').toString()+ feed.get('username')}>{hashTagList}</div> 
        }
        else if (feed && keyid === feed.get('postId')){
            return <div key = {feed.get('postId').toString()+ feed.get('username')}>태그한 사람이 없습니다.</div>
        }
    }
    )
    const feedList = feeds.map(
        (feed) => {
            if(feed && keyid === feed.get('postId')){
                
             return <FeedBox key = {parseInt(feed.get('postId'))} count = {feed.get('files').size} feed={feed}
            hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} >{tagslist}</FeedBox>
            }
            else{ 
            return feed && <FeedBox key = {parseInt(feed.get('postId'))} count = {feed.get('files').size} feed={feed}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} />
            }
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