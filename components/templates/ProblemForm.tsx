import React, { useRef, useState } from "react";
import { Button } from "../../components/common";
import { LabelInput } from "../../components/common/Input";

import useForm from "../../hooks/useForm";

import TextArea from "../../components/common/TextArea";
import { LANGUAGES } from "../../constants/language";

interface ProblemDetail {
  title?: string;
  time_limit?: number;
  memory_limit?: number;
  desc?: string;
  input_desc?: string;
  output_desc?: string;
  test_case_examples?: { input: string; output: string }[];
  languages?: LANGUAGES[];
  tags?: string[];
}
interface FormProps extends ProblemDetail {
  readOnly: boolean;
  handleSubmit(data: FormData): void;
  submitButtonText?: string;
}

const defaultExampleValue = [
  { input: "입력값을 작성해주세요", output: "출력값을 작성해주세요" },
];

const static_tags = [
  "입출력",
  "사칙연산",
  "조건문",
  "반복문",
  "함수",
  "배열",
  "문자열",
  "브루트포스",
  "이분 탐색",
  "에라토스테네스의 체",
  "스택",
  "큐",
  "덱",
  "정렬",
  "해싱",
  "다이나믹 프로그래밍",
  "그래프 탐색(DFS/BFS)",
  "집합과 맵",
  "우선순위 큐",
  "분할 정복",
  "좌표 압축",
  "백트래킹",
  "트리",
  "최단거리알고리즘(데이크스트라등)",
  "분리집합",
  "누적합",
  "배낭문제",
  "위상정렬",
  "최소스패닝트리",
  "비트마스킹",
  "LIS",
  "LCS",
];

function ProblemForm({
  title,
  time_limit,
  test_case_examples = defaultExampleValue,
  tags,
  readOnly,
  desc,
  input_desc,
  languages,
  memory_limit,
  output_desc,
  handleSubmit,
}: FormProps) {
  const [testcaseFile, setTestcaseFile] = useState<File | null>();
  const [examples, setExamples] =
    useState<{ input: string; output: string }[]>(test_case_examples);
  const { getRef } = useForm({
    types: ["title", "timeLimit", "memoryLimit", "description"],
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const languages: string[] = [];
        const checkedElements = e.currentTarget.querySelectorAll(
          "input[type=checkbox]:checked"
        ) as NodeListOf<HTMLInputElement>;
        checkedElements.forEach((element) => languages.push(element.value));

        if (formRef.current) {
          const test = new FormData(formRef.current);

          const value = Object.fromEntries(test.entries()) as Record<
            string,
            unknown
          >;
          value.languages = languages;
          value.tags = ["DP"];
          value.test_case_examples = examples;
          const result = new FormData();
          result.append("req", JSON.stringify(value));
          if (testcaseFile)
            result.append("file", testcaseFile, testcaseFile.name);

          handleSubmit(result);
        }
      }}
    >
      <LabelInput
        name="title"
        grandchildRef={getRef("title")}
        defaultValue={title}
        readOnly={readOnly}
      />
      <LabelInput
        name="time_limit"
        type="number"
        grandchildRef={getRef("timeLimit")}
        defaultValue={time_limit}
        readOnly={readOnly}
      />
      <LabelInput
        name="memory_limit"
        type="number"
        grandchildRef={getRef("memoryLimit")}
        defaultValue={memory_limit}
        readOnly={readOnly}
      />
      <label htmlFor="description">문제 설명</label>
      <TextArea
        ref={getRef("description")}
        defaultValue={desc}
        readOnly={readOnly}
        name="desc"
      />
      <h4>입력설명</h4>
      <TextArea readOnly={readOnly} value={input_desc} name="input_desc" />
      <h4>출력설명</h4>
      <TextArea readOnly={readOnly} value={output_desc} name="output_desc" />
      <h4>예시</h4>
      {examples.map((exampleValue, idx) => {
        return (
          <>
            <TextArea
              readOnly={readOnly}
              style={{ height: "100px" }}
              value={exampleValue.input}
              onChange={(e) => {
                const value = e.target.value;
                setExamples((prev) => {
                  const currentValue = {
                    input: value,
                    output: examples[idx].output,
                  };
                  const updatedExample = [...prev];
                  updatedExample.splice(idx, 1, currentValue);
                  return updatedExample;
                });
              }}
            />
            <TextArea
              readOnly={readOnly}
              style={{ height: "100px" }}
              value={exampleValue.output}
              onChange={(e) => {
                const value = e.target.value;
                setExamples((prev) => {
                  const currentValue = {
                    input: examples[idx].input,
                    output: value,
                  };
                  const updatedExample = [...prev];
                  updatedExample.splice(idx, 1, currentValue);
                  return updatedExample;
                });
              }}
            />
            {!readOnly && examples.length > 1 && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setExamples((prev) => {
                    const copyOfState = [...prev];
                    copyOfState.splice(idx, 1);
                    return copyOfState;
                  });
                }}
              >
                -delete
              </Button>
            )}
          </>
        );
      })}
      {!readOnly && examples.length < 3 && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setExamples((prev) => [...prev, { input: "", output: "" }]);
          }}
        >
          +Add Example
        </Button>
      )}
      <h4>테스트케이스 파일 업로드</h4>
      <p>
        [title].in, [title].out 쌍으로 이루어진 zip파일만 정상적으로 등록
        가능합니다.
      </p>
      {testcaseFile ? (
        <div
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#fff",
            border: "1px solid #ededed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            <b>
              {testcaseFile.name}({testcaseFile.size})
            </b>
          </p>
          <Button onClick={(e) => setTestcaseFile(null)}>취소하기</Button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#fff",
            border: "1px solid #ededed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.items.length === 1) {
              const file = e.dataTransfer.items[0].getAsFile();
              if (file) setTestcaseFile(file);
            }
          }}
        >
          <input
            type="file"
            accept=".zip"
            onChange={(e) => {
              const target = e.target;
              if (target && target.files?.length === 1) {
                setTestcaseFile(target.files[0]);
              }
            }}
          />
        </div>
      )}
      <label htmlFor="languages">채점가능언어</label>
      <fieldset>
        <legend>채점 가능한 언어를 선택해주세요</legend>
        <label htmlFor="C">C</label>
        <input
          type="checkbox"
          name="languages"
          value="C"
          id="C"
          defaultChecked={languages?.includes("C")}
        />
        <label htmlFor="CPP">C++</label>
        <input
          type="checkbox"
          name="languages"
          value="CPP"
          id="CPP"
          defaultChecked={languages?.includes("CPP")}
        />
        <label htmlFor="JAVA">JAVA</label>
        <input
          type="checkbox"
          name="languages"
          value="JAVA"
          id="JAVA"
          defaultChecked={languages?.includes("JAVA")}
        />
        <label htmlFor="PYTHON2">PYTHON2</label>
        <input
          type="checkbox"
          name="languages"
          value="PYTHON2"
          id="PYTHON2"
          defaultChecked={languages?.includes("PYTHON2")}
        />
        <label htmlFor="PYTHON3">PYTHON3</label>
        <input
          type="checkbox"
          name="languages"
          value="PYTHON3"
          id="PYTHON3"
          defaultChecked={languages?.includes("PYTHON3")}
        />
      </fieldset>

      <select multiple name="tags">
        {static_tags.map((tag) => (
          <option value={tag} key={tag}>
            {tag}
          </option>
        ))}
      </select>

      {!readOnly && (
        <>
          <Button>취소</Button>
          <Button type="submit">제출</Button>
        </>
      )}
    </form>
  );
}
//   const mock = {
//     title: "Hello World",
//     time_limit: 10000,
//     memory_limit: 10000,
//     desc: "첫번째 단어 입력시 Hello 첫번째 단어, 두번쨰 단어 입력시 Hello2 두번째 단어가 출력되게 하여라.",
//     input_desc: "10자 이내의 단어가 엔터를 기준으로 두 번 입력된다.",
//     output_desc:
//       "첫번째 단어 입력시 Hello 첫번째 단어, 두번쨰 단어 입력시 Hello2 두번째 단어가 출력되어야 한다.",
//     test_case_examples: [
//       {
//         input: "World\nWorld2\n",
//         output: "Hello World\nHello2 World2\n",
//       },
//     ],
//     languages: ["C"],
//     tags: ["string"],
//   };

export default ProblemForm;
