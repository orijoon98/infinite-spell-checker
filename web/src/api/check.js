import axios from "axios";

export const spellCheck = async ({ sentence }) =>
    await axios.post("/api/spell/check", {
        sentence,
    });
