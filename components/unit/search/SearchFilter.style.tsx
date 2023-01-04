import styled from "styled-components";

export const Tag = styled.span<{ color: "language" | "tag" | "lv" | "reset" }>`
  display: inline-block;
  width: fit-content;
  padding: 10px;
  margin-right: 5px;
  background-color: ${({ color }) => {
    switch (color) {
      case "lv":
        return "#c3ffe5c2";
      case "tag":
        return "#d0dffd";
      case "language":
        return "#e6ceff";
      default:
        return "#ffffff";
    }
  }};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  & > button {
    border: none;
    background: none;
    box-shadow: none;
  }
`;

export const TagContainer = styled.div`
  padding: 0.5rem 0;
`;
