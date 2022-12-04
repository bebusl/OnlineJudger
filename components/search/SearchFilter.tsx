import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { C, CPP, JAVA, PYTHON2, PYTHON3 } from "../../constants/language";
import { FlexBox } from "../common";
import SearchBar from "../common/SearchBar";
import Selector from "../common/Selector";

const static_tags = [
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
  "그래프 탐색(DFS/BFS)",
  "집합과 맵",
  "우선순위 큐",
  "분할 정복",
  "좌표 압축",
  "백트래킹",
  "트리",
  "최단거리알고리즘(데이크스트라등)",
  "분리집합",
  "누적합",
  "배낭문제",
  "위상정렬",
  "최소스패닝트리",
  "비트마스킹",
  "LIS",
  "LCS",
];

function SearchFilter() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(new Set());
  const [selectedTag, setSelectedTag] = useState(new Set());

  useEffect(() => {
    const queries = router.query;
    const { languages, tags } = queries;
    if (languages) {
      const newQuery = new Set(
        Array.isArray(languages) ? languages : [languages]
      );
      setSelectedLanguage(newQuery);
    }
    if (tags) {
      const newQuery = new Set(Array.isArray(tags) ? tags : [tags]);
      setSelectedTag(newQuery);
    }
  }, []);

  const handleTitleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const titleInputElement = target["title"] as unknown as HTMLInputElement;
    const value = titleInputElement.value;
    const { title, ...restQueries } = router.query;
    if (value)
      router.push({
        pathname: router.pathname,
        query: Object.assign(restQueries, { title: titleInputElement.value }),
      });
    else router.push({ pathname: router.pathname, query: restQueries });
  };

  const handleLanguageOptionChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const newQuery = new Set(selectedLanguage);
    if (selectedLanguage.has(e.target.value)) newQuery.delete(e.target.value);
    else newQuery.add(e.target.value);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        languages: Array.from(newQuery) as string[],
      },
    });
  };

  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newQuery = new Set(selectedTag);
    if (selectedTag.has(e.target.value)) newQuery.delete(e.target.value);
    else newQuery.add(e.target.value);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        tags: Array.from(newQuery) as string[],
      },
    });
  };

  return (
    <>
      <FlexBox
        flexDirection="row"
        justifyContent="start"
        gap="1rem"
        style={{ width: "100%", flexWrap: "wrap" }}
      >
        <SearchBar onSubmit={handleTitleSubmit} />
        <Selector
          options={[
            {
              text: C,
              checked: selectedLanguage.has(C),
            },
            { text: CPP, checked: selectedLanguage.has(CPP) },
            { text: JAVA, checked: selectedLanguage.has(JAVA) },
            {
              text: PYTHON2,
              checked: selectedLanguage.has(PYTHON2),
            },
            {
              text: PYTHON3,
              checked: selectedLanguage.has(PYTHON3),
            },
          ]}
          onChange={handleLanguageOptionChange}
          groupName="채점가능언어"
        />
        <Selector
          options={static_tags.map((tag) => ({
            text: tag,
            checked: selectedTag.has(tag),
          }))}
          onChange={handleTagChange}
          groupName="태그"
        />
      </FlexBox>
      <div style={{ width: "100%", height: "2rem", margin: "1rem" }}>
        {Array.from(selectedLanguage).map((a) => (
          <Tag key={a}>
            {a}
            <button>x</button>
          </Tag>
        ))}
        {Array.from(selectedTag).map((t) => (
          <Tag key={t}>
            {t}
            <button>x</button>
          </Tag>
        ))}
      </div>
    </>
  );
}

export default SearchFilter;

const Tag = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 10px;
  margin-right: 5px;
  background-color: #f6d8d8;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
`;
