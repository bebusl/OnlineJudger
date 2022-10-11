import React from "react";
import styled from "styled-components";

interface TableProps {
  header: string[];
  body: (number | string)[][];
}

function Table({ header, body }: TableProps) {
  return (
    <Wrapper>
      <TableStyle>
        <THead>
          <tr>
            {header.map((head) => (
              <th key={head}>{head}</th>
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
    </Wrapper>
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

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  height: 500px;
  overflow: scroll;
`;
