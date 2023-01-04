import React, { ChangeEventHandler, DragEventHandler } from "react";
import styled from "styled-components";
import Button from "../Buttons/BasicButton/Button";
import FlexBox from "../FlexBox";

interface Props {
  file: File | null;
  setFile: Function;
  cancleFile: Function;
}

export default function DropZone({ file, setFile, cancleFile }: Props) {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    if (target && target.files?.length === 1) setFile(target.files[0]);
  };

  const handleDropFile: DragEventHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items.length === 1) {
      const file = e.dataTransfer.items[0].getAsFile();
      if (file) setFile(file);
    }
  };

  if (file)
    return (
      <DropBox>
        <p>
          <b>
            {file.name}({file.size})(byte)
          </b>
          <Button onClick={() => cancleFile()} $variant="outline">
            취소하기
          </Button>
        </p>
      </DropBox>
    );

  return (
    <DropBox>
      <FlexBox onDrop={handleDropFile}>
        <input type="file" accept=".zip" onChange={handleFileChange} />
      </FlexBox>
    </DropBox>
  );
}

const DropBox = styled(FlexBox)`
  width: 100%;
  height: 250px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;
