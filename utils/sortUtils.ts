export const sortObjectListAscByField = (field: string) => (prev, next) => {
  if (prev[field] === next[field]) return 0;
  return prev[field] > next[field] ? 1 : -1;
};

export const sortObjectListDescByField = (field: string) => (prev, next) => {
  if (prev[field] === next[field]) return 0;
  return prev[field] < next[field] ? 1 : -1;
};
