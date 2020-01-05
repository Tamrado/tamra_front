import React from 'react';
import styled from 'styled-components';

const CommentView = styled.div`
position: relative;
background: #ffffff;
min-width: 90%;
padding-bottom: 5px;
padding-top: 5px;
top: 60px;

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
const CommentInputBox = styled.div`
position: relative;
max-width: 80%;
display: inline-block;
height: 100%;
left: 76px;
padding-right: 10px;
padding-left: 10px;
background: #E5E5E5;
border-radius: 23px;

`;
const CommentInput = styled.div`
font-family: Noto Sans KR;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 32px;
position:relative;
word-wrap: break-word;
padding-bottom : 10px;
white-space: pre-wrap;
display : inline-block;
`;
const CommentTime = styled.div`
font-family: Noto Sans KR;
font-style: normal;
font-weight: 300;
font-size: 14px;
line-height: 32px;
position: absolute;
border : none;
outline: none;
max-width: 80%;
height: 25px;
left: 76px;
top: 12px;
background: #ffffff;
`;
const CommentBox = ({comment}) => {
     
    const {
        postId,
        commentId,
        content,
        timestamp,
        profile,
        dateString
    } = comment.toJS();
    return(
        <CommentView>
            <CommentThumbnail id = {commentId} data-postid = {postId} data-userid = {profile.id} 
            thumbnail = {profile.profile}/>
            <CommentInputBox>
                <CommentInput id = {commentId} data-postid = {postId} data-userid = {profile.id}>{content}</CommentInput>
            </CommentInputBox>
            <CommentTime>{dateString}</CommentTime>
        </CommentView>
    )
}
export default CommentBox;
