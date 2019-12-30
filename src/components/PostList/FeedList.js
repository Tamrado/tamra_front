import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({like,mainfeed,username,onclick,content,hashdisplay,hover,nothover,keyid,category,sender,stateclick}) => {
    const feedList = mainfeed.map(
        (feeds,index) => {
            if(feeds && keyid === feeds.getIn(['feed','postId']) && sender === feeds.getIn(['sender','username']) && category === feeds.get('category')){
               
                if(feeds.getIn(['feed','tags']).size > 0){
                    const hashTagList = feeds.getIn(['feed','tags']).map(
                         (hash,index1) => {
                             return <div key = {(parseInt(feeds.getIn(['feed','postId']))+index1).toString()+feeds.get('category')+feeds.getIn(['sender','username'])}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))+index).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                     count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))+index).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                    count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover}like={like} >
                    <div key = {parseInt(feeds.getIn(['feed','postId']))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){ 
            return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))+index).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
            count = {feeds.getIn(['feed','files'])&&feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like}/>
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