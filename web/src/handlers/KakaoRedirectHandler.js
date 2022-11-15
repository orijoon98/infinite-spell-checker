import React, { useEffect } from "react";
import axios from "axios";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    useEffect(() => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        let grant_type = "authorization_code";
        axios
            .post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                {
                    headers: {
                        "Content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            )
            .then(async (res) => {
                const accessToken = res.data["access_token"];
                await login({ accessToken });
                navigate("/main");
            });
    }, [CLIENT_ID, REDIRECT_URI, navigate]);

    return <div>로그인 중</div>;
};

export default KakaoRedirectHandler;
