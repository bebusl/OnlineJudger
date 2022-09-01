import styled from "styled-components";
import { Card } from "../common/Card";
import { FlexBox } from "../common/shared";

interface Props {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const AuthTemplate = ({
  title = "LOGIN",
  subTitle = "서비스를 이용하기 위해서는 로그인이 필요합니다",
  children,
}: Props) => {
  return (
    <Container flexDirection="row">
      <LeftBox alignItems="start" justifyContent="start">
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </LeftBox>
      <RightBox>{children}</RightBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const LeftBox = styled(FlexBox)`
  background-color: #7a82d2;
  background-image: linear-gradient(#8c95e5 2px, transparent 1px),
    linear-gradient(to right, #8c95e5 2px, transparent 1px);
  background-size: 50px 50px;
  width: 50%;
  height: 100%;
  padding: 80px 0 0 60px;
`;

const RightBox = styled(FlexBox)`
  width: 50%;
  height: 100%;
`;

const Title = styled.span`
  width: 142px;
  height: 61px;
  flex-grow: 0;
  -webkit-text-stroke: 1px #9747ff;
  font-size: ${({ theme }) => theme.fontSizes[6] + "px"};
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
`;

const SubTitle = styled.span`
  width: 324px;
  height: 22px;
  flex-grow: 0;
  font-size: ${({ theme }) => theme.fontSizes[2] + "px"};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
`;

export default AuthTemplate;
