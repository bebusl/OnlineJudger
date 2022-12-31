import React, { MutableRefObject, useRef } from "react";
import dynamic from "next/dynamic";
import { OnMount } from "@monaco-editor/react";

import ProblemDescription from "./ProblemDescription";
import ResultConsole from "./ResultConsole";

import HorizontalResizableBox from "../../../common/ResizableBox/HorizontalResizableBox";
import VerticalResizableBox from "../../../common/ResizableBox/VerticalResizableBox";

const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

function MainSection() {
  const editorRef = useRef<MutableRefObject<null>>(null);

  const RightSide = () => (
    <VerticalResizableBox
      topChild={
        <MonacoEditor
          onMount={(editor): OnMount => {
            editorRef.current = editor;
          }}
          options={{ minimap: { enabled: false } }}
        />
      }
      bottomChild={<ResultConsole />}
    />
  );

  return (
    <main>
      <HorizontalResizableBox
        leftChild={<ProblemDescription />}
        rightChild={<RightSide />}
      />
    </main>
  );
}

export default MainSection;
