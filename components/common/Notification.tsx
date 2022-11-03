import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { useAuthSelector } from "../../store/useStore";

const NotiCard = () => {
  const notiMessage = useAuthSelector((state) => state.noti.message);

  return (
    <NotiContainer>
      {notiMessage.map((value) => (
        <Card key={value.id} $variant={value.variant}>
          {value.message}
        </Card>
      ))}
    </NotiContainer>
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

const slideInandOut = keyframes`
0%{
  opacity:0;
}

10%,90%{
  opacity: 1;
}
100%{
  opacity: 0;
}
  
`;

const Card = styled.div<{ $variant: string }>`
  width: 250px;
  background-color: ${({ theme, $variant }) => theme.colors[$variant]};
  animation-name: ${slideInandOut};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const NotiContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
`;
