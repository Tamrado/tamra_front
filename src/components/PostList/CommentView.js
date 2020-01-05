import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
width : 70%;
left : 15%;
overflow : auto;
min-height : 300px;
background : #ffffff;

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
	background-color : rgba(18, 184, 134, 0.2);
}
position: relative;
display : ${props => props.display};
top:148px;
margin-bottom : 0.5rem;
border-top : 1px solid rgba(0, 0, 0, 0.25);
`;
const CommentWrapper = styled.div`
position : absolute;
background : #ffffff;
width: 90%;
height: 60px;
left: 5%;
top: 10px;
`;
const CommentThumbnail = styled.div`
position :absolute;
background-image: url(${props => props.thumbnail});

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
    width: 45px;
    height: 45px;
    top :10%;
    left : 15px;
`;
const CommentInput = styled.div`
font-family: Noto Sans KR;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 32px;
position: absolute;
border : none;
outline: none;
text-overflow : ellipsis;
overflow : hidden;
width: 80%;
height: 35px;
left: 76px;
user-select: text;
white-space: pre-wrap;
top: 12px;
padding-left : 25px;
background: #E5E5E5;
border-radius: 23px;
&:empty&:not(:focus)&:before {
    content : attr(aria-label);
    color : #90949c;
}
`;
const CommentView = ({thumbnail,handleCommentInput,enterComment,children,mainfeed}) => {
    const {
        feed,
        category,
        sender,
        message,
        profileId,
    } = mainfeed.toJS();
  
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
    dateString
   } = feed;
return(
<CommentBox display = {commentState}>
        <CommentWrapper>
            <CommentThumbnail thumbnail = {thumbnail}/>
            <CommentInput id={postId} name = {'^^comment'} value={postId} role = "textbox" spellcheck = "true" contentEditable = "true" aria-label = {'댓글을 입력하세요'}
         onKeyUp={enterComment} onFocus = {handleCommentInput}></CommentInput>
         {children}
        </CommentWrapper>
    </CommentBox>
)
};
export default CommentView;