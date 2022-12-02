import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import {
  C,
  CPP,
  JAVA,
  LANGUAGES,
  PYTHON2,
  PYTHON3,
} from "../../constants/language";
import { FlexBox } from "../common";
import SearchBar from "../common/SearchBar";
import Selector from "../common/Selector";

function SearchFilter() {
  const router = useRouter();
  const [selected, setSelected] = useState({
    C: false,
    CPP: false,
    JAVA: false,
    PYTHON2: false,
    PYTHON3: false,
  });

  useEffect(() => {
    const queries = router.query;
    const { languages } = queries;
    setSelected((prev) => {
      return { ...prev, [languages as LANGUAGES]: true };
    });
  }, []);

  const handleTitleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const titleInputElement = target["title"] as unknown as HTMLInputElement;
    const value = titleInputElement.value;
    if (value)
      router.push({
        pathname: router.pathname,
        query: { ...router.query, title: titleInputElement.value },
      });
  };

  const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    if (checked) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, languages: e.target.value },
      });
    } else {
      const { languages, ...rest } = router.query;
      router.push({
        pathname: router.pathname,
        query: rest,
      });
    }
  };

  return (
    <FlexBox
      justifyContent="start"
      alignItems="start"
      gap="1rem"
      style={{ width: "100%" }}
    >
      <SearchBar onSubmit={handleTitleSubmit} />
      <Selector
        options={[
          {
            text: C,
            checked: selected.C,
          },
          { text: CPP, checked: selected.CPP },
          { text: JAVA, checked: selected.JAVA },
          {
            text: PYTHON2,
            checked: selected.PYTHON2,
          },
          {
            text: PYTHON3,
            checked: selected.PYTHON3,
          },
        ]}
        onChange={handleOptionChange}
        groupName="채점가능언어"
      />
    </FlexBox>
  );
}

export default SearchFilter;
