import React from "react";

const FlashMessage = ({ message }) => {
  return (
    <div className="alert alert-success mt-4" role="alert">
      {message}
    </div>
  );
};

export default FlashMessage;
