import { Box } from "@mui/material";
import React, { ReactNode, isValidElement, Children, cloneElement } from "react";

interface ReadOnlyComponentProps {
  children: ReactNode;
  makeReadOnly: boolean;
}

const ReadOnlyOverlay = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white overlay
      pointerEvents: "all",
      zIndex: 9999,
    }}
  />
);

const ReadOnlyComponent: React.FC<ReadOnlyComponentProps> = ({ children, makeReadOnly }) => {
  return (
    <Box style={{ position: "relative" }}>
      {makeReadOnly && <ReadOnlyOverlay />}
      {children}
    </Box>
  );
};

export default ReadOnlyComponent;
