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

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleResultEditorDidMount(editor) {
    resultRef.current = editor;
  }

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
        onMount={handleEditorDidMount}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
      <MonacoEditor
        height="30vh"
        language={language}
        onMount={handleResultEditorDidMount}
        value={result}
        options={{
          readOnly: true,
        }}
      />

      <Button
        onClick={() => {
          console.log(
            "CHECK",
            editorRef.current?.getValue(),
            typeof editorRef.current?.getValue(),
            JSON.stringify(editorRef.current?.getValue()) //JSON.stringify로 new line 포함해서 한 줄로 만들어줄 수 잇음.
          );
          setResult(Date.now().toString());
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
