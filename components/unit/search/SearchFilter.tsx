import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
} from "react";

import { useRouter } from "next/router";

import { LANGUAGES } from "../../../utils/constants/language";
import { tagMapper, TAGS } from "../../../utils/constants/tag";
import { toggleSetItem } from "../../../utils/setTypeUtils";

import * as S from "./SearchFilter.style";
import { FlexBox } from "../../common";
import SearchBar from "../../common/SearchBar";
import Selector from "../../common/Selector/Selector";

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

  const handleQueryChange =
    (querySet: Set<string>, queryKey: string) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newQuery = toggleSetItem<string>(querySet, value);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: 1, [queryKey]: Array.from(newQuery) },
      });
    };

  const handleTagClick =
    (querySet: Set<string>, deleteElement: string, queryKey: string) => () => {
      querySet.delete(deleteElement);
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          [queryKey]: Array.from(querySet),
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
          options={LANGUAGES.map((language) => ({
            text: language,
            checked: languagesQuery.has(language),
          }))}
          onChange={handleQueryChange(languagesQuery, "languages")}
          groupName="채점가능언어"
        />
        <Selector
          options={TAGS.map((tag, idx) => ({
            text: tag,
            checked: tagsQuery.has(Number(idx + 1).toString()),
            defaultValue: idx + 1,
          }))}
          onChange={handleQueryChange(tagsQuery, "tags")}
          groupName="태그"
        />
        <Selector
          options={[1, 2, 3, 4, 5].map((lv) => ({
            text: lv,
            checked: lvQuery.has(lv.toString()),
            defaultValue: lv.toString(),
          }))}
          onChange={handleQueryChange(lvQuery, "levels")}
          groupName="레벨"
        />
      </FlexBox>
      <S.TagContainer>
        {Array.from(languagesQuery).map((language) => (
          <S.Tag key={language} color="language">
            {language}
            <button
              onClick={handleTagClick(languagesQuery, language, "languages")}
            >
              x
            </button>
          </S.Tag>
        ))}
        {Array.from(tagsQuery).map((tag) => (
          <S.Tag key={tag} color="tag">
            {tagMapper[tag]}
            <button onClick={handleTagClick(tagsQuery, tag, "tags")}>x</button>
          </S.Tag>
        ))}
        {Array.from(lvQuery).map((lv) => (
          <S.Tag key={"lv." + lv} color="lv">
            Lv.{lv}
            <button onClick={handleTagClick(lvQuery, lv, "levels")}>x</button>
          </S.Tag>
        ))}

        {!!(tagsQuery.size || languagesQuery.size || lvQuery.size) && (
          <S.Tag
            as="button"
            color="reset"
            onClick={() => {
              router.push({ pathname: router.pathname });
            }}
          >
            초기화
          </S.Tag>
        )}
      </S.TagContainer>
    </>
  );
}

export default SearchFilter;
