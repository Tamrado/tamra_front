import React from 'react';
import styled from 'styled-components';

const MenuBox = styled.div`
position: absolute;
    width: 152px;
    right: 0;
    top: 30px;
    display: ${props => props.display};
    background: #ffffff;
    z-index: 45;
`;
const Menu = styled.div`
& + & {
    margin-top: 0.1px;
}
padding-top: 0.5rem;
    padding-bottom: 0.5rem;

width: 152px;
height: 26px;

border: 2px solid #DEE2E6;
box-sizing: border-box;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 9px;
display: block;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
background : #ffffff;
color: #000000;
&:hover{
    border: 2px solid #15AABF;
    color : #15AABF;
}

`;
const PostMenu = ({modifyClick,deleteClick,mainfeed}) => {
    const {
        postId,
        menuVisible
    } = mainfeed.toJS();
    return(

    <MenuBox display = {menuVisible}>
        <Menu onClick = {modifyClick} id = {postId} data-category = {'modify'}>수정하기</Menu>
        <Menu onClick = {deleteClick} id = {postId} data-category = {'delete'}>삭제하기</Menu>
    </MenuBox>
);
}
export default PostMenu;