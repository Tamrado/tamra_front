import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
font-size: 1.4rem;
letter-spacing: 2px;
color: #000000;
font-family: 'Rajdhani';
text-decoration: none;
margin-bottom: 1rem;
padding-top : 1rem;
border-top : 1px solid rgba(0, 0, 0, 0.1);
`;

const AuthContent = ({title, children}) => (
    <div>
        <Title>{title}</Title>
        {children}
    </div>
);

export default AuthContent;