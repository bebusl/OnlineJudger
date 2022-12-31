import React, { DragEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import FlexBox from "../FlexBox";

const nullImg = () => {
  const img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return img;
};

function VerticalResizableBox({
  topChild,
  bottomChild,
}: {
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
}) {
  const [controllerClientY, setControllerClientY] = useState(0);

  const resizeVertical: DragEventHandler = (e) => {
    if (e.clientY !== 0) setControllerClientY(e.clientY);
  };

  const handleDragStart: DragEventHandler = (e) => {
    e.dataTransfer.setDragImage(nullImg(), 0, 0);
  };

  return (
    <Container>
      <View
        style={controllerClientY ? { height: `${controllerClientY}px` } : {}}
      >
        {topChild}
      </View>
      <Controller
        draggable
        onDragStart={handleDragStart}
        onDrag={resizeVertical}
      />
      <View
        style={
          controllerClientY
            ? {
                height:
                  controllerClientY &&
                  `calc(100% - ${controllerClientY}px - 24px)`,
              }
            : {}
        }
      >
        {bottomChild}
      </View>
    </Container>
  );
}

export default VerticalResizableBox;

const Container = styled(FlexBox)`
  width: 100%;
  height: 90vh;
  align-items: stretch;
  justify-content: stretch;
`;

const View = styled.section``;

const Controller = styled.div`
  background: url("/images/grip/img-grippie-horizon.png") no-repeat;
  background-size: 2.25rem 0.875rem;
  background-position-y: bottom;
  background-position: center;
  height: 24px;
  cursor: ns-resize;
  border-top: 1px solid ${({ theme }) => theme.colors.gray150};
  :hover {
    background-image: url("/images/grip/img-grippie-horizon-hover.png");
  }
`;
