import React, { ReactElement, useEffect, useRef, useState } from "react";
import { NextPageContext } from "next";
import dynamic from "next/dynamic";

import { getProblemDetail } from "../../api/problemsAPI";
import { GetProblemResponse } from "../../api/scheme/problem";

import * as View from "../../components/unit/problem/problemSolveView";
import { LANGUAGES_TYPE } from "../../utils/constants/language";
import {
  HorizontalResizableBox,
  VerticalResizableBox,
} from "../../components/common/ResizableBox";
import BreadCrumbs from "../../components/layouts/BreadCrumbs";

import { editor } from "monaco-editor/esm/vs/editor/editor.api";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

const editorLanguageMapper = {
  JAVA: "java",
  CPP: "cpp",
  C: "cpp",
  PYTHON2: "python",
  PYTHON3: "python",
};
function ProblemDetail(props: GetProblemResponse) {
  const { id, title, test_case_examples, languages } = props;
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGES_TYPE>(
    languages[0]
  );

  const getCode = () => editorRef.current?.getValue();
  const resetCode = () => {
    editorRef.current?.setValue("");
    editorRef.current?.focus();
  };

  const Editor = (
    <MonacoEditor
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      language={editorLanguageMapper[selectedLanguage]}
      options={{
        minimap: { enabled: false },
      }}
    />
  );

  const ProblemSolveSection = (
    <VerticalResizableBox
      topChild={Editor}
      bottomChild={<View.ResultConsole testCases={test_case_examples} />}
    />
  );

  return (
    <>
      <BreadCrumbs
        paths={[
          { text: "HOME", href: "/" },
          { text: "PROBLEM", href: "/problem" },
          { text: title, href: `${id}` },
        ]}
      />
      <View.Header>
        <h1>{title}</h1>
        <select
          name="language"
          onChange={(e) => {
            setSelectedLanguage(e.target.value as LANGUAGES_TYPE);
          }}
        >
          {languages.map((language) => (
            <option value={language} key={language}>
              {language}
            </option>
          ))}
        </select>
      </View.Header>
      <section>
        <HorizontalResizableBox
          leftChild={<View.ProblemDescription problem={props} />}
          rightChild={ProblemSolveSection}
        />
        <View.BottomBar
          getCode={getCode}
          resetCode={resetCode}
          language={selectedLanguage}
          problemId={id}
        />
      </section>
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
  return <>{page}</>;
};

export default ProblemDetail;
