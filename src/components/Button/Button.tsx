import React from "react";

const Button = ({ onClick, active, ref, children }) => {
  return (
    <button onClick={onClick} ref={ref} color={active ? "hotpink" : "blue"}>
      {children}
    </button>
  );
};

export default Button;
