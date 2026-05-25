import { Component, ReactNode } from 'react'

import { Tooltip } from "@mui/material";

const withInput = (component:Component, state:boolean) => {
  if (!state) {
    return (
      <Tooltip
        title={
          <div style={{ fontFamily: "vazir" }}>La clase aún no ha comenzado</div>
        }
      >
        {component}
      </Tooltip>
    );
  } else {
    return component;
  }
};

export default withInput;
