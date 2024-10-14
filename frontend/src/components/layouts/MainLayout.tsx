import React from "react";
import { Layout, Col, Row } from "antd";
import NavBar from "../shared/NavBar";
import AppDrawer from "../shared/AppDrawer";
import SideBar from "../shared/SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
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
              <Layout className="p-2 content-layout">{children}</Layout>
            </Layout>
          </Layout>
        </>
      </Col>
    </Row>
  );
};

export default MainLayout;
