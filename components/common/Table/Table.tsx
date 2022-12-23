import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import { sortObjectListAscByField, sortObjectListDescByField } from "../../../utils/sortUtils";

export interface TableProps {
  header: {
    field: string;
    header: string | JSX.Element;
    width?: number;
    sortable?: boolean;
  }[];
  body: object[];
  rowHeight?: string;
}

export default function Table({ header, body, rowHeight }: TableProps) {
  const dataFields: string[] = header.map((content) => content.field);
  const [sort, setSort] = useState({ field: "id", asc: false });

  return (
    <>
      <TableStyle $rowHeight={rowHeight}>
        <THead>
          <tr>
            {header.map((content) =>
              content.sortable ? (
                <th
                  key={content.field}
                  onClick={() => {
                    setSort({ field: content.field, asc: !sort.asc });
                  }}
                >
                  {content.header}
                </th>
              ) : (
                <th key={content.field}>{content.header}</th>
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
                    <td key={field}>{data[field]}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </TableStyle>
    </>
  );
}

const TableStyle = styled.table<{ $rowHeight?: string }>`
  width: 100%;
  max-width: 900px;
  table-layout: auto;
  border-spacing: 0;
  tbody {
    overflow: scroll;
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

  background-color: ${({ theme }) => theme.colors.lightGray};
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
