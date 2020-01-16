import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
font-size: 1.4rem;
letter-spacing: 2px;
color: #000000;
font-family: 'Rajdhani';
text-decoration: none;
margin-bottom: 1rem;
padding-top : 1rem;
border-top : ${props=>props.top};

`;

const AuthContent = ({title, children,top}) => (
    <div>
        <Title top = {top}>{title}</Title>
        {children}
    </div>
);

export default AuthContent;