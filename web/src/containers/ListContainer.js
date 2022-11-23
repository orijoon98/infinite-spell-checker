import React, { useState, useEffect } from "react";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import { findAllHistory } from "../api/history";

const ListContainer = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const onBack = async (e) => {
        e.preventDefault();
        navigate("/main");
    };

    useEffect(() => {
        async function fetchHistoryList() {
            try {
                const response = await findAllHistory();
                const data = response.data.data;
                if (response.status === 401) {
                    navigate("/login");
                }
                setResult(data);
            } catch (err) {
                alert("저장 목록 조회 실패");
            }
        }
        fetchHistoryList();
    });

    return <List onBack={onBack} result={result} />;
};

export default ListContainer;
