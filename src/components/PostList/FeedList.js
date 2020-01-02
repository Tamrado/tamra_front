import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({cancel,like,mainfeed,username,onclick,content,commentId,commentSender,commentCategory,
    hashdisplay,hover,nothover,keyid,category,sender,stateclick,commentdisplay,handleComment,thumbnail}) => {
    const feedList = mainfeed.map(
        (feeds) => {
            var realcommentdisplay = 'none'; 
            if(feeds && parseInt(commentId) === parseInt(feeds.getIn(['feed','postId'])) && commentSender === feeds.getIn(['sender','username']) 
            && commentCategory === feeds.get('category') && commentdisplay === 'block')
                realcommentdisplay = 'block';
            else if(feeds && parseInt(commentId) === parseInt(feeds.getIn(['feed','postId'])) && commentSender === feeds.getIn(['sender','username']) 
            && commentCategory === feeds.get('category') && commentdisplay === 'none')
                realcommentdisplay = 'none';
            if(feeds && (keyid === feeds.getIn(['feed','postId']) && sender === feeds.getIn(['sender','username']) 
            && category === feeds.get('category'))){
               
                if(feeds.getIn(['feed','tags']).size > 0){
                    const hashTagList = feeds.getIn(['feed','tags']).map(
                         (hash) => {
                             return <div key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                     count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} cancel={cancel}
                handleComment={handleComment} commentdisplay={realcommentdisplay} thumbnail={thumbnail} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                    count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover}like={like} cancel={cancel} 
                handleComment={handleComment} commentdisplay={realcommentdisplay} thumbnail={thumbnail} >
                    <div key = {parseInt(feeds.getIn(['feed','postId']))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){
                return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
            count = {feeds.getIn(['feed','files'])&&feeds.getIn(['feed','files']).size} cancel={cancel} mainfeed={feeds} stateclick={stateclick}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like}
            handleComment={handleComment} commentdisplay={realcommentdisplay} thumbnail={thumbnail}/>
            }
        }
    )
    return(
        <Box >
            <PostBox username = {username} onclick = {onclick} content={content} />
            {feedList}
        </Box>
    );
}
export default FeedList;