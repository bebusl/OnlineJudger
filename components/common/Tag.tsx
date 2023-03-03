import React from "react";
import styled from "styled-components";

const Tag = styled.span<{ backgroundColor?: string; whiteText?: boolean }>`
  display: inline-block;
  width: fit-content;
  padding: 5px;
  margin: 5px;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.gray150};
  border-radius: 5px;
  color: ${({ whiteText }) => (whiteText ? "white" : "inherit")};
`;

export default Tag;

export const SuccessTag = (
  <Tag backgroundColor="#68E074" whiteText>
    성공
  </Tag>
);

export const PendingTag = (
  <Tag backgroundColor="#FFD749" whiteText>
    대기
  </Tag>
);

export const FailureTag = (
  <Tag backgroundColor="#E06868" whiteText>
    실패
  </Tag>
);

export const StatusTagMapper: Record<string, JSX.Element> = {
  SUCCESS: SuccessTag,
  PENDING: PendingTag,
  FAILURE: FailureTag,
};

export const Lv1Tag = (
  <Tag backgroundColor="rgb(27, 186, 255)" whiteText>
    Lv.1
  </Tag>
);
export const Lv2Tag = (
  <Tag backgroundColor="rgb(71, 200, 76)" whiteText>
    Lv.2
  </Tag>
);
export const Lv3Tag = (
  <Tag backgroundColor="rgb(255, 168, 0)" whiteText>
    Lv.3
  </Tag>
);
export const Lv4Tag = (
  <Tag backgroundColor="rgb(255, 107, 24)" whiteText>
    Lv.4
  </Tag>
);
export const Lv5Tag = (
  <Tag backgroundColor="rgb(198, 88, 225)" whiteText>
    Lv.5
  </Tag>
);

export const LvTagMapper: Record<string, JSX.Element> = {
  1: Lv1Tag,
  2: Lv2Tag,
  3: Lv3Tag,
  4: Lv4Tag,
  5: Lv5Tag,
};
