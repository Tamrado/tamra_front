import React from 'react';
import styled from 'styled-components';
import searchButton from '../../build/static/images/iconmonstr-magnifier-1-32.png';
const Wrapper = styled.div`
position: absolute;
left: 20px;
top: 72px;
bottom : 0%;
right : 0;
z-index: 20;
`;
const Fixed = styled.div`
width: 1100px;
height: 550px;
left: 20px;
top: 72px;
z-index: 20;
background:rgba(196, 196, 196,0.8);
opacity : ${props=>props.opacity};
`;
const TagBox = styled.div`
position: absolute;
width: 319px;
height: 546px;
left: 515px;
top: 31px;
z-index : 30;
background: #F1F1F5;
border-radius: 20px;
`;
const Header = styled.div`
background: #12B886;
border-radius: 20px 20px 0px 0px;
position: absolute;
width: 319px;
height: 102px;

`;
const HeaderText = styled.div`
position:absolute;
width: 319px;
height: 102px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 46px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
color: #FFFFFF;
`;
const SearchBox = styled.div`
position: absolute;
width: 200px;
height: 40px;
top: 50px;
outline : none;
margin-left : 30px;
background: #0CA678;
border-radius: 30px;
font-family: Noto Sans KR;
align-items: center;
text-align: center;
color: rgb(0, 0, 0);
font-weight: normal;
font-size: 24px;
line-height: 38px;
font-style: normal;
`;
const SearchButton = styled.img`
position: absolute;
width: 32px;
height: 32px;
right : 10px;
margin-right : 30px;
top: 51px;
`;

const FriendTag = ({opacity,children}) => (
    <Wrapper>
        <Fixed opacity = {opacity}>
            <TagBox>
                <Header>
                    <HeaderText>친구 검색</HeaderText>
                    <SearchBox spellcheck = "true" aria-autocomplete="list" data-content = "true"
                     contentEditable = "true"/>
                    <SearchButton src = {searchButton} />
                </Header>
                {children}
            </TagBox>
        </Fixed>
        </Wrapper>
);
export default FriendTag;

