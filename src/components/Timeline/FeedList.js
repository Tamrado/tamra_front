import React from 'react';
import styled from 'styled-components';
import FeedBox from './FeedBox';
import Profile from './Profile';

const FeedList = ({followclick,postNum,followerNum,followNum,comment,nickname,username,thumbnail
    ,followdisplay,isfollow,mainfeed,hover,nothover,hashdisplay,keyid,like}) => {
    const feedList = mainfeed.map(
        (feeds,index) => {
            if(feeds && keyid === feeds.get('postId')){
               
                if(feeds.get('tags').size > 0){
                    const hashTagList = feeds.get('tags').map(
                         (hash,index1) => {
                             return <div key = {parseInt(feeds.get('postId')+index1).toString()}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {parseInt(feeds.get('postId')+index).toString()} 
                     count = {feeds &&feeds.get('files').size} mainfeed={feeds}
                hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} like={like} >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {parseInt(feeds.get('postId')+index).toString()} like={like}  
                    count = {feeds && feeds.get('files').size}
                     mainfeed={feeds} hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} >
                    <div key = {parseInt(feeds.get('postId'))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){ 
            return  <FeedBox key = {parseInt(feeds.get('postId')+index).toString()} 
            count = {feeds.get('files') && feeds.get('files').size} mainfeed={feeds} like={like} 
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} />
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