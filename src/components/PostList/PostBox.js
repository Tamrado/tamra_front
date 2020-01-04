import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
position: absolute;
width: 70%;
left : 15%;
height: 153px;
background: #FFFFFF;

`;
const TextBox = styled.div`
position: absolute;
width: 90%;
max-height: 153px;
height: 153px;
left: 39.56px;
overflow : hidden;
float : left;
white-space:normal;
word-break: break-all;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 153px;
&:hover {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
}
color: #515250;
`; 

const PostBox = ({content,username,onclick}) => {
    return(
    <Box onClick={onclick}>
        <TextBox>{content}</TextBox>
    </Box>
);
}
export default PostBox;