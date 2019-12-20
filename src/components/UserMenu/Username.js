import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
    border-bottom: 1px solid ${oc.gray[3]};
    text-align: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: ${oc.gray[9]};
    font-weight: 500;
    font-size: 0.9rem;
`;

const Username = ({username}) => (
    <Wrapper>
        @{username}
    </Wrapper>
);

export default Username;