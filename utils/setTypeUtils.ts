export const toggleSetItem = <T extends {}>(set: Set<T>, item: T) => {
  const copy = new Set(set);
  if (copy.has(item)) copy.delete(item);
  else copy.add(item);
  return copy;
};
