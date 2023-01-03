import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAppSelector } from "../../../hooks/useStore";

import * as S from "./Notification.style";

const NotiCard = () => {
  const notiMessage = useAppSelector((state) => state.noti.message);

  return (
    <S.NotiContainer>
      {notiMessage.map((value) => (
        <S.Card key={value.id} $variant={value.variant}>
          {value.message}
        </S.Card>
      ))}
    </S.NotiContainer>
  );
};

function Notification() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (isMount) {
    const element = document.getElementById("notification-portal") as Element;
    return ReactDOM.createPortal(<NotiCard />, element);
  }
  return null;
}

export default Notification;
