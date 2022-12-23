import { commonFetch } from "./fetchClient";

export const checkHealth = async () => await commonFetch.get("/common/health");
