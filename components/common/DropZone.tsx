import React from "react";
import styled from "styled-components";
import Button from "./Buttons/BasicButton/Button";
import FlexBox from "./FlexBox";

interface Props {
  file: File | null;
  setFile: Function;
  cancleFile: Function;
}

export default function DropZone({ file, setFile, cancleFile }: Props) {
  return (
    <DropBox>
      {file ? (
        <p>
          <b>
            {file.name}({file.size})
          </b>
          <Button
            onClick={(e) => {
              e.preventDefault();
              cancleFile();
            }}
            $variant="outline"
            style={{ width: "fit-content" }}
          >
            취소하기
          </Button>
        </p>
      ) : (
        <FlexBox
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.items.length === 1) {
              const file = e.dataTransfer.items[0].getAsFile();
              if (file) setFile(file);
            }
          }}
        >
          <input
            type="file"
            accept=".zip"
            onChange={(e) => {
              const target = e.target;
              if (target && target.files?.length === 1) {
                setFile(target.files[0]);
              }
            }}
          />
        </FlexBox>
      )}
    </DropBox>
  );
}

const DropBox = styled(FlexBox)`
  width: 100%;
  height: 250px;
  background-color: #ffffff;
  border: 1px solid #ededed;
`;
