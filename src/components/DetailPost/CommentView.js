import React from 'react';
import styled from 'styled-components';
import like from '../../build/static/images/iconmonstr-smiley-thin-32.png';
import clickLike from '../../build/static/images/iconmonstr-smiley-8-32.png';

const CommentBox =styled.div`
position: relative;
width: 100%;
height: 480px;

top : 110px;
overflow-y: auto;
&::-webkit-scrollbar-track
{
	border-radius: 20px;
	background-color: #FFFFFF;
}
&::-webkit-scrollbar
{
	width: 10px;
	background-color: #FFFFFF;
}

&::-webkit-scrollbar-thumb
{
	border-radius: 20px;
	background-color : rgba(18, 184, 134, 0.1);
}
`;
const CommentThumbnail = styled.div`
background-image: url(${props => props.thumbnail});
position: absolute;
width: 45px;
height: 45px;
left: 18px;
top: 50px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
`;
const CommentInput = styled.div`
position: absolute;
width: 70%;
    height: 35px;
    right: 18px;
    top: 54px;
border : none;
outline: none;
text-overflow : ellipsis;
overflow : hidden;
display: inline-block;
background: #E5E5E5;
border-radius: 23px;
padding-right: 10px;
    padding-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: -webkit-match-parent;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    word-wrap: break-word;
    &:empty&:not(:focus)&:before {
        content : attr(aria-label);
        color : #90949c;
    }
    
`;
const LikeImage = styled.div`
position: absolute;
width: 20px;
height: 20px;
left: 0px;
display : ${props => props.like};
background-image : url(${like});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    &:hover {
        background-image: url(${clickLike});
    }
`;
const LikedImage = styled.div`
position: absolute;
width: 20px;
height: 20px;
left: 0px;
background-image : url(${clickLike});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
`;
const LikeNum = styled.div`
position: absolute;
width: 53px;
height: 16px;
left: 38px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 21px;
align-items: center;
text-align: center;

color: #000000;
&:hover {
    color : #FF0404;
}
`;
const LikeBox = styled.div`
position: absolute;
width: 73px;
height: 20px;
left: 15px;
top: 13px;
`;
const CommentAdd = styled.div`
display: flex;
    flex: 1 1 auto;
width: 121px;
height: 29px;
left: 38px;
bottom : 0;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 33px;
align-items: center;
color: #0A825E;
&:hover {
    text-decoration-line: underline;
}
`;
const CommentView = ({userThumbnail,children,enterComment,like,cancel,
handleCommentAdd,mainfeed}) => {
    const{
        feed,
        category,
        sender,
        message,
        profileId
    } = mainfeed;
    if(!feed) return null;
    const {
        postId,
        content,
        showLevel,
        timestamp,
        totalTag,
        totalComment,
        totalLike,
        profile,
        files,
        islike,
        commentState,
        tags,
        trueComment,
        dateString
       } = feed;
    return(
<div>
    <LikeBox>
    <LikeImage id = {postId} onClick = {like} like = {islike}/>
        {islike === 'none' &&<LikedImage id = {postId} onClick = {cancel} />}
        <LikeNum>{totalLike}</LikeNum>
    </LikeBox>
    <CommentThumbnail thumbnail = {userThumbnail}/>
    <CommentInput id={postId} name = {'^^comment'} value={postId} role = "textbox" spellcheck = "true" contentEditable = "true" aria-label = {'댓글을 입력하세요'}
         onKeyUp={enterComment} />
    <CommentBox>
         {children}
         {trueComment &&<CommentAdd onClick = {handleCommentAdd} id={postId}>댓글 더보기</CommentAdd>}
</CommentBox>
</div>
);
}
export default CommentView;