import React, { FormEventHandler, useState, useRef } from "react";

import { useRouter } from "next/router";
import useForm from "../../../../hooks/useForm";
import useOptionsReducer from "./optionsReducer";

import { AddProblemRequest } from "../../../../api/scheme/problem";

import { LANGUAGES } from "../../../../utils/constants/language";
import { TAGS } from "../../../../utils/constants/tag";

import { Button, FlexBox } from "../../../common";
import { LabeledTextArea } from "../../../common/TextArea";
import { LabeledInput } from "../../../common/Input";
import Selector from "../../../common/Selector/Selector";
import DropZone from "../../../common/DropZone/DropZone";
import Description from "../../../common/Typhography/Description";
import ConfirmDialog from "../../../common/Dialog/ConfirmDialog";

interface FormProps extends Partial<AddProblemRequest> {
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
  level,
  tags,
  languages,
  handleSubmit,
}: FormProps) {
  const router = useRouter();
  const [exampleIds, setExampleIds] = useState<number[]>(
    Array.from({ length: test_case_examples.length }, (_, idx: number) => idx)
  );
  const {
    options,
    formattedOptions,
    updateLevel,
    updateLanguages,
    updateTags,
  } = useOptionsReducer(level, languages, tags);
  const [testcaseFile, setTestcaseFile] = useState<File | null>(null);
  const { register, getAllValues, isValidInputs } = useForm();
  const {
    register: exampleRegister,
    getAllValues: getAllExamples,
    isValidInputs: isValidExamples,
    unregister,
  } = useForm();
  const [openModal, setOpenModal] = useState(false);

  const exampleId = useRef(test_case_examples.length);

  const tagOptions = TAGS.map((tag) => ({
    text: tag,
    checked: options.tags.has(tag),
  }));

  const languageOptions = LANGUAGES.map((language) => ({
    text: language,
    checked: options.languages.has(language),
  }));

  const levelOptions = [1, 2, 3, 4, 5].map((level) => ({
    text: "Lv." + level,
    defaultValue: level,
    checked: options.level === level,
  }));

  const generateSubmitFormData = () => {
    const refValues = getAllValues();
    const exampleValues = getAllExamples() as Record<string, string>;
    const formattedExamples: { input: string; output: string }[] = [];
    exampleIds.forEach((id) => {
      const input = exampleValues[`input-${id}`];
      const output = exampleValues[`output-${id}`];
      formattedExamples.push({ input, output });
    });

    let allValues = {
      ...refValues,
      ...formattedOptions,
      test_case_examples: formattedExamples,
    };

    const submitFormData = new FormData();
    submitFormData.append("req", JSON.stringify(allValues));
    if (testcaseFile) submitFormData.append("file", testcaseFile);
    return submitFormData;
  };

  const removeExample = (id: number, idx: number) => {
    unregister(`input-${id}`);
    unregister(`output-${id}`);

    setExampleIds((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const handleGeSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const submitData = generateSubmitFormData();
    handleSubmit(submitData);
  };

  /*forwardRef 한단계 더 거쳐야 하는 애들은 여기서 register */
  const { ref: titleRef, ...titleOptions } = register("title");
  const { ref: timeLimitRef, ...timeLimitOptions } = register("time_limit");
  const { ref: memoryLimitRef, ...memoryLimitOptions } =
    register("memory_limit");
  const { ref: descRef, ...descOptions } = register<HTMLTextAreaElement>(
    "desc",
    { minLength: 10 }
  );
  const { ref: inputDescRef, ...inputDescOptions } =
    register<HTMLTextAreaElement>("input_desc");
  const { ref: outputDescRef, ...outputDescOptions } =
    register<HTMLTextAreaElement>("output_desc");

  return (
    <>
      {openModal && (
        <ConfirmDialog
          onClose={() => {
            setOpenModal(false);
          }}
          onConfirm={() => {}}
          message="문제를 수정하시겠습니까?"
        />
      )}
      <form onSubmit={handleGeSubmit} style={{ minWidth: "900px" }}>
        <fieldset disabled={readOnly} style={{ border: "none" }}>
          <LabeledInput
            {...titleOptions}
            forwardedRef={titleRef}
            text="제목"
            defaultValue={title}
          />
          <LabeledInput
            type="number"
            forwardedRef={timeLimitRef}
            text="시간제한"
            description="ms단위로 입력해주세요"
            defaultValue={time_limit}
            {...timeLimitOptions}
          />
          <LabeledInput
            type="number"
            forwardedRef={memoryLimitRef}
            text="메모리제한"
            description="byte단위로 입력해주세요"
            defaultValue={memory_limit}
            {...memoryLimitOptions}
          />
          <FlexBox flexDirection="row">
            <Selector
              groupName="태그"
              options={tagOptions}
              onChange={updateTags}
            />
            <Selector
              groupName="레벨"
              options={levelOptions}
              onChange={updateLevel}
            />
            <Selector
              groupName="언어"
              options={languageOptions}
              onChange={updateLanguages}
            />
          </FlexBox>

          <LabeledTextArea
            text="문제 설명"
            forwardedRef={descRef}
            defaultValue={desc}
            readOnly={readOnly}
            {...descOptions}
          />
          <LabeledTextArea
            text="입력 설명"
            forwardedRef={inputDescRef}
            defaultValue={input_desc}
            {...inputDescOptions}
          />
          <LabeledTextArea
            text="출력 설명"
            forwardedRef={outputDescRef}
            defaultValue={output_desc}
            {...outputDescOptions}
          />

          <h3>예시</h3>
          <hr />
          {/**set ExampleIds할 떄 idRef ++ 해서 사용해야 함. useId는 여기서 사용하기 적합하지 않다고 생각했음. */}
          {exampleIds.map((id, idx) => {
            const { ref: inputRef, ...inputOptions } =
              exampleRegister<HTMLTextAreaElement>(`input-${id}`);
            const { ref: outputRef, ...outputOptions } =
              exampleRegister<HTMLTextAreaElement>(`output-${id}`);
            return (
              <FlexBox key={id} flexDirection="row" alignItems="start">
                <LabeledTextArea
                  text={`입력 설명 ${idx + 1}`}
                  forwardedRef={inputRef}
                  defaultValue={test_case_examples[idx]?.input}
                  {...inputOptions}
                />
                <LabeledTextArea
                  text={`출력 설명 ${idx + 1}`}
                  forwardedRef={outputRef}
                  defaultValue={test_case_examples[idx]?.output}
                  {...outputOptions}
                />
                <button
                  style={{ border: 0, boxShadow: "" }}
                  onClick={() => removeExample(id, idx)}
                >
                  x
                </button>
              </FlexBox>
            );
          })}
          {!readOnly && exampleIds.length < 3 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                const uniqueId = exampleId.current as number;
                exampleId.current = uniqueId + 1;
                console.log(exampleIds);
                setExampleIds((prev) => [...prev, uniqueId]);
              }}
              $variant={"outline"}
            >
              예제 추가하기
            </Button>
          )}
          {!readOnly && (
            <>
              <h4>테스트케이스 파일 업로드</h4>
              <Description>
                [title].in, [title].out 쌍으로 이루어진 zip파일만 정상적으로
                등록 가능합니다.
              </Description>
              <hr />
              <DropZone
                file={testcaseFile}
                cancleFile={() => setTestcaseFile(null)}
                setFile={(file: File) => setTestcaseFile(file)}
              />
              <FlexBox justifyContent="space-between" flexDirection="row">
                <Button
                  $variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  취소
                </Button>
                <Button type="submit">제출</Button>
              </FlexBox>
            </>
          )}
        </fieldset>
      </form>
    </>
  );
}

export default ProblemForm;
