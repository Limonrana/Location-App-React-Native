import React from "react";

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  return navigationRef.current && navigationRef.current.navigate(name, params);
};
