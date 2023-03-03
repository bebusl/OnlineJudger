import React from "react";

const map = new Map<string, React.RefObject<unknown>>();

function setRef<T>(key: string): void {
  const ref = React.createRef<T>();
  map.set(key, ref);
}

function getRef<T>(key: string): React.RefObject<T> {
  return map.get(key) as React.RefObject<T>;
}

function deleteRef<T>(key: string): void {
  map.delete(key);
}

function useDynamicRefs<T>(): [
  (key: string) => React.RefObject<T>,
  (key: string) => void,
  (key: string) => void
] {
  return [getRef<T>, setRef<T>, deleteRef<T>];
}

export default useDynamicRefs;

/**
 * 해당 코드의 원본은 https://github.com/fitzmode/use-dynamic-refs 입니다.
 * 원본 코드에 deleteRef를 추가하였습니다.
 */
