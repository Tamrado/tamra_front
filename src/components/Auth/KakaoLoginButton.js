import React from 'react';
import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import key from '../../key.json';
import kakaoLogin from '../../build/static/images/kakao_account_login_btn_medium_narrow.png';
const Button = styled(KakaoLogin)`
position : relative;
background-image: url(${kakaoLogin});
background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    outline : none;
border: none;
width: 232px;
left : 25%;  
margin-bottom : 1.5rem;
    height : 49px;
`;


const KakaoLoginButton = ({responseKakao,responseFail}) => {
return(
<div>
    <Button jsKey={key.kakaoKey}
            buttonText=""
            onSuccess={responseKakao}
            onFailure={responseFail}
            getProfile="true"/>
</div>
);
}
export default KakaoLoginButton;