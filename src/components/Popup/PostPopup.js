import React from 'react';
import styled from 'styled-components';
import alertImage from '../../build/static/images/iconmonstr-help-3-24.png';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';
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
right : ${props=>props.right};
top: 240px;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AlertImage = styled.div`
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

const ErrorText = styled.div`

position: absolute;
width: 164px;
height: 31px;
left: 93px;
top: 46px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 23px;
display: flex;
align-items: center;
text-align: center;

color: #000000;
`;

const OKButton = styled.div`
position: absolute;
width: 99px;
height: 43.38px;
left: 38px;
top: 122px;
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
const CancelButton = styled.div`
position: absolute;
width: 99px;
height: 43.38px;
left: 173px;
top: 122px;

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

const PostPopup = ({handleOk, handleCancel,display,text,right}) => (

    <Wrapper display = {display}>
            <Box right={right}>
                <AlertImage/>
                <ErrorText>
                    {text}
                </ErrorText>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
                <OKButton onClick={handleOk}>확인</OKButton>
            </Box>
    </Wrapper>
);
export default PostPopup;