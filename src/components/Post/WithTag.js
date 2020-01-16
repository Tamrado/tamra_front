import React from 'react';
import styled from 'styled-components';
import cancelButton from '../../build/static/images/iconmonstr-x-mark-thin-24 (1).png';

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
height: 510px;
left: 20px;
top: 72px;
z-index: 20;
background:rgba(196, 196, 196,${props=>props.opacity});
`;
const WithBox = styled.div`
width: 378px;
    max-height: 500px;
    overflow-y: auto;
    
    top: 70px;
    background: rgb(256,256,256);
    position: absolute;
}

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
const Box = styled.div`
position: absolute;
width: 378px;

height: 603px;
left: 511px;
top: 2px;
background: #FFFFFF;
border-radius: 30px;
`;
const Title = styled.div`
position: absolute;
width: 146px;
height: 28px;
left: 50px;
top: 15px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 25px;
line-height: 29px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;

color: #000000;

`;
const CancelButton = styled.div`
width: 20px;
height: 20px;
top : 10px;
z-index : 20;
right : 30px;
cursor: pointer;
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

const WithTag = ({opacity,display,children,close}) =>(

    <Wrapper display = {display}>
        <Fixed opacity = {opacity}>
        <Box>
            <CancelButton onClick={close} />
            <Title>
                WITH
            </Title>
            <WithBox>
            {children}
            </WithBox>
        </Box>
        </Fixed>
    </Wrapper>
);
export default WithTag;
