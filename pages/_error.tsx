import React from "react";
import { NextPageContext } from "next";

interface Props {
  statusCode: number;
}

const Error = ({ statusCode }: Props): JSX.Element => {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
    </p>
  );
};
Error.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode: number | undefined;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  } else {
    statusCode = 404;
  }
  return { statusCode };
};
export default Error;
