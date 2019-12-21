import React from 'react';
import styled from 'styled-components';

const MenuBox = styled.div`
position : absolute;
width : 152px;
height : 81px;
left: 800px;
top: 59px;
display : ${props => props.display};
background : #ffffff;
z-index : 45;
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

`;
const ShowLevelMenu = ({onclick,showDisplay}) => (

    <MenuBox display = {showDisplay}>
        <Menu onClick = {onclick} id = 'private'>나만 보기</Menu>
        <Menu onClick = {onclick} id = 'followers'>친구 공개</Menu>
        <Menu onClick = {onclick} id = 'public'>전체 공개</Menu>
    </MenuBox>
);
export default ShowLevelMenu;