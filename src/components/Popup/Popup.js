import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';
import alertImage from '../../build/static/images/iconmonstr-error-4-24.png';
const Wrapper = styled.div`
position: fixed;
width : 100%;
height : 100%;
bottom : 0%;
right : 0;
z-index: 20;
background:rgba(196, 196, 196,0.8);
display : ${props=>props.display};
`;
const Box = styled.div`
position: absolute;
width: 319px;
height: 195px;
right : 30%;
top: 240px;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Message = styled.div`

position: absolute;
width: 200px;
height: 51px;
left: 78px;
top: 40px;
white-space:normal;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 23px;
display: flex;
align-items: center;

color: #000000;
word-break: break-all;
`;
const ErrorImage = styled.div`
position: absolute;
width: 24px;
height: 24px;
left: 38px;
top: 53px;
background-image: url(${alertImage});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;
const OKButton = styled.div`
position: absolute;
width: 99px;
height: 43.38px;
left: 189px;
top: 135px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 43.38px;
align-items: center;
text-align: center;
letter-spacing: 2px;

color: #000000;
background: #FFFFFF;
border: 1px solid #0CA678;
box-sizing: border-box;
border-radius: 10px;
&:hover {
    color: ${oc.teal[5]};
    ${shadow(0)};
}

&:active {
    color: ${oc.teal[7]};
}
`;

const Popup = ({handlePopupOk,display,text}) => (
<Wrapper display={display}>
    <Box>
        <Message>
            {text}
        </Message>
        <ErrorImage/>
        <OKButton onClick={handlePopupOk}>확인</OKButton>
    </Box>
</Wrapper>
);
export default Popup;