export const TAGS = [
  "입출력",
  "사칙연산",
  "조건문",
  "반복문",
  "함수",
  "배열",
  "문자열",
  "브루트포스",
  "이분 탐색",
  "에라토스테네스의 체",
  "스택",
  "큐",
  "덱",
  "정렬",
  "해싱",
  "다이나믹 프로그래밍",
  "DFS",
  "BFS",
  "그래프 탐색",
  "집합과 맵",
  "우선순위 큐",
  "분할 정복",
  "좌표 압축",
  "백트래킹",
  "트리",
  "최단거리알고리즘",
  "분리집합",
  "누적합",
  "배낭문제",
  "위상정렬",
  "최소스패닝트리",
  "비트마스킹",
  "LIS",
  "LCS",
];

export const tagMapper = TAGS.reduce<Record<number, string>>(
  (accum, cur, idx) => {
    accum[idx + 1] = cur;
    return accum;
  },
  {}
);

export type TagsType = typeof TAGS;
