import React, { DragEventHandler, useRef, useState } from "react";
import styled, { css } from "styled-components";
import FlexBox from "../FlexBox";

const nullImg = () => {
  const img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return img;
};

function ResizableBox({
  leftChild,
  rightChild,
}: {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}) {
  const [controllerClientX, setControllerClientX] = useState(0);

  const resizeVertical: DragEventHandler = (e) => {
    if (e.clientX !== 0) setControllerClientX(e.clientX);
  };

  const handleDragStart: DragEventHandler = (e) => {
    e.dataTransfer.setDragImage(nullImg(), 0, 0);
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
                  controllerClientX && `calc(100% - ${controllerClientX}px)`,
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
`;

const View = styled.section`
  width: calc(50% - 12px);
`;

const Controller = styled.div`
  background: url("/images/grip/img-grippie-vertical.png") no-repeat;
  background-size: 0.875rem 2.25rem;
  background-position: center;
  width: 24px;
  cursor: ew-resize;
  border-right: 1px solid ${({ theme }) => theme.colors.gray150};
  :hover {
    background-image: url("/images/grip/img-grippie-vertical-hover.png");
  }
`;
