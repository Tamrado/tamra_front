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
background:rgba(196, 196, 196,${props=>props.opacity});

`;
const TagBox = styled.div`
position: absolute;
width: 358px;
height: 546px;
left: 515px;
top: 31px;
z-index : 30;
background : #ffffff;
border-radius: 20px;
`;
const Header = styled.div`
background: #ffffff;
border-radius: 20px 20px 0px 0px;
position: absolute;
width: 358px;
height: 102px;

`;
const HeaderText = styled.div`
position:absolute;
width: 358px;
height: 102px;
left: 50px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 25px;
line-height: 46px;
top: 15px;
letter-spacing: 0.05em;
color: #000000;
`;
const SearchBox = styled.div`
position: absolute;
width: 239px;
height: 40px;
top: 70px;
outline : none;
overflow : hidden;
text-overflow : ellipsis;
margin-left : 30px;
background: rgba(18, 184, 134, 0.05);
border-radius: 10px;
font-family: Noto Sans KR;
align-items: center;

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
top: 71px;
background-image: url(${searchButton});
background-size: cover;
background-position: center;
background-repeat: no-repeat;

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
const FriendBox = styled.div`
top : 120px;
position : absolute;
width : 358px;
height : 400px;
background : #ffffff;

overflow-y: auto;
&::-webkit-scrollbar-track
{
	border-radius: 20px;
	background-color: #FFFFFF;
}
&::-webkit-scrollbar
{
	width: 10px;
	background-color: #FFFFFF;
}

&::-webkit-scrollbar-thumb
{
	border-radius: 20px;
	background-color : rgba(18, 184, 134, 0.1);
}
`;
const FriendTag = ({opacity,children,close,display,search,handlecontent,enter}) => (
    <Wrapper display = {display}>
        <Fixed opacity = {opacity}>
            <TagBox>
                <CancelButton  onClick = {close}/>
                <Header>
                    <HeaderText>SEARCH</HeaderText>
                    <SearchBox spellcheck = "true" aria-autocomplete="list" data-content = "true"
                     contentEditable = "true" onInput = {handlecontent} id = "^^content" onKeyUp={enter}/>
                    <SearchButton onClick = {search}/>
                </Header>
                <FriendBox>
                {children}
                </FriendBox>
            </TagBox>
        </Fixed>
        </Wrapper>
);
export default FriendTag;

