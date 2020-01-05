import React from 'react';
import FeedBox from './FeedBox';
import Profile from './Profile';

const FeedList = ({followclick,postNum,followerNum,followNum,comment,nickname,username,thumbnail
    ,followdisplay,isfollow,mainfeed,hover,nothover,hashdisplay,keyid,cancel,like,handleComment}) => {
        
    const feedList = mainfeed.map(
        (feeds) => {
           
            if(feeds && keyid === feeds.get('postId')){
               
                if(feeds.get('tags').size > 0){
                    const hashTagList = feeds.get('tags').map(
                         (hash,index) => {
                             return <div key = {parseInt(feeds.get('postId'))+index}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {parseInt(feeds.get('postId'))} thumbnail = {thumbnail}
                     count = {feeds &&feeds.get('files').size} mainfeed={feeds} handleComment = {handleComment}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} cancel={cancel} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {parseInt(feeds.get('postId'))}
                    count = {feeds && feeds.get('files').size} handleComment = {handleComment} thumbnail = {thumbnail}
                     mainfeed={feeds} hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} 
                     like={like} cancel={cancel}>
                    <div key = {parseInt(feeds.get('postId'))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){ 
            return  <FeedBox key = {parseInt(feeds.get('postId')).toString()} handleComment = {handleComment}
            count = {feeds.get('files') && feeds.get('files').size} mainfeed={feeds} thumbnail = {thumbnail}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like} cancel={cancel} />
            }
        }
    )
    return(
        <div>
            <Profile followclick = {followclick} postNum={postNum} followerNum = {followerNum}
            followNum = {followNum} comment = {comment} nickname = {nickname} username= {username}
            thumbnail = {thumbnail} followdisplay={followdisplay} isfollow={isfollow} />
            {feedList}
        </div>
    );
}
export default FeedList;