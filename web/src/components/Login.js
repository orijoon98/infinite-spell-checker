import React from "react";
import styled from "styled-components";
import kakao_button_image from "../assets/images/kakao_login_large_wide.png";

const Login = ({}) => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <>
            <LoginContainer>
                <LoginWrapper>
                    <LoginTitle>
                        <h1>무한 맞춤법 검사기</h1>
                    </LoginTitle>
                    <a href={KAKAO_AUTH_URL}>
                        <KakaoButton></KakaoButton>
                    </a>
                    <p>소셜 로그인으로 간편하게 시작하세요</p>
                </LoginWrapper>
            </LoginContainer>
        </>
    );
};

const LoginContainer = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    font-family: "line";
`;

const LoginTitle = styled.div`
    margin-top: 200px;
    margin-bottom: 100px;
`;

const LoginWrapper = styled.div`
    margin: auto;
`;

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
