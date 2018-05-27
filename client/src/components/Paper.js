import React from "react";
import MUIPaper from "@material-ui/core/Paper";
import styled from "styled-components";

const PaperContent = styled.div`
  padding: ${props => (props.withSpacing ? "20px" : "inherit")};
`;

const PaperHeader = styled.div`
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  border-bottom: 1px solid lightgray;
`;

function Paper({ children, withSpacing, title }) {
  return (
    <MUIPaper>
      {title && <PaperHeader>{title}</PaperHeader>}
      <PaperContent withSpacing={withSpacing}>{children}</PaperContent>
    </MUIPaper>
  );
}

export default Paper;
