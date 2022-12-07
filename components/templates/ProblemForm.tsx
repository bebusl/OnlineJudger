import React, { FormEventHandler, useRef, useState } from "react";

import useForm from "../../hooks/useForm";

import { AddProblemRequest } from "../../api/scheme/problem";

import { toggleSetItem } from "../../utils/setTypeUtils";

import { LANGUAGES } from "../../constants/language";
import { TAGS } from "../../constants/tag";

import { Button, FlexBox, Seperator } from "../../components/common";
import { LabeledTextArea } from "../../components/common/TextArea";
import { LabeledInput } from "../../components/common/Input";
import Selector from "../common/Selector";
import DropZone from "../common/DropZone";
import Subscription from "../common/Typhography/Subscription";

interface FormProps extends AddProblemRequest {
  readOnly: boolean;
  handleSubmit(data: FormData): void;
  submitButtonText?: string;
}

const defaultExampleValue = [
  { input: "입력값을 작성해주세요", output: "출력값을 작성해주세요" },
];

function ProblemForm({
  title,
  time_limit,
  test_case_examples = defaultExampleValue,
  readOnly,
  desc,
  input_desc,
  memory_limit,
  output_desc,
  handleSubmit,
}: FormProps) {
  const [examples, setExamples] =
    useState<{ input: string; output: string }[]>(test_case_examples);
  const [selectedTags, setSelectedTag] = useState(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());
  const { getRef, getAllValues, isValid, handleBlur, isValidInputs } = useForm({
    types: ["title", "timeLimit", "memoryLimit", "description"],
  });
  const [testcaseFile, setTestcaseFile] = useState<File | null>(null);

  const tagOptions = TAGS.map((tag) => ({
    text: tag,
    checked: selectedTags.has(tag),
  }));

  const languageOptions = LANGUAGES.map((language) => ({
    text: language,
    checked: selectedLanguages.has(language),
  }));

  const formRef = useRef<HTMLFormElement>(null); //제거대상

  const handleGeSubmit: FormEventHandler = (e) => {
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
      if (testcaseFile) result.append("file", testcaseFile, testcaseFile.name);
      console.log(getAllValues());
      //handleSubmit(result);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleGeSubmit} style={{ maxWidth: "800px" }}>
      <LabeledInput
        name="title"
        forwardref={getRef("title")}
        text="제목"
        defaultValue={title}
        readOnly={readOnly}
        onBlur={() => handleBlur("title")}
        isValid={isValid.title}
      />
      <LabeledInput
        text="시간제한"
        name="time_limit"
        type="number"
        forwardref={getRef("timeLimit")}
        defaultValue={time_limit}
        readOnly={readOnly}
      />
      <LabeledInput
        text="메모리제한"
        name="memory_limit"
        type="number"
        forwardref={getRef("memoryLimit")}
        defaultValue={memory_limit}
        readOnly={readOnly}
      />

      <FlexBox flexDirection="row" gap="1rem">
        <Selector
          groupName="채점 가능 언어"
          options={languageOptions}
          onChange={(e) => {
            const currentValue = e.target.value;
            setSelectedLanguages((prev) => toggleSetItem(prev, currentValue));
          }}
        />
        <Selector
          groupName="태그"
          options={tagOptions}
          onChange={(e) => {
            const currentValue = e.target.value;
            setSelectedTag((prev) => toggleSetItem(prev, currentValue));
          }}
        />
      </FlexBox>
      <LabeledTextArea
        forwardRef={getRef("description")}
        text="문제 설명"
        name="description"
        defaultValue={desc}
        readOnly={readOnly}
      />

      <LabeledTextArea
        text="입력 설명"
        name="input_desc"
        value={input_desc}
        readOnly={readOnly}
      />
      <LabeledTextArea
        text="출력 설명"
        name="output_desc"
        value={input_desc}
        readOnly={readOnly}
      />
      <h3>예시</h3>
      <Seperator />
      {examples.map((exampleValue, idx) => {
        return (
          <>
            <FlexBox key={idx} flexDirection="row" alignItems="stretch">
              <LabeledTextArea
                text={`입력예제${idx}`}
                name={`input_example_${idx}`}
                readOnly={readOnly}
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
              <LabeledTextArea
                text={`출력예제${idx}`}
                name={`output_example_${idx}`}
                readOnly={readOnly}
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
                  width="1rem"
                  onClick={(e) => {
                    e.preventDefault();
                    setExamples((prev) => {
                      const updatedState = [...prev];
                      updatedState.splice(idx, 1);
                      return updatedState;
                    });
                  }}
                >
                  -
                </Button>
              )}
            </FlexBox>
          </>
        );
      })}
      {!readOnly && examples.length < 3 && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setExamples((prev) => [...prev, { input: "", output: "" }]);
          }}
          $variant={"outline"}
        >
          +Add Example
        </Button>
      )}

      {!readOnly && (
        <>
          <h4>테스트케이스 파일 업로드</h4>
          <Subscription>
            [title].in, [title].out 쌍으로 이루어진 zip파일만 정상적으로 등록
            가능합니다.
          </Subscription>
          <Seperator />
          <DropZone
            file={testcaseFile}
            cancleFile={() => setTestcaseFile(null)}
            setFile={(file: File) => setTestcaseFile(file)}
          />
          <FlexBox justifyContent="space-between" flexDirection="row">
            <Button $variant="outline">취소</Button>
            <Button type="submit">제출</Button>
          </FlexBox>
        </>
      )}
    </form>
  );
}

export default ProblemForm;
