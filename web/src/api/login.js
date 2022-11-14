import axios from "axios";

export const login = async ({ accessToken }) =>
    await axios.post("/api/auth/login", {
        accessToken,
    });
