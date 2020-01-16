import React from 'react';
import styled from 'styled-components';

const CommentView = styled.div`
position: relative;
width: 100%;
max-height: 90%;
left: 0px;
top: 0px;
display : inline-block;
background: #ffffff;
padding-bottom: 5px;
padding-top: 5px;
`;

const CommentThumbnail = styled.div`
position: absolute;
background-image: url(${props => props.thumbnail});
background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
width: 45px;
height: 45px;
left: 18px;
top: 8px;
`;
const CommentInputBox = styled.div`
position: relative;
    max-width: 80%;
    height: 100%;
    left: 82px;
    top: 8px;
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
position: relative;
width: 103px;
height: 32px;
left: 95px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 19px;
display: flex;
align-items: center;
letter-spacing: 0.05em;

color: #515250;
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
`;
const CommentBox = ({comment}) => {
    const {
        postId,
        commentId,
        content,
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
