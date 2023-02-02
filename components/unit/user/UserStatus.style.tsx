import styled from "styled-components";
import { FlexBox } from "../../common";

export const Card = styled(FlexBox).attrs({ as: "aside" })`
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
  box-shadow: ${({ theme }) => theme.shadows.light};
  gap: 1rem;
  padding: 1rem;
  > section {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray150};
    margin: 0;
  }
  .bold {
    font-weight: 700;
  }

  p {
    margin: 0.3rem;
  }
  p.xl {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  p.l {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
  p.m {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;
