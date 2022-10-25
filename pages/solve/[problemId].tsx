import React, { ReactElement } from "react";

function SolvePage() {
  return <div>[problemId]</div>;
}

export default SolvePage;

SolvePage.defaultProps = {
  authRequired: true,
};

SolvePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <p>방탄소년단 이진희입니다~</p>
      {page}
    </div>
  );
};
