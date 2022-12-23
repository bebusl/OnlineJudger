import React from "react";
import Table from "../common/Table/Table";

interface SubmissionViewProps {
  submitInfo: object[];
  code: string;
}

function SubmissionView({ submitInfo, code }: SubmissionViewProps) {
  return (
    <>
      <Table
        rowHeight="1.5rem"
        header={[
          { field: "id", header: "제출번호" },
          { field: "status", header: "결과" },
          { field: "code_length", header: "코드길이" },
          { field: "created_at", header: "제출시간" },
        ]}
        body={submitInfo}
      />
      <div style={{ border: "1px solid #ededed", padding: "1rem" }}>
        <code style={{ fontSize: "0.7rem" }}>
          <pre>{code}</pre>
        </code>
      </div>
    </>
  );
}

export default SubmissionView;
