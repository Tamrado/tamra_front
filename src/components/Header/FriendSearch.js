import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import searchButtonImage from '../../build/static/images/iconmonstr-magnifier-1-32.png';
import hoversearchButtonImage from '../../build/static/images/iconmonstr-magnifier-1-32 (1).png';

const FriendBox = styled.div`
min-width: 150px;
width : 80%;
height: 49px;
padding-left : 5rem;
padding-right : 5rem;
float:left;
`;
const SearchBox = styled.div`
min-width: 150px;
height: 49px;
position : relative;
float:left;
padding-top : 5px;
width : 90%;

`;
const SearchButton = styled(Link)`
margin-top : 10px;
position : absolute;
width: 32px;
height: 32px;
background-image: url(${searchButtonImage});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${hoversearchButtonImage});
}
&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;
const SearchlineRectangle = styled.input`
min-width: 144px;
width : 100%;
outline: none;
border : none;
position : relative;
height: 49px;
margin-right : 10px;
background: rgba(18, 184, 134, 0.05);
border-radius: 23px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 300;
font-size: 22.4px;
line-height: 32px;
display: flex;
align-items: center;
letter-spacing: 2px;
::placeholder {
    color: rgba(0, 0, 0, 0.3);
}
color: rgba(0, 0, 0);
`;


const FriendSearch = ({...content}) => (
    <FriendBox>
        <SearchBox>
            <SearchlineRectangle{...content}/>
        </SearchBox>
        <SearchButton to = "/search"/>
    </FriendBox>
);
export default FriendSearch;