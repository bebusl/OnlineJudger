import React, { FormEventHandler, useRef, useState } from "react";

import useForm from "../../hooks/useForm";
import { useRouter } from "next/router";

import { AddProblemRequest } from "../../api/scheme/problem";

import { toggleSetItem } from "../../utils/setTypeUtils";

import { LANGUAGES } from "../../utils/constants/language";
import { TAGS } from "../../utils/constants/tag";

import { Button, FlexBox, Seperator } from "../../components/common";
import { LabeledTextArea } from "../../components/common/TextArea";
import { LabeledInput } from "../../components/common/Input";
import Selector from "../common/Selector";
import DropZone from "../common/DropZone";
import Description from "../common/Typhography/Description";

interface FormProps extends Partial<AddProblemRequest> {
  readOnly: boolean;
  handleSubmit(data: FormData): void;
  submitButtonText?: string;
}

const defaultExampleValue = [{ input: "입력값을 작성해주세요", output: "출력값을 작성해주세요" }];

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
  const router = useRouter();

  const [examples, setExamples] = useState<{ input: string; output: string }[]>(test_case_examples);
  const [selectedTags, setSelectedTag] = useState(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());
  const [testcaseFile, setTestcaseFile] = useState<File | null>(null);
  const { getRef, getAllValues, isValid, handleBlur, isValidInputs } = useForm({
    types: ["title", "time_limit", "memory_limit", "desc", "input_desc", "output_desc"],
  });

  const tagOptions = TAGS.map((tag) => ({
    text: tag,
    checked: selectedTags.has(tag),
  }));

  const languageOptions = LANGUAGES.map((language) => ({
    text: language,
    checked: selectedLanguages.has(language),
  }));

  const generateSubmitFormData = () => {
    const refValues = getAllValues();
    const allValues = Object.assign(refValues, {
      tags: Array.from(selectedTags),
      languages: Array.from(selectedLanguages),
      level: 0,
      test_case_examples: examples,
    });

    const submitFormData = new FormData();
    submitFormData.append("req", JSON.stringify(allValues));
    if (testcaseFile) submitFormData.append("file", testcaseFile);

    return submitFormData;
  };

  const handleGeSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const submitData = generateSubmitFormData();
    handleSubmit(submitData);
  };

  return (
    <form onSubmit={handleGeSubmit} style={{ maxWidth: "800px" }}>
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
        forwardref={getRef("time_limit")}
        defaultValue={time_limit}
        readOnly={readOnly}
      />
      <LabeledInput
        text="메모리제한"
        name="memory_limit"
        type="number"
        forwardref={getRef("memory_limit")}
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
        forwardRef={getRef("desc")}
        text="문제 설명"
        name="desc"
        defaultValue={desc}
        readOnly={readOnly}
      />

      <LabeledTextArea
        text="입력 설명"
        name="input_desc"
        forwardRef={getRef("input_desc")}
        defaultValue={input_desc}
        readOnly={readOnly}
      />
      <LabeledTextArea
        text="출력 설명"
        name="output_desc"
        forwardRef={getRef("output_desc")}
        defaultValue={output_desc}
        readOnly={readOnly}
      />
      <h3>예시</h3>
      <Seperator />
      {examples.map((exampleValue, idx) => {
        return (
          <>
            <FlexBox key={idx} flexDirection="row" alignItems="flex-end">
              <LabeledTextArea
                text={`입력예제${idx + 1}`}
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
                text={`출력예제${idx + 1}`}
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
          <Description>
            [title].in, [title].out 쌍으로 이루어진 zip파일만 정상적으로 등록 가능합니다.
          </Description>
          <Seperator />
          <DropZone
            file={testcaseFile}
            cancleFile={() => setTestcaseFile(null)}
            setFile={(file: File) => setTestcaseFile(file)}
          />
          <FlexBox justifyContent="space-between" flexDirection="row">
            <Button $variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit">제출</Button>
          </FlexBox>
        </>
      )}
    </form>
  );
}

export default ProblemForm;
