import { Stomp, Client } from "@stomp/stompjs";
import { Middleware } from "redux";
import SockJS from "sockjs-client";
import { WEB_SOCKET_URL } from "../../utils/constants/url";
import { generateAuthHeader } from "../../utils/authUtils";
import { recieveJudgeMessage, recieveRunMessage } from "../slice/socketSlice";

const socketManager: Middleware<{}> = (store) => {
  let socketClient: Client | null = null;
  return (next) => {
    return (action) => {
      if (action.type === "auth/login/fulfilled" || action.type === "auth/getMe/fulfilled") {
        const authHeader = generateAuthHeader();
        if (authHeader) {
          socketClient = generateSocketClient();
          if (socketClient) {
            socketClient.connectHeaders = authHeader;
            socketClient.onConnect = () => {
              if (socketClient?.connected) {
                socketClient.subscribe("/user/queue/notification", (msg) => {
                  const body = JSON.parse(msg.body);
                  store.dispatch(recieveJudgeMessage(body));
                });
                socketClient.subscribe("/user/queue/problem/run", (msg) => {
                  const body = JSON.parse(msg.body);
                  store.dispatch(recieveRunMessage(body));
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
        if (socketClient) {
          socketClient.deactivate();
        }
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
