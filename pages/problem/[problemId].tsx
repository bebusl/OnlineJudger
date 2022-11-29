import React, { ReactElement, useEffect, useRef, useState } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { getProblemDetail } from "../../api/problemsAPI";
import {
  JAVA,
  C,
  CPP,
  PYTHON2,
  PYTHON3,
  LANGUAGES,
} from "../../constants/language";
import dynamic from "next/dynamic";
import { Button, FlexBox, Table } from "../../components/common";
import { WEB_SOCKET_URL } from "../../constants/url";
import { makeAuthHeader } from "../../utils/authUtils";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import { gradeProblem, runProblem } from "../../api/submissionsAPI";
import useNotification from "../../hooks/useNotification";
import ScrollBox from "../../components/common/ScrollBox";
import { useAppSelector } from "../../hooks/useStore";

const Ranking = dynamic(import("../../components/submissions/Ranking"), {
  ssr: false,
});
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface ProblemDetailProps {
  id: number;
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: Record<string, unknown>[];
  languages: (
    | typeof JAVA
    | typeof C
    | typeof CPP
    | typeof PYTHON2
    | typeof PYTHON3
  )[];
}

let socketClient: StompJS.Client | null = null;

function ProblemDetail(props: ProblemDetailProps) {
  const {
    id,
    title,
    time_limit,
    memory_limit,
    desc,
    input_desc,
    output_desc,
    test_case_examples,
    languages,
  } = props;
  const router = useRouter();
  const isLogin = useAppSelector((store) => store.auth.isLogin);

  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<LANGUAGES>(JAVA);
  const editorRef = useRef(null);
  const [result, setResult] = useState("실행 결과가 여기에 표시됩니다.");
  const addNoti = useNotification();

  function connection() {
    const sock = new SockJS(WEB_SOCKET_URL);
    socketClient = StompJS.over(sock);
    const authToken = makeAuthHeader();
    if (authToken && socketClient) {
      socketClient.connect(
        authToken,
        function () {
          if (socketClient?.connected) {
            socketClient?.subscribe("/user/queue/notification", (msg) => {
              const body = JSON.parse(msg.body);
              addNoti(body.message, body.variant);
            });
            socketClient?.subscribe("/user/queue/problem/run", (msg) => {
              console.log("실행 결과 왔슴당!", msg);
              const body = JSON.parse(msg.body);
              setResult(
                `컴파일 결과\n${
                  body.result_list.length > 0 ? "컴파일 성공" : "컴파일 실패"
                }\n실행 결과${body.result_list[1].result}\n채점 결과${
                  body.result_list[1].correct
                }`
              );
            });
          }
        },
        function (error) {
          console.log("ERROR", error);
        }
      );
    }
  }

  useEffect(() => {
    connection();
    return () => {
      if (socketClient?.connected) {
        socketClient?.disconnect(() => {
          console.log("socket disconnected");
        });
      }
    };
  }, []);

  return (
    <>
      <React.Suspense fallback={<div> 모달 생성 중</div>}>
        {isOpen && <Ranking onClose={() => setIsOpen(false)} problemId={id} />}
      </React.Suspense>

      <FlexBox as={"nav"} flexDirection="row" justifyContent="space-between">
        <h1>{title}</h1>
        <select
          name="language"
          id="language-select"
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="java">JAVA</option>
          <option value="python">PYTHON2</option>
          <option value="python">python3</option>
          <option value="c++">c++</option>
          <option value="c">c</option>
        </select>
      </FlexBox>
      <FlexBox flexDirection="row" style={{ width: "100vw" }}>
        <ScrollBox
          as="section"
          style={{ width: "50%", height: "80vh", padding: "16px" }}
        >
          <article>
            <h3>문제 설명</h3>
            <p>{desc}</p>
          </article>
          <article>
            <h3>제한사항</h3>
            <h4>메모리</h4>
            <p>{time_limit}</p>
            <h4>시간</h4>
            <p>{memory_limit}</p>
            <h4>제출 가능 언어</h4>
            <p>{languages.join(" ")}</p>
          </article>
          <article>
            <>
              <h3>입출력 설명</h3>
              <h4>입력 설명</h4>
              <p>{input_desc}</p>
              <h4>출력 설명</h4>
              <p>{output_desc}</p>
              <h3>예제</h3>
              {console.log("test_CASE", test_case_examples)}
              <Table
                header={[
                  { field: "input", header: "입력" },
                  { field: "output", header: "출력" },
                ]}
                body={
                  test_case_examples as Record<
                    string,
                    string | number | JSX.Element
                  >[]
                }
              />
            </>
          </article>
        </ScrollBox>

        <section style={{ width: "50%", padding: "16px" }}>
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
          <MonacoEditor
            height="30vh"
            language={language}
            value={result}
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
            }}
          />
        </section>
      </FlexBox>
      <FlexBox flexDirection="row" justifyContent={"space-between"}>
        {isLogin ? (
          <>
            <Button onClick={() => setIsOpen(true)}>
              다른 유저의 코드 보기
            </Button>
            <div>
              <Button onClick={() => editorRef.current.setValue("")}>
                초기화
              </Button>
              <Button
                onClick={() => {
                  const code = editorRef.current?.getValue();
                  runProblem(id, code, C);
                }}
              >
                코드 실행
              </Button>
              <Button
                onClick={() => {
                  const code = editorRef.current?.getValue();
                  gradeProblem(id, code, C);
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
  return <>{page}</>;
};

export default ProblemDetail;
