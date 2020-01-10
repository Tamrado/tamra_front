import React from 'react';
import styled from 'styled-components';
import publicImage from '../../build/static/images/public.png';
import friendImage from '../../build/static/images/friend.png';
import privateImage from '../../build/static/images/private.png';

const MenuBox = styled.div`
position : absolute;
width : 152px;
height : 81px;
left: ${props => props.left};
top: ${props => props.top};
display : ${props => props.display};
background : #ffffff;
z-index : 45;
`;
const Menu = styled.div`
& + & {
    margin-top: 0.1px;
}
    padding-bottom: 0.5rem;

width: 152px;
height: 26px;

border: 2px solid #DEE2E6;
box-sizing: border-box;
&:hover{
    border: 2px solid #15AABF;
    
}

`;
const MenuText = styled.div`
position : absolute;
max-width : 100%;
height : 20px;
right : 20%;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 14px;
display: inline-block;
letter-spacing: 0.05em;
background : #ffffff;
color: #000000;
&:hover{
    color : #15AABF;
}

`;
const MenuImage = styled.div`
position : absolute;
width : 20px;
height : 20px;
display : block;
left : 20%;
background-image: url(${props => props.showLevel});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    
`;
const ShowLevelMenu = ({onclick,showDisplay,top,left,postId}) => {
    
    return(

    <MenuBox display = {showDisplay} data-postid = {postId} top = {top} left = {left}>
        <Menu data-postid = {postId} onClick = {onclick} id = 'private'>
            <MenuText data-postid = {postId} id = 'private'>나만 보기</MenuText>
        <MenuImage data-postid = {postId} id = 'private' showLevel = {privateImage} /></Menu>
        <Menu data-postid = {postId} onClick = {onclick} id = 'followers'>
            <MenuText data-postid = {postId} id = 'followers'>친구 공개</MenuText>
        <MenuImage data-postid = {postId}  id = 'followers' showLevel = {friendImage} /></Menu>
        <Menu data-postid = {postId} onClick = {onclick} id = 'public'>
        <MenuText data-postid = {postId} id = 'public'>전체 공개</MenuText>
        <MenuImage data-postid = {postId} id = 'public' showLevel = {publicImage} />
        </Menu>
    </MenuBox>
);}
export default ShowLevelMenu;