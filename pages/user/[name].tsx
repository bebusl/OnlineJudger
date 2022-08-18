import React from "react";

function Detail({ query }: { query: string }) {
  return <div>query: {query}</div>;
}
export const getServerSideProps = ({ query }: { query: { name: string } }) => {
  return { props: { query: query.name } };
};
// 마이페이지 만들어서 뿌려줘야 하겠군.
export default Detail;
