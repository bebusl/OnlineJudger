import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useRef } from "react";
import styled from "styled-components";
import { C, CPP, JAVA, PYTHON2, PYTHON3 } from "../../constants/language";
import { TAGS } from "../../constants/tag";
import { toggleSetItem } from "../../utils/setTypeUtils";
import { FlexBox } from "../common";
import SearchBar from "../common/SearchBar";
import Selector from "../common/Selector";

function SearchFilter() {
  const router = useRouter();

  function makeQuerySet(queries: string | string[] | undefined): Set<string> {
    let newQuerySet = new Set<string>();
    if (queries) {
      newQuerySet = Array.isArray(queries)
        ? new Set(queries)
        : new Set([queries]);
    }
    return newQuerySet;
  }

  const { languages, tags } = router.query;
  const languagesQuery = makeQuerySet(languages);
  const tagsQuery = makeQuerySet(tags);

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
    const newTagsQuery = toggleSetItem<string>(tagsQuery, value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tags: Array.from(newTagsQuery) },
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
          options={TAGS.map((tag) => ({
            text: tag,
            checked: tagsQuery.has(tag),
          }))}
          onChange={handleTagChange}
          groupName="태그"
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
            {t}
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
        {!!(tagsQuery.size || languagesQuery.size) && (
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
