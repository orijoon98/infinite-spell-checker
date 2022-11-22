import React from "react";
import List from "../components/List";
import { useNavigate } from "react-router-dom";

const ListContainer = () => {
    const navigate = useNavigate();
    const onBack = async (e) => {
        e.preventDefault();
        navigate("/main");
    };

    return <List onBack={onBack} />;
};

export default ListContainer;
