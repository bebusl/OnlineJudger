import request from "./request";

const { get } = request("/common");

export const checkHealth = async () => await get("/health");
