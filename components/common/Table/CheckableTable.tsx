import { SetStateAction, useMemo, useState } from "react";
import Button from "../Button";
import Table, { TableProps } from "./Table";

interface CheckableTableProps extends TableProps {
  handleCheckedDataBtnClick: (value: unknown) => void;
  checkedDataBtnText: string;
}

export default function CheckableTable({
  header,
  body,
  checkedDataBtnText,
  handleCheckedDataBtnClick,
  ...rest
}: CheckableTableProps) {
  const [checkedValue, setCheckedValue] = useState<Set<number>>(new Set());
  const allIds = useMemo(() => body.map((data) => data.id), [body]);

  const removeCheckedValue: (id: number) => SetStateAction<Set<number>> =
    (id) => (prev) => {
      const newValue = new Set(prev);
      newValue.delete(id);
      return newValue;
    };

  const addCheckedValue: (id: number) => SetStateAction<Set<number>> =
    (id) => (prev: Set<number>) => {
      const newValue = new Set(prev);
      newValue.add(id);
      return newValue;
    };

  const toggleAllChecked = () => {
    if (checkedValue.size === 0) setCheckedValue(new Set(allIds));
    else setCheckedValue(new Set());
  };

  const handleChangeChecked = (id: number) => {
    if (checkedValue.has(id)) setCheckedValue(removeCheckedValue(id));
    else setCheckedValue(addCheckedValue(id));
  };

  const checkableHeader = [
    {
      field: "checkbox",
      header: (
        <input
          type="checkbox"
          checked={checkedValue.size === body.length}
          onChange={toggleAllChecked}
        />
      ),
    },
    ...header,
  ]; //props로 받은 header에 checkbox input을 넣어서 Table 컴포넌트에 넘겨줌

  const checkableBody = body.map((data) => {
    return {
      checkbox: (
        <input
          type="checkbox"
          checked={checkedValue.has(data.id)}
          onChange={() => handleChangeChecked(data.id)}
        />
      ),
      ...data,
    };
  }); //props로 받은 body에 checkbox input을 넣어서 Table 컴포넌트에 넘겨줌

  // checkbox의 상태 관리는 이 컴포넌트에서 이루어지고, Table 컴포넌트에서는 그냥 props받아서 화면에 그려주기만 하는 역할
  return (
    <>
      <Table body={checkableBody} header={checkableHeader} {...rest} />
      <Button
        onClick={() => {
          handleCheckedDataBtnClick(checkedValue);
          setCheckedValue(new Set());
        }}
      >
        선택한 {checkedValue.size}개를 {checkedDataBtnText}
      </Button>
    </>
  );
}
