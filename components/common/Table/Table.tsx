import React, { useState } from "react";
import styled from "styled-components";
import {
  sortObjectListAscByField,
  sortObjectListDescByField,
} from "../../../utils/sortUtils";

/** 테이블 한 row의 타입 지정=>T */
export interface TableProps<T = any> {
  header: {
    field: string;
    header: string | JSX.Element;
    width?: number;
    sortable?: boolean;
  }[];
  body: { [key: string]: T }[];
  rowHeight?: string;
  maxWidth?: string;
}

export default function Table({
  header,
  body,
  rowHeight,
  maxWidth,
}: TableProps) {
  const dataFields: string[] = header.map((content) => content.field);
  const [sort, setSort] = useState({ field: "id", asc: false });

  return (
    <TableStyle $rowHeight={rowHeight} $maxWidth={maxWidth}>
      <THead>
        <tr>
          {header.map((content) =>
            content.sortable ? (
              <th
                key={content.field}
                style={{
                  width: content.width ? `${content.width}px` : "auto",
                  textOverflow: "ellipsis",
                }}
                onClick={() => {
                  setSort({ field: content.field, asc: !sort.asc });
                }}
              >
                {content.header}
              </th>
            ) : (
              <th
                key={content.field}
                style={{
                  width: content.width ? `${content.width}px` : "auto",
                }}
              >
                {content.header}
              </th>
            )
          )}
        </tr>
      </THead>
      <tbody>
        {body
          .sort(
            sort.asc
              ? sortObjectListAscByField(sort.field)
              : sortObjectListDescByField(sort.field)
          )
          .map((data, idx) => {
            return (
              <tr key={idx}>
                {dataFields.map((field) => (
                  <td key={field}>
                    <div
                      style={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {data[field]}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table<{ $rowHeight?: string; $maxWidth?: string }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "800px"};
  table-layout: auto;
  border-spacing: 0;
  tbody {
    overflow: scroll;
  }

  th {
    white-space: nowrap;
  }
  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray150};
    padding: 0 20px;
  }
  td {
    height: ${({ $rowHeight }) => $rowHeight || "3rem"};
    white-space: pre;
  }

  color: ${({ theme }) => theme.colors.gray600};
`;

const THead = styled.thead`
  position: sticky;
  background-color: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray600};
  top: 0;
  left: 0;
  height: 3rem;
`;
