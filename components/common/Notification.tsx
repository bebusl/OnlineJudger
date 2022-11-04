import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../hooks/useStore";

const NotiCard = () => {
  const notiMessage = useAppSelector((state) => state.noti.message);

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

const Card = styled.div<{ $variant: "normal" | "success" | "error" }>`
  width: fit-content;
  min-width: 250px;
  padding: 10px 0;
  margin: 5px auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: 5px 5px 5px ${({ theme }) => theme.colors.gray200};
  border: 1px solid ${({ theme, $variant }) => theme.colors[$variant]};
  background-color: ${({ theme, $variant }) => theme.colors[$variant]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  animation-name: ${slideInandOut};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const NotiContainer = styled.aside`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;
