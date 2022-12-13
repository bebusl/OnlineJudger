import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useRef } from "react";
import styled from "styled-components";
import { C, CPP, JAVA, PYTHON2, PYTHON3 } from "../../constants/language";
import { tagMapper, TAGS } from "../../constants/tag";
import { toggleSetItem } from "../../utils/setTypeUtils";
import { FlexBox } from "../common";
import SearchBar from "../common/SearchBar";
import Selector from "../common/Selector";

function generateQuerySet(queries: string | string[] | undefined): Set<string> {
  let newQuerySet = new Set<string>();
  if (queries) {
    newQuerySet = Array.isArray(queries)
      ? new Set(queries)
      : new Set([queries]);
  }
  return newQuerySet;
}

function SearchFilter() {
  const router = useRouter();

  const { languages, tags, levels } = router.query;
  const languagesQuery = generateQuerySet(languages);
  const tagsQuery = generateQuerySet(tags);
  const lvQuery = generateQuerySet(levels);

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
    const value = e.target.value as string;
    const newLanguageQuery = toggleSetItem<string>(languagesQuery, value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, languages: Array.from(newLanguageQuery) },
    });
  };

  const handleTagChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    console.log(value);
    const newTagsQuery = toggleSetItem<string>(tagsQuery, value);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        tags: Array.from(newTagsQuery),
      },
    });
  };

  const handleLevelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const newLvQuery = toggleSetItem<string>(lvQuery, value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, levels: Array.from(newLvQuery) },
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
              checked: languagesQuery.has(C),
            },
            { text: CPP, checked: languagesQuery.has(CPP) },
            { text: JAVA, checked: languagesQuery.has(JAVA) },
            {
              text: PYTHON2,
              checked: languagesQuery.has(PYTHON2),
            },
            {
              text: PYTHON3,
              checked: languagesQuery.has(PYTHON3),
            },
          ]}
          onChange={handleLanguageOptionChange}
          groupName="채점가능언어"
        />
        <Selector
          options={TAGS.map((tag, idx) => ({
            text: tag,
            checked: tagsQuery.has(Number(idx + 1).toString()),
            defaultValue: idx + 1,
          }))}
          onChange={handleTagChange}
          groupName="태그"
        />
        <Selector
          options={[1, 2, 3, 4, 5].map((lv) => ({
            text: lv,
            checked: lvQuery.has(lv.toString()),
            defaultValue: lv.toString(),
          }))}
          onChange={handleLevelChange}
          groupName="레벨"
        />
      </FlexBox>
      <div style={{ minWidth: "2rem" }}>
        {Array.from(languagesQuery).map((a) => (
          <Tag key={a}>
            {a}
            <button
              onClick={() => {
                languagesQuery.delete(a);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    languages: Array.from(languagesQuery),
                  },
                });
              }}
            >
              x
            </button>
          </Tag>
        ))}
        {Array.from(tagsQuery).map((t) => (
          <Tag key={t}>
            {tagMapper[t]}
            <button
              onClick={() => {
                tagsQuery.delete(t);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    tags: Array.from(tagsQuery),
                  },
                });
              }}
            >
              x
            </button>
          </Tag>
        ))}
        {Array.from(lvQuery).map((lv) => (
          <Tag key={"lv." + lv}>
            Lv.{lv}{" "}
            <button
              onClick={() => {
                lvQuery.delete(lv);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    levels: Array.from(lvQuery),
                  },
                });
              }}
            >
              x
            </button>
          </Tag>
        ))}
        {!!(tagsQuery.size || languagesQuery.size || lvQuery.size) && (
          <Tag
            as="button"
            onClick={() => {
              router.push({ pathname: router.pathname });
            }}
          >
            초기화
          </Tag>
        )}
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
  & > button {
    border: none;
    background: none;
    box-shadow: none;
  }
`;
