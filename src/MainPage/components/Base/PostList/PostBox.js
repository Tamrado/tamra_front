import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Box = styled(Link)`
position: absolute;
width: 90%;
height: 153px;
background: #FFFFFF;
`;
const TextBox = styled.div`
position: absolute;
width: 392.95px;
height: 52.85px;
left: 39.56px;
float : left;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 35px;
display: flex;
align-items: center;

color: #515250;
`; 

const PostBox = ({username}) => (
    <Box to="/post">
        <TextBox>{username}님, 무슨 일이 있으셨나요?</TextBox>
    </Box>
);
export default PostBox;