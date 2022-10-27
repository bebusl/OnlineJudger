import React, { useState } from "react";
import validator from "../utils/validator";
import type { regexType } from "../utils/validator";
import useDynamicRefs from "./useDynamicRefs";

interface Props {
  types: regexType[];
}

const useForm = ({ types }: Props) => {
  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();
  types.forEach((type) => setRef(type));

  const initialRecord = (value: boolean) =>
    types.reduce((accum, current) => {
      return { ...accum, [current]: value };
    }, {} as Record<regexType, boolean>);

  const [isDirtyField, setDirtyField] = useState(initialRecord(false));
  const [isValid, setIsValid] = useState(initialRecord(true));

  const isValidInputs = () => {
    const a = Object.values(isDirtyField).every((field) => field);
    const b = Object.values(isValid).every((field) => field);
    return a && b;
  };

  const handleBlur = (type: regexType) => {
    const currentRef = getRef(type);
    if (currentRef) {
      setIsValid({
        ...isValid,
        [type]: validator(type, currentRef.current?.value as string),
      });
      setDirtyField({
        ...isDirtyField,
        [type]: "" !== currentRef.current?.value,
      });
    }
  }; // 더 좋은 이름이 있을 것 같은딩.

  return { handleBlur, isValidInputs, isValid, getRef };
};

export default useForm;