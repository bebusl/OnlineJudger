import React, { RefObject, useEffect, useState } from "react";
import validator from "../utils/validator";
import type { regexType } from "../utils/validator";
import useDynamicRefs from "./useDynamicRefs";

interface Props {
  types: regexType[];
}

const useForm = ({ types }: Props) => {
  const [getRef, setRef] = useDynamicRefs<any>();
  types.forEach((type) => setRef(type));

  const initialRecord = (value: boolean) =>
    types.reduce((accum, current) => {
      return { ...accum, [current]: value };
    }, {} as Record<regexType, boolean>);

  const [isDirtyField, setDirtyField] = useState(initialRecord(false));
  const [isValid, setIsValid] = useState(initialRecord(true));

  const isValidInputs = () => {
    const allDirty = Object.values(isDirtyField).every((field) => field);
    const allValid = Object.values(isValid).every((field) => field);
    return allDirty && allValid;
  };

  const handleBlur = (type: regexType, validate?: boolean) => {
    const currentRef = getRef(type);
    const isDirtied = "" !== currentRef.current?.value;
    if (currentRef) {
      const updatedValidate = validate
        ? validator(type, currentRef.current?.value as string)
        : true;

      if (updatedValidate !== isValid[type]) {
        setIsValid({ ...isValid, [type]: updatedValidate });
      }
      if (isDirtied !== isDirtyField[type]) {
        setDirtyField({
          ...isDirtyField,
          [type]: "" !== currentRef.current?.value,
        });
      }
    }
    // 이전 스테이트와 다를때만 업데이트되도록 수정
  }; // 더 좋은 이름이 있을 것 같은딩.

  const getAllRefs = () => {
    const allRefs = types.reduce((accum, current) => {
      const currentRef = getRef(current);
      return { ...accum, [current]: currentRef };
    }, {} as Record<regexType, RefObject<HTMLInputElement | HTMLTextAreaElement>>);
    return allRefs;
  };

  const getAllValues = () => {
    const allRefs = getAllRefs();
    const allValues = {} as Record<string, unknown>;
    for (let refKey in allRefs) {
      const currentRef = allRefs[refKey];
      allValues[refKey] = currentRef.current?.value;
    }
    return allValues;
  };

  return {
    handleBlur,
    isValidInputs,
    isValid,
    getRef,
    getAllRefs,
    getAllValues,
  };
};

export default useForm;
