import { common } from "./fetchClient";

export const checkHealth = async () => await common.get("/common/health");
