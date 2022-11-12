import React, { useEffect, useRef, useState } from "react";
import { NextPageContext } from "next";
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
import { Button } from "../../components/common";
import { WEB_SOCKET_URL } from "../../constants/url";
import { makeAuthHeader } from "../../utils/authUtils";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import { gradeProblem } from "../../api/submissionsAPI";
import useNotification from "../../hooks/useNotification";

const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

let socketClient: StompJS.Client | null = null;
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
  const [language, setLanguage] = useState<LANGUAGES>(JAVA);
  const editorRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState("기본입니당~");
  const addNoti = useNotification();

  function connection() {
    const sock = new SockJS(WEB_SOCKET_URL);
    socketClient = StompJS.over(sock);
    console.log("STOMP CONNECT");
    socketClient.connect(makeAuthHeader(), function () {
      socketClient?.subscribe("/user/queue/notification", (msg) => {
        const body = JSON.parse(msg.body);
        addNoti(body.message, body.variant);
        console.log("body", body);
      });
    });
    socketClient.connect("/user/queue/problem/run", (msg) => {
      console.log("채점 결과왓으으");
    }); //0번은 컴파일 결과, 1번부터 채점 결과임.
    //0번만 있고, 그안에 응답이 correct:false면 컴파일 에러임.
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
      <section>
        <h1>{title}</h1>
        <article>
          <h2>문제 설명</h2>
          <p>{desc}</p>
        </article>
        <article>
          <h2>제한사항</h2>
          <h3>메모리</h3>
          <p>{time_limit}</p>
          <h3>시간</h3>
          <p>{memory_limit}</p>
          <h3>제출 가능 언어</h3>
          <p>{languages.join(" ")}</p>
        </article>
        <article>
          <h2>입출력 설명</h2>
          <h3>입력 설명</h3>
          <p>{input_desc}</p>
          <h3>출력 설명</h3>
          <p>{output_desc}</p>
          <h2>예제</h2>
          <p>{test_case_examples.join(" ")}</p>
        </article>
      </section>
      <select
        name="language"
        id="language-select"
        onChange={(e) => {
          setLanguage(e.target.value);
          editorRef.current?.setValue("");
        }}
      >
        <option value="java">JAVA</option>
        <option value="python">PYTHON2</option>
        <option value="python">python3</option>
        <option value="c++">c++</option>
        <option value="c">c</option>
      </select>
      <MonacoEditor
        height="50vh"
        language={language}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
      <MonacoEditor
        height="30vh"
        language={language}
        defaultValue={result}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
        }}
      />

      <Button
        onClick={() => {
          console.log(
            editorRef.current?.getValue(),
            typeof editorRef.current?.getValue(),
            JSON.stringify(editorRef.current?.getValue()) //JSON.stringify로 new line 포함해서 한 줄로 만들어줄 수 잇음.
          );
          const code = editorRef.current?.getValue();
          gradeProblem(id, code, "C");
        }}
      >
        확인하기
      </Button>
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

export default ProblemDetail;
