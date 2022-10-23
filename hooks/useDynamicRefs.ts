import React from "react";

const map = new Map<string, React.RefObject<unknown>>();

function setRef<T>(key: string): void {
  const ref = React.createRef<T>();
  map.set(key, ref);
}

function getRef<T>(key: string): React.RefObject<T> {
  return map.get(key) as React.RefObject<T>;
}

function useDynamicRefs<T>(): [
  (key: string) => React.RefObject<T>,
  (key: string) => void
] {
  return [getRef, setRef];
}

export default useDynamicRefs;
