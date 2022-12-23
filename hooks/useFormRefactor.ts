import React, {
  ChangeEventHandler,
  FocusEventHandler,
  RefObject,
  useState,
} from "react";
import type { regexType } from "../utils/validator";
import useDynamicRefs from "./useDynamicRefs";

interface RegisterOptions {
  required: boolean;
  maxLength: number;
  minLength: number;
  max: number;
  min: number;
  validate: (value: string | number) => boolean;
  pattern: RegExp;
  onChange: Function;
  onBlur: Function;
  value: unknown;
}

interface RegisterReturnType<T> {
  onChange: ChangeEventHandler<T>;
  onBlur: FocusEventHandler<T>;
  isValid: boolean;
  name: string;
  ref: RefObject<T>;
}

const useForm = (mode: "onChange" | "onBlur" = "onChange") => {
  const [getRef, setRef, deleteRef] = useDynamicRefs<any>();

  const [isDirtyField, setDirtyField] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState<Record<string, boolean>>({});

  const register = <T = HTMLInputElement>(
    name: string,
    options?: Partial<RegisterOptions>
  ): RegisterReturnType<T> => {
    setRef(name);
    const ref = getRef(name);
    const getCurrentValue = () => ref.current?.value;

    if (!Object.keys(isValid).includes(name)) {
      setIsValid((prev) => Object.assign(prev, { [name]: true }));
      setDirtyField((prev) => Object.assign(prev, { [name]: false }));
    }

    const validator = () => {
      const currentValue = getCurrentValue();
      if (!currentValue.length) return true; //빈칸일때는 밸리데이터 적용X

      let isValid = true;
      if (options) {
        const { required, maxLength, minLength, max, min, validate, pattern } =
          options;

        if (required) isValid = isValid && currentValue.length > 0;
        if (maxLength) isValid = isValid && currentValue.length <= maxLength;
        if (minLength) isValid = isValid && currentValue.length >= minLength;
        if (max && typeof currentValue === "number")
          isValid = isValid && currentValue <= max;
        if (min && typeof currentValue === "number")
          isValid = isValid && currentValue >= min;
        if (validate) isValid = isValid && validate(currentValue);
        if (pattern) isValid = isValid && pattern.test(currentValue);
      }
      return isValid;
    };

    const handleChange = () => {
      const currentValue = getCurrentValue();
      if (mode === "onChange") {
        const updatedIsValid = validator();
        if (updatedIsValid !== isValid[name]) {
          setIsValid({ ...isValid, [name]: updatedIsValid });
        }
      }
      const updatedIsDirtied = "" !== currentValue;
      if (updatedIsDirtied !== isDirtyField[name])
        setDirtyField({ ...isDirtyField, [name]: updatedIsDirtied });

      if (options?.onChange) options.onChange();
    };

    const handleBlur = () => {
      if (mode === "onBlur") {
        const updatedIsValid = validator();
        if (updatedIsValid !== isValid[name]) {
          setIsValid({ ...isValid, [name]: updatedIsValid });
        }
      }
      if (options?.onBlur) options.onBlur();
    };

    return {
      onChange: handleChange,
      onBlur: handleBlur,
      ref,
      name,
      isValid: isValid[name],
    };
  };

  const isValidInputs = () => {
    const allDirtied = Object.values(isDirtyField).every((field) => field);
    const allValid = Object.values(isValid).every((field) => field);

    return allDirtied && allValid;
  };

  const getAllRefs = () => {
    const allRefs = Object.keys(isValid).reduce((accum, current) => {
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

  const unregister = (key: string) => {
    const ref = getRef(key);
    const removeStateUpdater = (prev: Record<string, boolean>) => {
      const { [key]: dummy, ...rest } = prev;
      return Object.assign({}, rest);
    };
    if (ref) {
      deleteRef(key);
      setIsValid(removeStateUpdater);
      setDirtyField(removeStateUpdater);
    }
  };

  const formState = { isValid, isDirtyField };

  return {
    getAllValues,
    register,
    unregister,
    formState,
    isValidInputs,
  };
};

export default useForm;
