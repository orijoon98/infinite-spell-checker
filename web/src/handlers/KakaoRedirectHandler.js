import React, { useEffect } from "react";
import axios from "axios";

const KakaoRedirectHandler = () => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    useEffect(() => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        let grant_type = "authorization_code";

        console.log(code);
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
            .then((res) => {
                console.log(res.data["access_token"]);
            });
    }, [CLIENT_ID, REDIRECT_URI]);

    return <div>로그인 중</div>;
};

export default KakaoRedirectHandler;
