import React from "react";
import Link from "next/link";

import { ProblemDetail } from "../../../../api/scheme/problem";

import styled from "styled-components";
import { Button, FlexBox } from "../../../common";
import { LogoIconMapper } from "../../../LanguageAsset";
//import { LvTagMapper } from "../../../common/Tag";
import { useRouter } from "next/router";

const ProblemCard = (props: ProblemDetail) => {
  const router = useRouter();
  return (
    <CardGrid
      onClick={() => {
        router.push(`/problem/${props.id}`);
      }}
    >
      <div>
        <b>{props.title}</b>
        {/* {LvTagMapper[props.level]} */}
      </div>
      <FlexBox flexDirection="row" justifyContent="start">
        {props.languages?.map((language) => LogoIconMapper[language])}
      </FlexBox>
      <FlexBox
        flexDirection="row"
        style={{ fontSize: "12px" }}
        justifyContent="start"
        alignItems="center"
      >
        {props.tags?.map((tag) => (
          <p key={props.title + tag.id} style={{ fontSize: "12px" }}>
            #{tag.name}
          </p>
        ))}
      </FlexBox>
      <Link href={`/problem/${props.id}`} passHref>
        <Button
          style={{
            backgroundColor: "black",
            fontSize: "14px",
            justifySelf: "right",
          }}
        >
          문제풀기→
        </Button>
      </Link>
    </CardGrid>
  );
};

export default ProblemCard;

const CardGrid = styled.div`
  display: grid;
  height: 150px;
  padding: 30px 40px;
  cursor: pointer;

  width: 800px;
  background-color: white;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;

  & div:first-child,
  div:nth-child(2) {
    grid-column: 1 / span 2;
    font-size: 18px;
  }
`;
