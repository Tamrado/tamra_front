import React from 'react';
import FeedBox from './FeedBox';
import Profile from './Profile';
import CommentList from './CommentList';
import PostMenu from './PostMenu';
import ShowLevelMenu from '../Post/ShowLevelMenu';

const FeedList = ({followclick,postNum,followerNum,followNum,comment,nickname,username,thumbnail,enterComment,commentThumbnail
    ,followdisplay,isfollow,mainfeed,hover,nothover,hashdisplay,keyid,cancel,like,handleComment,handleCommentAdd,
handleMenu,modifyClick,deleteClick,change,handleImage,handleWrite,handleCancel,hostUser,
handleWriteInput,handleViewChange,handleShowLevel}) => {
        
    const feedList = mainfeed.map(
        (feeds) => {
            const showLevelMenu = 
            <ShowLevelMenu showDisplay = {feeds.get('showMenuVisible')} key = {'showLevelMenu' + feeds.get('postId').toString()} postId={feeds.get('postId')}
            top = {'30px'} left = {'0'} onclick={handleShowLevel} />
            const commentList= 
            <CommentList key = {'commentlist' + feeds.get('postId').toString()} thumbnail = {thumbnail} commentThumbnail = {commentThumbnail}
             handleCommentAdd = {handleCommentAdd} enterComment={enterComment} mainfeed={feeds} postId={feeds.get('postId')}
              comments = {feeds.get('commentList')}/>;
            const postMenu =
            <PostMenu key = {'postMenu' + feeds.get('postId').toString()} mainfeed= {feeds} modifyClick = {modifyClick}
            deleteClick = {deleteClick}/>
             if(feeds && keyid === feeds.get('postId')){
               
                if(feeds.get('tags').size > 0){
                    const hashTagList = feeds.get('tags').map(
                         (hash,index) => {
                             return <div key = {parseInt(feeds.get('postId'))+index}>{hash.get('nickname')}<br/></div>
                         }
                     );
                     return <FeedBox key = {parseInt(feeds.get('postId'))} thumbnail = {thumbnail}
                     count = {feeds &&feeds.get('files').size} mainfeed={feeds} handleComment = {handleComment}
                hashdisplay = {hashdisplay} childrenTwo={commentList} hover = {hover} nothover = {nothover}
                 like={like} cancel={cancel} handleMenu={handleMenu} menu={postMenu} handleImage={handleImage}
                 handleWrite={handleWrite} handleCancel = {handleCancel} handleWriteInput={handleWriteInput}
                 handleViewChange = {handleViewChange} showList={showLevelMenu} hostUser={hostUser}
                 >{hashTagList}</FeedBox>
                }
                else{
                    return <FeedBox key = {parseInt(feeds.get('postId'))}
                    count = {feeds && feeds.get('files').size} handleComment = {handleComment} thumbnail = {thumbnail}
                     mainfeed={feeds} hashdisplay = {hashdisplay} hover = {hover} nothover = {nothover} hostUser={hostUser}
                     like={like} cancel={cancel} childrenTwo={commentList} handleMenu={handleMenu} menu={postMenu}
                     handleImage={handleImage} handleViewChange = {handleViewChange} showList={showLevelMenu}
                     handleWrite={handleWrite} handleCancel = {handleCancel} handleWriteInput={handleWriteInput}>
                    <div key = {parseInt(feeds.get('postId'))+'gdg'}>태그된 사람이 없습니다.<br/></div></FeedBox>
                }   
            }
            else if(feeds){ 
            return  <FeedBox key = {parseInt(feeds.get('postId')).toString()} handleComment = {handleComment}
            count = {feeds.get('files') && feeds.get('files').size} mainfeed={feeds} thumbnail = {thumbnail}
            hashdisplay = {'none'} hover = {hover} nothover = {nothover} like={like} cancel={cancel} 
            childrenTwo={commentList} handleMenu={handleMenu} menu={postMenu} handleImage={handleImage}
            handleWrite={handleWrite} handleCancel = {handleCancel} handleWriteInput={handleWriteInput}
            handleViewChange = {handleViewChange} showList={showLevelMenu} hostUser={hostUser}/>
            }
        }
    )
    return(
        <div>
            <Profile followclick = {followclick} postNum={postNum} followerNum = {followerNum}
            followNum = {followNum} comment = {comment} nickname = {nickname} username= {username}
            thumbnail = {thumbnail} followdisplay={followdisplay} isfollow={isfollow} change={change} />
            {feedList}
        </div>
    );
}
export default FeedList;