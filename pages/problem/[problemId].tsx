import React, { ReactElement, useEffect, useRef, useState } from "react";
import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { getProblemDetail } from "../../api/problemsAPI";
import { GetProblemResponse } from "../../api/scheme/problem";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { resetRunMessage } from "../../store/slice/socketSlice";

import { LANGUAGES_TYPE } from "../../utils/constants/language";
import styled from "styled-components";
import { Button, FlexBox } from "../../components/common";
import Table from "../../components/common/Table/Table";
import { gradeProblem, runProblem } from "../../api/submissionsAPI";
import ScrollBox from "../../components/common/ScrollBox";
import BreadCrumbs from "../../components/layouts/BreadCrumbs";
import ConfirmDialogue from "../../components/common/Dialogue/ConfirmDialogue";

const RankingModal = dynamic(
  import("../../components/submissions/RankingModal"),
  {
    ssr: false,
  }
);
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

function ProblemDetail({
  id,
  title,
  time_limit,
  memory_limit,
  desc,
  input_desc,
  output_desc,
  test_case_examples,
  languages,
}: GetProblemResponse) {
  const router = useRouter();
  const isLogin = useAppSelector((store) => store.auth.isLogin);
  const runResult = useAppSelector((store) => store.socket.runResult);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState({ open: false, content: 0 });
  const [language, setLanguage] = useState<LANGUAGES_TYPE>(languages[0]);
  const editorRef = useRef(null);

  const submitCode = () => {
    const code = editorRef.current?.getValue();
    gradeProblem(id, code, language);
  };

  useEffect(() => {
    return () => {
      dispatch(resetRunMessage());
    };
  }, []);

  return (
    <>
      {openModal.open && openModal.content === 0 && (
        <RankingModal
          onClose={() => setOpenModal({ open: false, content: -1 })}
          problemId={id}
        />
      )}
      {openModal.open && openModal.content === 1 && (
        <ConfirmDialogue
          onConfirm={() => {
            submitCode();
            router.push("/user/problem");
          }}
          onClose={() => setOpenModal({ open: false, content: -1 })}
          message={"제출을 하면 이 페이지를 벗어나게 됩니다."}
        />
      )}

      <Header as={"nav"} flexDirection="row" justifyContent="space-between">
        <h1>{title}</h1>
        <select
          name="language"
          id="language-select"
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          {languages.map((language) => (
            <option value={language} key={language}>
              {language}
            </option>
          ))}
        </select>
      </Header>
      {/**문제 설명 섹션 */}
      <FlexBox flexDirection="row" style={{ width: "100vw" }}>
        <ScrollBox
          as="section"
          style={{
            width: "50%",
            height: "80vh",
            padding: "16px",
            color: "#263747",
          }}
        >
          <article>
            <h3>문제 설명</h3>
            <p>{desc}</p>
          </article>
          <hr />
          <article>
            <h3>제한사항</h3>
            <h4>메모리</h4>
            <p>{time_limit}</p>
            <h4>시간</h4>
            <p>{memory_limit}</p>
            <h4>제출 가능 언어</h4>
            <p>{languages.join(" ")}</p>
          </article>
          <hr />
          <article>
            <>
              <h3>입출력 설명</h3>
              <h4>입력 설명</h4>
              <p>{input_desc}</p>
              <h4>출력 설명</h4>
              <p>{output_desc}</p>
              <hr />
              <h3>예제</h3>
              <Table
                header={[
                  { field: "input", header: "입력" },
                  { field: "output", header: "출력" },
                ]}
                body={test_case_examples}
              />
            </>
          </article>
        </ScrollBox>
        {/**화면 오른쪽 섹션 */}
        <section style={{ width: "50%", padding: "16px" }}>
          {/**에디터 */}
          <MonacoEditor
            height="50vh"
            language={language}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
          {/**테스트 결과 콘솔 */}
          <FlexBox style={{ height: "30vh" }}>
            <ScrollBox>
              <ul>
                {!!Object.keys(runResult).length &&
                  runResult?.result_list?.length > 1 &&
                  runResult?.result_list?.slice(1).map((result, idx) => {
                    return (
                      <>
                        <STable>
                          <tbody>
                            <tr className="title">
                              <td>테스트{idx + 1}</td>
                            </tr>
                            <tr>
                              <td align="right">
                                입력 <span>〉</span>
                              </td>
                              <td>{test_case_examples[idx]?.input}</td>
                            </tr>
                            <tr>
                              <td align="right">
                                기대값 <span>〉</span>
                              </td>
                              <td>
                                <pre>{test_case_examples[idx]?.output}</pre>
                              </td>
                            </tr>
                            <tr>
                              <td align="right">
                                실행결과 <span>〉</span>
                              </td>
                              <td>
                                <pre>{result.output}</pre>
                              </td>
                            </tr>
                            <tr>
                              <td align="right">
                                출력 <span>〉</span>
                              </td>
                              <td
                                className={result.correct ? "right" : "wrong"}
                              >
                                {result.correct ? "맞았습니다" : "틀렸습니다"}
                              </td>
                            </tr>
                          </tbody>
                        </STable>
                      </>
                    );
                  })}
              </ul>
              {!Object.keys(runResult).length && (
                <code>실행 결과가 여기에 표시됩니다.</code>
              )}

              {!!Object.keys(runResult).length && (
                <>
                  <code>테스트 결과 (~˘▾˘)~</code>
                  <code>{runResult?.status}</code>
                  {runResult?.result_list?.length && (
                    <code>
                      {runResult?.result_list?.length - 1}개 중
                      {
                        runResult.result_list
                          ?.slice(1)
                          .filter((result) => result.correct).length
                      }
                      개 성공
                    </code>
                  )}
                </>
              )}
            </ScrollBox>
          </FlexBox>
        </section>
      </FlexBox>
      {/* 하단 바 */}
      <FlexBox flexDirection="row" justifyContent={"space-between"}>
        {isLogin ? (
          <>
            <Button onClick={() => setOpenModal({ open: true, content: 0 })}>
              다른 유저의 코드 보기
            </Button>
            <div>
              <Button
                onClick={() => {
                  editorRef.current.setValue("");
                  editorRef.current.focus();
                }}
              >
                초기화
              </Button>
              <Button
                onClick={() => {
                  const code = editorRef.current?.getValue();
                  runProblem(id, code, language);
                }}
              >
                코드 실행
              </Button>
              <Button
                onClick={() => {
                  setOpenModal({ open: true, content: 1 });
                }}
              >
                제출 및 채점
              </Button>
            </div>
          </>
        ) : (
          <>
            <div />
            <Button onClick={() => router.push("/login")}>로그인하기</Button>
          </>
        )}
      </FlexBox>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { problemId } = ctx.query;
  if (problemId) {
    try {
      const problemDetail = await getProblemDetail(problemId as string);
      if (problemDetail.data?.success)
        return {
          props: problemDetail.data,
        };
    } catch (e) {
      return {
        redirect: {
          destination: "/problem?page=1",
          permanent: false,
        },
      };
    }
  }
}

ProblemDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <BreadCrumbs />
      <main>{page}</main>
    </>
  );
};

export default ProblemDetail;

const STable = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.gray500};
  & tr {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  & .title {
    font-weight: bold;
  }
  & .right {
    color: #5a65ff;
  }

  & .wrong {
    color: #ff5a5a;
  }
`;

const Header = styled(FlexBox)`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 0 60px;

  & h1 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
`;
