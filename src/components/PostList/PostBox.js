import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Box = styled.div`
position: absolute;
width: 90%;
height: 153px;
background: #FFFFFF;

`;
const TextBox = styled.div`
position: absolute;
width: 90%;
height: 153px;
left: 39.56px;
float : left;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 50px;
&:hover {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
color: #515250;
`; 

const PostBox = ({username,onclick}) => (
    <Box onClick={onclick}>
        <TextBox >{username}님, 무슨 일이 있으셨나요?</TextBox>
    </Box>
);
export default PostBox;