import React from "react";
import styled from "styled-components";
import kakao_button_image from "../assets/kakao_login_large_wide.png";

const Login = ({}) => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <>
            <LoginContainer>
                <a href={KAKAO_AUTH_URL}>
                    <KakaoButton></KakaoButton>
                </a>
            </LoginContainer>
        </>
    );
};

const LoginContainer = styled.div``;

const KakaoButton = styled.div`
    background-image: url(${kakao_button_image});
    background-repeat: no-repeat;
    background-size: cover;
    margin: 10px auto;
    color: transparent;
    width: 300px;
    height: 45px;
`;

export default Login;
