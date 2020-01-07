import React from 'react';
import styled from 'styled-components';

const CommentView = styled.div`
position: relative;
background: #ffffff;
max-width: 90%;
min-width : 90%;
display : inline-block;
padding-bottom: 5px;
padding-top: 5px;
top: 10px;
left : 5%;

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
    padding-top: 8px;
    background: #E5E5E5;
    border-radius: 23px;
    text-align: -webkit-match-parent;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    word-wrap: break-word;
    padding-bottom: 8px;
    display: inline-block;
`;
const CommentTime = styled.div`
font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    position: relative;
    border: none;
    outline: none;
    max-width: 80%;
    height: 20px;
    left: 76px;
    background: #ffffff;

`;
const CommentName = styled.div`
font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 16px;
    position: relative;
    word-wrap: break-word;
    /* padding-bottom: 10px; */
    white-space: pre-wrap;
    display: inline-block;
    color: #0CA678;
}
`;
const CommentBox = ({comment}) => {
    const {
        postId,
        commentId,
        content,
        timestamp,
        profile,
        dateString
    } = comment;
    return(
        <CommentView>
            <CommentThumbnail id = {commentId} data-postid = {postId} data-userid = {profile.id} 
            thumbnail = {profile.profile}/>
            <CommentInputBox id = {commentId} data-postid = {postId} data-userid = {profile.id}>
                <CommentName id = {commentId} data-postid = {postId} data-userid = {profile.id}>{profile.name} </CommentName>
                 {content}
            </CommentInputBox>
            <CommentTime>{dateString}</CommentTime>
        </CommentView>
    )
}
export default CommentBox;
