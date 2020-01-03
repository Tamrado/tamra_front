import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({cancel,like,mainfeed,username,onclick,content,
    hashdisplay,hover,nothover,keyid,category,stateclick,handleComment,thumbnail}) => {
    const feedList = mainfeed.map(
        (feeds) => {
            if(feeds && (keyid === feeds.getIn(['feed','postId']) && category === feeds.get('category'))){
               
                if(feeds.getIn(['feed','tags']).size > 0){
                    const hashTagList = feeds.getIn(['feed','tags']).map(
                         (hash,index) => {

                             return <div key = {(parseInt(feeds.getIn(['feed','postId']))+index).toString()+feeds.get('category')}>
                             {hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')} 
                     count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} cancel={cancel}
                handleComment={handleComment}  thumbnail={thumbnail} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')} 
                    count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover}like={like} cancel={cancel} 
                handleComment={handleComment} thumbnail={thumbnail} >
                    <div key = {parseInt(feeds.getIn(['feed','postId']))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){
                return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')} 
            count = {feeds.getIn(['feed','files'])&&feeds.getIn(['feed','files']).size} cancel={cancel} mainfeed={feeds} stateclick={stateclick}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like}
            handleComment={handleComment} thumbnail={thumbnail}/>
            }
        }
    )
    return(
        <Box >
            <PostBox key = {'postbox'}username = {username} onclick = {onclick} content={content} />
            {feedList}
        </Box>
    );
}
export default FeedList;