import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  max-width: 390px;
  width: 100%;
  height: 100svh;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
`;

export default Layout;
