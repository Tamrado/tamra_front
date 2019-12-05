import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    background-color : #ffffff;
    position : absolute;
    width : 100%;
    padding : 30px;

    
`;

const ConfirmContent = ({children}) => (
    <Content>{children}</Content>
);

export default ConfirmContent;