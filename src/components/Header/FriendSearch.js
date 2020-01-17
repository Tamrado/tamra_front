import React from 'react';
import styled from 'styled-components';

import { shadow } from '../../lib/styleUtils';

const FriendBox = styled.div`
min-width: 150px;
width : 80%;
height: 49px;
padding-left : 10%;
float:left;
padding-right : 10px;
`;

const SearchlineRectangle = styled.div`
min-width: 114px;
width : 100%;
height: 70%;
top : 15%;
outline: none;
border : none;
outline: none;
user-select: text;
white-space: pre-wrap;
position : relative;
overflow: hidden;
padding-left : 13px;
max-height: 49px;
margin-right : 10px;
background: rgba(18, 184, 134, 0.05);
border-radius: 23px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 300;
font-size: 21px;
line-height: 32px;
display: flex;
align-items: center;
letter-spacing: 2px;
::placeholder {
    color: rgba(0, 0, 0, 0.3);
}
color: rgba(0, 0, 0);
&:empty&:not(:focus)&:before {
    content : attr(aria-label);
    color : #90949c;
}
`;
const SearchContent = styled.div`
position : absolute;
min-width: 150px;

top : 40px;
width : 40%;
background: #ffffff;
${shadow(1)};

`;


const FriendSearch = ({onclick,children}) => (
    <FriendBox>
        <SearchlineRectangle role = "textbox" spellcheck = "true" contentEditable = "true" aria-label = {`검색`}
        onInput={onclick}/>
        <SearchContent>{children}</SearchContent>
    </FriendBox>
);
export default FriendSearch;