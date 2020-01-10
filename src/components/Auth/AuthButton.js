import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtils';

const Wrapper = styled.div`
margin-top: 1rem;
padding-top: 0.6rem;
position: relative;
padding-bottom: 0.5rem;
border-radius: 10px;
width: 25%;
left: 37%;
border: 1px solid #12b886;
color: black;
text-align: center;
-webkit-letter-spacing: 2px;
-moz-letter-spacing: 2px;
-ms-letter-spacing: 2px;
letter-spacing: 2px;
font-family: Noto Sans KR;
font-size: 1.1rem;
font-weight: 500;
cursor: pointer;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
-webkit-transition: .2s all;
transition: .2s all;

    &:hover {
        color: ${oc.teal[5]};
        ${shadow(0)};
    }

    &:active {
        color: ${oc.teal[7]};
    }

`;

const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick} >
        {children}
    </Wrapper>
);

export default AuthButton;