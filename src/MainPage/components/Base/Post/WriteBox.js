import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
position: fixed;
background: #F1F1F5;
top : 0;
bottom : 0%;
left : 0;
right : 0;
z-index: 10;
background:rgba(196, 196, 196, 0.8);
overflow : hidden;
`;
const Box = styled.div`
position: absolute;
width: 1210px;
height: 600px;
left: 20px;
top: 72px;
z-index: 15;
background-color: white;
`;

const Text = styled.textarea`
position: absolute;
width: 40%;
height: 55%;
background: rgba(18,184,134,0.05);
top: 150px;
right: 450px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
word-break:break-all;
display : block;
font-size: 20px;
line-height: 35px;
align-items: center;
text-align: justify;
color: #000000;
border : none;

`;
const PhotoBox = styled.div`
position: absolute;
width : 15%;
height: 30%;
top: 150px;
    left: 200px;


background: rgba(18, 184, 134, 0.05);
`
const PhotoText = styled.div`
position: absolute;
width : 15%;
height: 30%;
 text-align:center;
 line-height: 8.5;
 margin : auto;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 24px;


align-items: center;
color: #000000;
`;
const Photo = styled.input`
position: absolute;
width : 20%;
height: 30%;
overflow: hidden;
opacity : 0;
`
const FriendButton = styled.div`
position: absolute;
width: 172px;
height: 26px;
font-size: 15px;
display: block;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
left: 700px;
top: 100px;
border: 2px solid rgba(196, 196, 196, 0.75);
box-sizing: border-box;
border-radius: 10px;
`;
const Button = styled.div`
position: absolute;
width: 152px;
height: 26px;
font-size: 15px;
display: block;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
align-items: center;
text-align: center;
right: 450px;
top: 100px;
border: 2px solid rgba(196, 196, 196, 0.75);
box-sizing: border-box;
border-radius: 10px;
`;
const WriteButton = styled.div`
position: absolute;
width: 55%;
height: 35px;
left: 100px;
top: 600px;
background: #FFFFFF;
border: 2px solid #0CA678;
box-sizing: border-box;

`;
const WriteBox = ({username,onclick}) => (
    <div>
    <Wrapper/>
        <Box>
            <PhotoBox>
                <PhotoText>
                +
                </PhotoText>
        <Photo type = "file"/>
        </PhotoBox>
        <Text placeholder={`${username}님 무슨 일이 있으셨나요?`}></Text>
        <FriendButton>친구 태그하기</FriendButton>
        <Button>나만 보기</Button>
        <WriteButton onClick={onclick}/>
        </Box>
        </div>
);

export default WriteBox;