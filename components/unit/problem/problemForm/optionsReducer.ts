import { useReducer, ChangeEvent, useMemo } from "react";
import {
  LANGUAGES,
  LANGUAGES_TYPE,
} from "../../../../utils/constants/language";
import { TAGS, TagsType } from "../../../../utils/constants/tag";

interface State {
  level: number;
  tags: Set<string>;
  languages: Set<string>;
}

export const ACTIONS = {
  UPDATE_LEVEL: "UPDATE_LEVEL",
  ADD_TAG: "ADD_TAG",
  REMOVE_TAG: "REMOVE_TAG",
  ADD_LANGUAGE: "ADD_LANGUAGE",
  REMOVE_LANGUAGE: "REMOVE_LANGUAGE",
};

export const UPDATE_LEVEL = (level: number) => ({
  type: ACTIONS.UPDATE_LEVEL,
  payload: level,
});

export const ADD_TAG = (tag: string) => ({
  type: ACTIONS.ADD_TAG,
  payload: tag,
});

export const REMOVE_TAG = (tag: string) => ({
  type: ACTIONS.REMOVE_TAG,
  payload: tag,
});

export const ADD_LANGUAGE = (language: string) => ({
  type: ACTIONS.ADD_LANGUAGE,
  payload: language,
});

export const REMOVE_LANGUAGE = (language: string) => ({
  type: ACTIONS.REMOVE_LANGUAGE,
  payload: language,
});

function reducer(
  state: State,
  action: { type: string; payload: number | string }
): State {
  const copyOfTags = new Set(state.tags);
  const copyOfLanguages = new Set(state.languages);

  switch (action.type) {
    case ACTIONS.UPDATE_LEVEL:
      return { ...state, level: action.payload as number };
    case ACTIONS.ADD_TAG:
      copyOfTags.add(action.payload as string);
      return { ...state, tags: copyOfTags };
    case ACTIONS.REMOVE_TAG:
      copyOfTags.delete(action.payload as string);
      return { ...state, tags: copyOfTags };
    case ACTIONS.ADD_LANGUAGE:
      copyOfLanguages.add(action.payload as string);
      return { ...state, languages: copyOfLanguages };
    case ACTIONS.REMOVE_LANGUAGE:
      copyOfLanguages.delete(action.payload as string);
      return { ...state, languages: copyOfLanguages };
    default:
      return state;
  }
}

const useOptionsReducer = (
  level = 1,
  languages: LANGUAGES_TYPE[] = [],
  tags: { id: number; name: TagsType }[] = []
) => {
  const [options, dispatch] = useReducer(reducer, {
    level,
    languages: new Set<string>(languages),
    tags: new Set<string>(tags.map((tag) => tag.name)),
  });

  const updateLevel = (e: ChangeEvent<HTMLInputElement>) => {
    const level = +e.target.value;
    dispatch(UPDATE_LEVEL(level));
  };
  const updateTags = (e: ChangeEvent<HTMLInputElement>) => {
    const tag = e.target.value;
    if (options.tags.has(tag)) dispatch(REMOVE_TAG(tag));
    else dispatch(ADD_TAG(tag));
  };
  const updateLanguages = (e: ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    if (options.languages.has(language)) dispatch(REMOVE_LANGUAGE(language));
    else dispatch(ADD_LANGUAGE(language));
  };
  const formattedOptions = {
    level: options.level,
    tags: Array.from(options.tags),
    languages: Array.from(options.languages),
  };

  const tagOptions = useMemo(
    () =>
      TAGS.map((tag) => ({
        text: tag,
        checked: options.tags.has(tag),
      })),
    [options.tags]
  );

  const languageOptions = useMemo(
    () =>
      LANGUAGES.map((language) => ({
        text: language,
        checked: options.languages.has(language),
      })),
    [options.languages]
  );

  const levelOptions = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((level) => ({
        text: "Lv." + level,
        defaultValue: level,
        checked: options.level === level,
      })),
    [options.level]
  );

  return {
    updateLevel,
    updateTags,
    updateLanguages,
    formattedOptions,
    tagOptions,
    languageOptions,
    levelOptions,
  };
};

export default useOptionsReducer;
