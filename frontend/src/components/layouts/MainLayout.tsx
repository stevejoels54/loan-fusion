import React from "react";
import { Layout, Col, Row } from "antd";
import NavBar from "../shared/NavBar";
import AppDrawer from "../shared/AppDrawer";
import SideBar from "../shared/SideBar";
import { useAppStore } from "../../config/stores";
import styled from "styled-components";

interface MainLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout = styled(Layout)`
  margin-left: ${(props) => (props.theme.sideBarCollapsed ? "80px" : "200px")};
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  const appStore = useAppStore();

  return (
    <Row
      style={{
        minHeight: "100vh",
      }}
      className="bg-light p-0"
    >
      <Col span={24} className="p-0 m-0">
        <>
          <NavBar />
          <AppDrawer />
          <Layout
            style={{
              height: "95.5vh",
              overflowY: "scroll",
            }}
          >
            <Layout
              style={{
                height: "70.5vh",
              }}
            >
              <SideBar />
              <ResponsiveLayout
                className="p-2"
                theme={{ sideBarCollapsed: appStore.sideBarCollapsed }}
              >
                {children}
              </ResponsiveLayout>
            </Layout>
          </Layout>
        </>
      </Col>
    </Row>
  );
};

export default MainLayout;
