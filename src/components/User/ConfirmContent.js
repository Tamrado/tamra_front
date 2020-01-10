import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    background-color : #ffffff;
    position : absolute;
    width: 60%;
    left: 20%;
    top: 5rem;
    padding : 30px;

    
`;

const ConfirmContent = ({children}) => (
    <Content>{children}</Content>
);

export default ConfirmContent;