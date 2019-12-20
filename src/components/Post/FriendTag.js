import React from 'react';
import styled from 'styled-components';
import searchButton from '../../build/static/images/iconmonstr-magnifier-1-32.png';
import cancelButton from '../../build/static/images/iconmonstr-x-mark-thin-24 (1).png';
import hoverCancelButton from '../../build/static/images/iconmonstr-x-mark-thin-24.png';
import hoverSearchButton from '../../build/static/images/iconmonstr-magnifier-1-32 (1).png';
const Wrapper = styled.div`
position: absolute;
left: 20px;
top: 72px;
bottom : 0%;
right : 0;
z-index: 20;
display : ${props=>props.display};
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
const SearchButton = styled.div`
position: absolute;
width: 32px;
height: 32px;
right : 10px;
margin-right : 30px;
top: 51px;
background-image: url(${searchButton});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${hoverSearchButton});
}
&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;
const CancelButton = styled.div`
width: 20px;
height: 20px;
top : 10px;
z-index : 20;
right : 30px;
position : absolute;
background-image: url(${cancelButton});
background-size: cover;
background-position: center;
background-repeat: no-repeat;

&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;
const FriendTag = ({opacity,children,close,display}) => (
    <Wrapper display = {display}>
        <Fixed opacity = {opacity}>
            <TagBox>
                <CancelButton  onClick = {close}/>
                <Header>
                    <HeaderText>친구 검색</HeaderText>
                    <SearchBox spellcheck = "true" aria-autocomplete="list" data-content = "true"
                     contentEditable = "true"/>
                    <SearchButton  />
                </Header>
                {children}
            </TagBox>
        </Fixed>
        </Wrapper>
);
export default FriendTag;

