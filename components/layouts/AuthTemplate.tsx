import styled from "styled-components";
import { FlexBox } from "../common";

interface Props {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const AuthTemplate = ({
  title = "LOGIN",
  subTitle = "서비스를 이용하기 위해서는 로그인이 필요합니다",
  children,
}: Props) => (
  <Container flexDirection="row">
    <LeftBox>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </LeftBox>
    <RightBox>
      <div>{children}</div>
    </RightBox>
  </Container>
);

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
  align-items: stretch;
  flex-wrap: wrap;
  & > div {
    flex-grow: 1;
  }
`;

const LeftBox = styled.div`
  background-color: #7a82d2;
  background-image: linear-gradient(#8c95e5 2px, transparent 1px),
    linear-gradient(to right, #8c95e5 2px, transparent 1px);
  background-size: 50px 50px;
  padding: 80px 0 0 60px;
  ${({ theme }) => theme.mediaQueries.tablet} {
    background: none;
    height: 1rem;
    padding: 2rem 0;
  }
`;

const RightBox = styled(FlexBox)`
  & > div {
    width: 60%;
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    width: 100%;
    padding: 1rem 0;
  }
`;

const Title = styled.h1`
  -webkit-text-stroke: 1px #9747ff;
  font-size: ${({ theme }) => theme.fontSizes[6]};
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.mediaQueries.tablet} {
    -webkit-text-stroke: 0;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    text-align: center;
  }
`;

const SubTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.mediaQueries.tablet} {
    display: none;
  }
`;

export default AuthTemplate;
