import React from "react";
import styled from "styled-components";

export interface TableProps {
  header: {
    field: string;
    header: string | JSX.Element;
    width?: number;
    sortable?: boolean;
  }[];
  body: Record<string, number | string | JSX.Element>[];
  rowHeight?: string;
}

function Table({ header, body, rowHeight }: TableProps) {
  const dataFields = header.map((content) => content.field);

  return (
    <TableStyle $rowHeight={rowHeight}>
      <THead>
        <tr>
          {header.map((content) => (
            <th key={content.field}>{content.header}</th>
          ))}
        </tr>
      </THead>
      <tbody>
        {body.map((data, idx) => (
          <tr key={idx}>
            {dataFields.map((field) => (
              <td key={field}>{data[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStyle>
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
