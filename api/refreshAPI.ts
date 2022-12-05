import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants/url";
import { addHours } from "../utils/dateUtils";

const response = () =>
  axios.post(API_BASE_URL + "/users/refresh", null, {
    withCredentials: true,
  });
if (response?.status === 200 && response.data?.success) {
  Cookies.set("Authorization", `Bearer ${response.data.access_token}`, {
    secure: true,
    sameSite: "None",
    expires: addHours(1),
  });
}
