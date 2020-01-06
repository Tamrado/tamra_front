import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
width : 60%;
left : 20%;

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
padding-bottom : 2.5rem;
border-top : 1px solid rgba(0, 0, 0, 0.25);
`;
const CommentWrapper = styled.div`
position : relative;
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
const CommentAdd = styled.div`
position: absolute;
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
const CommentView = ({commentThumbnail,enterComment,children,mainfeed,handleCommentAdd}) => {
   
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
    dateString,
    trueComment
   } = mainfeed.toJS();
return(
<CommentBox display = {commentState}>
        <CommentWrapper>
            <CommentThumbnail thumbnail = {commentThumbnail}/>
            <CommentInput id={postId} name = {'^^comment'} value={postId} role = "textbox" spellcheck = "true" contentEditable = "true" aria-label = {'댓글을 입력하세요'}
         onKeyUp={enterComment} ></CommentInput>
        </CommentWrapper>
        {children}
        {trueComment &&<CommentAdd onClick = {handleCommentAdd} id={postId}>댓글 더보기</CommentAdd>}
    </CommentBox>
)
};
export default CommentView;