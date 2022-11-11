import React from "react";
import styled from "styled-components";

interface TableProps {
  header: (string | JSX.Element)[];
  body: (number | string | JSX.Element)[][];
}

function Table({ header, body }: TableProps) {
  return (
    <TableStyle>
      <THead>
        <tr>
          {header.map((head, idx) => (
            <th key={`head${idx}`}>{head}</th>
          ))}
        </tr>
      </THead>
      <tbody>
        {body.map((data, idx) => (
          <tr key={idx}>
            {data.map((d, didx) => (
              <td key={`h-${didx}`}>{d}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}

export default Table;

const TableStyle = styled.table`
  border: 1px solid black;
  width: 100%;
  table-layout: auto;
  & tbody {
    height: 150px;
    overflow: scroll;
  }
`;

const THead = styled.thead`
  position: sticky;
  background-color: gray;
  color: white;
  top: 0;
  left: 0;
`;
