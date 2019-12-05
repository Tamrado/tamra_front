import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../../../../CommonFolder/lib/styleUtils';

const BorderedButton = styled(Link)`
    font-weight: 600;
    float : right;
    right : 0;
    position : absolute;
    color: ${oc.cyan[6]};
    border: 1px solid ${oc.cyan[6]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
    margin-right : 160px;

    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }


`;

const RegisterButton = () => (
    <BorderedButton to="/auth/register">
        회원 가입
    </BorderedButton>
);

export default RegisterButton;