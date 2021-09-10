import Navbar from "./navbar";
import React from "react";

export default function SimpleLayout(props) {
  return (
    <>
      <Navbar pathName={props.pathName} />
      <div>{props.children}</div>
    </>
  );
}
