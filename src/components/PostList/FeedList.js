import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({feeds,username,onclick,content,hashdisplay,hover,nothover,keyid}) => {
    const feedList = feeds.map(
        (feed,index) => {
            if(feed && keyid === feed.get('postId')){
               
                if(feed.get('tags').size > 0){
                    const hashTagList = feed.get('tags').map(
                         (hash,index1) => {
                             return <div key = {parseInt(feed.get('postId'))+index1}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {parseInt(feed.get('postId')) + index} count = {feed.get('files').size} feed={feed}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {parseInt(feed.get('postId')) +index} count = {feed.get('files').size} feed={feed}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} ><div key = {parseInt(feed.get('postId'))+'gdg'}>태그한 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else{ 
            return feed && <FeedBox key = {parseInt(feed.get('postId')) + index} count = {feed.get('files').size} feed={feed}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} />
            }
        }
    )
    return(
        <Box>
            <PostBox key ={username} username = {username} onclick = {onclick} content={content} />
            {feedList}
        </Box>
    );
}
export default FeedList;