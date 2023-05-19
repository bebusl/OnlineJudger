import React, { ReactElement, useEffect, useRef, useState } from "react";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";

import { getProblemDetail, getProblems } from "../../api/problemsAPI";
import { GetProblemResponse } from "../../api/scheme/problem";

import * as View from "../../components/unit/problem/problemSolveView";
import { LANGUAGES_TYPE, PYTHON3 } from "../../utils/constants/language";
import {
  HorizontalResizableBox,
  VerticalResizableBox,
} from "../../components/common/ResizableBox";
import BreadCrumbs from "../../components/layouts/BreadCrumbs";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { useAppDispatch } from "../../hooks/useStore";
import { resetRunMessage } from "../../store/slice/socketSlice";
import { useRouter } from "next/router";
import { FlexBox } from "../../components/common";
import MetaTags from "../../components/common/MetaTags";

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
  const router = useRouter();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useAppDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGES_TYPE>(
    languages ? languages[0] : PYTHON3
  );

  useEffect(() => {
    return () => {
      dispatch(resetRunMessage()); //unmount 시 기존에 실행한 실행 결과 지워주기
    };
  }, []);

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
  if (router.isFallback) {
    return (
      <FlexBox style={{ width: "100vw", height: "100vh" }}>로딩 중...</FlexBox>
    );
  }

  return (
    <>
      <MetaTags
        title={`${title} | YOONLEEVERSE OJ`}
        description={`${title} 문제 풀기`}
        url={`https://uni.yoonleeverse.com/problem/${id}`}
      />
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

export async function getStaticPaths() {
  const res = await getProblems({ page: 0 });
  if (res.data.success) {
    const { data } = res;
    const endOfId = data.problems[0]?.id;
    const paths = [...new Array(endOfId).keys()].map((idx) => ({
      params: { problemId: (idx + 1).toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ problemId: string }>
) {
  const problemId = ctx.params?.problemId;
  if (problemId) {
    try {
      const problemDetail = await getProblemDetail(problemId);
      if (problemDetail.data?.success)
        return {
          props: problemDetail.data,
          revalidate: 3,
        };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
  return {
    notFound: true,
  };
}

ProblemDetail.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ProblemDetail;
