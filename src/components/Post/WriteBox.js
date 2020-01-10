import React from 'react';
import styled from 'styled-components';
import cancelButton from '../../build/static/images/iconmonstr-x-mark-thin-24 (1).png';
import hoverCancelButton from '../../build/static/images/iconmonstr-x-mark-thin-24.png';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';
const Wrapper = styled.div`
position: absolute;
top : 0;
bottom : 0%;
left : 0;
right : 0;
z-index: 10;
display : ${props=>props.display};

`;
const Fixed = styled.div`
top: 0;
left: 0;
width: 100%;
min-width : 1130px;
height : 200%;
z-index: 10;
background:rgba(196, 196, 196,${props=>props.opacity});
`;
const Box = styled.div`
position: absolute;
width: 1100px;
height: 550px;
left: 20px;
top: 72px;
z-index: 15;
background-color: white;
`;

const Text = styled.div`
position: absolute;
width: 600px;
height : 300px;
max-height : 300px;
background: rgba(18,184,134,0.05);
top: 80px;
outline: none;
user-select: text;
white-space: pre-wrap;
overflow-wrap: break-word;
right: 150px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
word-break:break-all;
display : block;
font-size: 20px;
line-height: 35px;
align-items: center;
text-align: justify;
user-modify : read-write;
color: #000000;
cursor:text;
unicode-bidi: embed;
border : none;
&:empty&:not(:focus)&:before {
    content : attr(aria-label);
    color : #90949c;
}
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

}`;

const FriendButton = styled.div`
position: absolute;
width: 172px;
height: 26px;
font-size: 15px;
text-decoration:none;
display: block;
font-family: Noto Sans KR;
color: #000000;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
left: 600px;
top: 30px;
border: 2px solid rgba(196, 196, 196, 0.75);
box-sizing: border-box;
border-radius: 10px;
&:hover{
    border: 2px solid #15AABF;
    color : #15AABF;
}
`;
const Button = styled.div`
position: absolute;
width: 152px;
height: 26px;
font-size: 15px;
text-decoration:none;
display: block;
color: #000000;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
right: 150px;
top: 30px;
border: 2px solid rgba(196, 196, 196, 0.75);
box-sizing: border-box;
border-radius: 10px;
&:hover{
    border: 2px solid #15AABF;
    color : #15AABF;
}
`;
const WriteButton = styled.div`
position: absolute;
width: 12%;
height: 40px;
right : 5%;
top: 470px;
border-radius: 10px;
font-size: 18px;
line-height: 2;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
background: #FFFFFF;
border: 1px solid #0CA678;
box-sizing: border-box;
&:hover {
    color: ${oc.teal[5]};
    ${shadow(0)};
}

&:active {
    color: ${oc.teal[7]};
}
`;
const CancelButton = styled.div`
width: 20px;
height: 20px;
top : 26px;
right : 30px;
position : absolute;
background-image: url(${cancelButton});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
&:hover {
    background-image: url(${hoverCancelButton});
}
&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
`;
const WithBox = styled.div`
position: absolute;
width: 349px;
height: 61px;
top : 400px;
right : 0;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 35px;
display: ${props => props.withdisplay};
align-items: center;
text-align: center;
&:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
color: #515250;
`;
const WriteBox = ({writeClick,showLevel,username,onclick,opacity,click,display,close,withclick,friend,withdisplay,children,showClick}) => {
    return (
    <Wrapper display = {display}>
        <Fixed opacity = {opacity}>
        <Box>
            {children}
        <Text id={'^^content'} role = "textbox" spellcheck = "true" aria-autocomplete="list" data-content = "true"
        contentEditable = "true" aria-multiline="true" aria-label = {`${username}님 무슨 일이 있으셨나요?`} onInput={onclick}></Text>
        <FriendButton onClick = {click}>친구 태그하기</FriendButton>
        <CancelButton onClick = {close} />
        <Button onClick = {showClick}>{showLevel}</Button>
        <WriteButton onClick ={writeClick} >글쓰기</WriteButton>
        <WithBox withdisplay= {withdisplay} onClick={withclick}>{friend}</WithBox>
        </Box>
        </Fixed>
        </Wrapper>
    )
}

export default WriteBox;