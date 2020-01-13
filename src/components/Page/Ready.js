import React from 'react';
import styled from 'styled-components';
import error from '../../build/static/images/iconmonstr-error-4-240.png';
const ReadyImage = styled.div`
position: absolute;
width: 240px;
height: 240px;
left: 600px;
top: 223px;
background-image: url(${error});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const Text = styled.div`
position: absolute;
width: 480px;
height: 138px;
left: 473px;
top: 519px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 48px;
line-height: 70px;
display: flex;
align-items: center;
text-align: center;

color: rgba(0, 0, 0, 0.5);

`;

const Ready = () => (

    <div>
        <ReadyImage/>
        <Text>서비스 준비 중입니다. 많은 관심 부탁드립니다.</Text>
    </div>
);
export default Ready;