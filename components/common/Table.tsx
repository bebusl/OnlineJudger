import React, { useState } from "react";
import styled from "styled-components";

export interface TableProps {
  header: {
    field: string;
    header: string | JSX.Element;
    width?: number;
    sortable?: boolean;
    link?: string;
  }[];
  body: Record<string, number | string | JSX.Element>[];
  rowHeight?: string;
  checkable?: boolean;
  handleCheckedData?: Function;
}

const sortAsc = (field) => (prev, next) => {
  if (prev[field] === next[field]) return 0;
  return prev[field] > next[field] ? 1 : -1;
};

const sortDesc = (field) => (prev, next) => {
  if (prev[field] === next[field]) return 0;
  return prev[field] < next[field] ? 1 : -1;
};

function Table({ header, body, rowHeight, checkable }: TableProps) {
  const dataFields = header.map((content) => content.field);
  const [sort, setSort] = useState({ field: "id", asc: true });

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
            .sort(sort.asc ? sortAsc(sort.field) : sortDesc(sort.field))
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

export default Table;

const TableStyle = styled.table<{ $rowHeight?: string }>`
  width: 100%;
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
    height: ${({ $rowHeight }) => $rowHeight || "150px"};
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
