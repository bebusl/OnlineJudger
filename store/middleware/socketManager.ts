import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { WEB_SOCKET_URL } from "../../utils/constants/url";

import type { Middleware } from "redux";
import type { StoreDispatch } from "../store";

import { getAuthToken } from "../../utils/authUtils";

import { receiveJudgeMessage, receiveRunMessage } from "../slice/socketSlice";
import { addNoti } from "../slice/notiSlice";

const socketManager: Middleware = (store) => {
  let socketClient: Client | null = null;
  const dispatch: StoreDispatch = store.dispatch;
  return (next) => {
    return (action) => {
      if (
        action.type === "auth/login/fulfilled" ||
        action.type === "auth/getMe/fulfilled"
      ) {
        const authToken = getAuthToken();
        if (authToken) {
          socketClient = generateSocketClient();
          if (socketClient) {
            socketClient.connectHeaders = { Authorization: authToken };
            socketClient.onConnect = () => {
              if (socketClient?.connected) {
                socketClient.subscribe("/user/queue/notification", (msg) => {
                  const body = JSON.parse(msg.body);
                  dispatch(receiveJudgeMessage(body));
                  dispatch(
                    addNoti({
                      id: Date.now(),
                      message: "채점이 완료되었습니다",
                      variant: "success",
                    })
                  );
                });
                socketClient.subscribe("/user/queue/problem/run", (msg) => {
                  const body = JSON.parse(msg.body);
                  store.dispatch(receiveRunMessage(body));
                });
              }
            };
            socketClient.onDisconnect = () => {
              console.log("disconnected");
            };
            socketClient.activate();
          }
        }
      }
      if (action.type === "auth/logoff/fulfilled") {
        socketClient?.deactivate();
      }
      next(action);
    };
  };
};

function generateSocketClient(): Client | null {
  const socketClient = Stomp.over(() => new SockJS(WEB_SOCKET_URL));
  socketClient.reconnectDelay = 5000;
  socketClient.heartbeatIncoming = 4000;

  if (socketClient) {
    return socketClient;
  }

  return null;
}

export default socketManager;
