import axios from "axios";
import React, { useEffect } from "react";

function Oauth2Redirect() {
  useEffect(() => {
    const accessToken = window.location.hash.split("&")[0].split("=")[1];

    (async function () {
      return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
    })()
      .then((data) => console.log("DATA?", data))
      .catch((e) => console.log("ERRER", e));
  }, []);
  return <div>연동완!</div>;
}

export default Oauth2Redirect;
// 연동 정보 정상적으로 불러왔을 떄는 연동 완료 띄우고 serversideRendering으로 다시 불러옴
// 연동 실패 시 연동x 알람 날리고
