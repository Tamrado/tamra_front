import React from 'react';
import styled from 'styled-components';
import like from '../../build/static/images/iconmonstr-smiley-thin-32.png';
import clickLike from '../../build/static/images/iconmonstr-smiley-8-32.png';

const CommentBox =styled.div`
position: relative;
width: 90%;
height: 680px;
left: 5%;
top : 0;
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
left: 0;
top: 45px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
`;
const CommentInput = styled.div`
position: relative;
max-width: 80%;
height: 35px;
right : 0;
top: 50px;
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
    
`;
const LikeImage = styled.div`
position: absolute;
width: 20px;
height: 20px;
left: 18px;
top: 13px;
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
left: 18px;
top: 13px;
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
top: 15px;

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
left: 18px;
top: 13px;
`;
const CommentView = ({userThumbnail,postId,enterComment,islike,cancel,totalLike,children}) => (
<CommentBox>
    <LikeBox>
    <LikeImage id = {postId} onClick = {like} like = {islike}/>
        {islike === 'none' &&<LikedImage id = {postId} onClick = {cancel} />}
        <LikeNum>{totalLike}</LikeNum>
    </LikeBox>
    <CommentThumbnail thumbnail = {userThumbnail}/>
    <CommentInput id={postId} name = {'^^comment'}value={postId} role = "textbox" spellcheck = "true" contentEditable = "true" aria-label = {'댓글을 입력하세요'}
         onKeyUp={enterComment} />
         {children}
</CommentBox>
);
export default CommentView;