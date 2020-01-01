import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import PostBox from './PostBox';

const Box = styled.div`
position : absolute;
width : 80%;

`;
const FeedList = ({totalNum,likedisplay,cancel,like,mainfeed,username,onclick,content,
    hashdisplay,hover,nothover,keyid,category,sender,stateclick,likeKey}) => {
    const feedList = mainfeed.map(
        (feeds,index) => {
            var display;
            if(feeds && !feeds.getIn(['feed','loggedInUserLikeIt'])){
                display = 'visible';
            }
            else if(feeds){  
                display = 'none';
            }
            if(feeds && keyid === feeds.getIn(['feed','postId']) && sender === feeds.getIn(['sender','username']) && category === feeds.get('category')){
               
                if(feeds.getIn(['feed','tags']).size > 0){
                    const hashTagList = feeds.getIn(['feed','tags']).map(
                         (hash,index1) => {
                             return <div key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                     count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} cancel={cancel}
                 likedisplay = {display} likenum = {feeds.getIn(['feed','totalLike'])}>{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
                    count = {feeds.getIn(['feed','files']).size} mainfeed={feeds} stateclick={stateclick}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover}like={like} cancel={cancel} 
                likedisplay = {display} likenum = {feeds.getIn(['feed','totalLike'])}>
                    <div key = {parseInt(feeds.getIn(['feed','postId']))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds && parseInt(likeKey) === feeds.getIn(['feed','postId'])){ 
            return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
            count = {feeds.getIn(['feed','files'])&&feeds.getIn(['feed','files']).size} cancel={cancel} mainfeed={feeds} stateclick={stateclick}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like} likedisplay = {likedisplay} 
            likenum = {totalNum}/>
            }
            else if(feeds){
                return <FeedBox key = {(parseInt(feeds.getIn(['feed','postId']))).toString()+feeds.get('category')+feeds.getIn(['sender','username'])} 
            count = {feeds.getIn(['feed','files'])&&feeds.getIn(['feed','files']).size} cancel={cancel} mainfeed={feeds} stateclick={stateclick}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like}likedisplay = {display} 
            likenum = {feeds.getIn(['feed','totalLike'])}/>
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