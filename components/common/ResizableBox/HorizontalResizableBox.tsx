import React, { DragEventHandler, useState } from "react";
import styled from "styled-components";
import FlexBox from "../FlexBox";
import useNullImg from "./useNullImg";

const CONTROLLER_WIDTH = "24px";

function ResizableBox({
  leftChild,
  rightChild,
}: {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}) {
  const [controllerClientX, setControllerClientX] = useState(0);
  const nullImg = useNullImg();

  const resizeVertical: DragEventHandler = (e) => {
    if (e.clientX !== 0) setControllerClientX(e.clientX);
  };

  const handleDragStart: DragEventHandler = (e) => {
    if (nullImg) e.dataTransfer.setDragImage(nullImg, 0, 0);
  };

  return (
    <Container>
      <View
        style={controllerClientX ? { width: `${controllerClientX}px` } : {}}
      >
        {leftChild}
      </View>
      <Controller
        draggable
        onDragStart={handleDragStart}
        onDrag={resizeVertical}
      />
      <View
        style={
          controllerClientX
            ? {
                width:
                  controllerClientX &&
                  `calc(100% - ${controllerClientX}px - ${CONTROLLER_WIDTH})`,
              }
            : {}
        }
      >
        {rightChild}
      </View>
    </Container>
  );
}

export default ResizableBox;

const Container = styled(FlexBox).attrs({ flexDirection: "row" })`
  width: 100vw;
  height: 90vh;
  align-items: stretch;
  ${({ theme }) => theme.mediaQueries.tablet} {
    flex-wrap: wrap;
  }
`;

const View = styled.section`
  width: calc(50% - 12px);
  ${({ theme }) => theme.mediaQueries.tablet} {
    width: 100%;
  }
`;

const Controller = styled.div`
  background: url("/images/grip/img-grippie-vertical.png") no-repeat;
  background-size: 0.875rem 2.25rem;
  background-position: center;
  width: ${CONTROLLER_WIDTH};
  cursor: ew-resize;
  border-right: 1px solid ${({ theme }) => theme.colors.gray150};
  :hover {
    background-image: url("/images/grip/img-grippie-vertical-hover.png");
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    display: none;
  }
`;
