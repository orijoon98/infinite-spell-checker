import axios from "axios";

export const createHistory = async ({ title, text }) =>
    await axios.post("/api/history", {
        title,
        text,
    });

export const findAllHistory = async () => await axios.get("/api/history/list");
