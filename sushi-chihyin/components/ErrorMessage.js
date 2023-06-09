import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="alert alert-danger mt-4" role="alert">
      {error}
    </div>
  );
};

export default ErrorMessage;
