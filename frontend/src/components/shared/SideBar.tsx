import { Layout } from "antd";
import AppMenu from "./AppMenu";
import { useState } from "react";

const { Sider } = Layout;

const SideBar = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  return (
    <div>
      <Sider
        collapsible
        collapsed={sideBarCollapsed}
        onCollapse={(collapsed) => setSideBarCollapsed(collapsed)}
        width={200}
        style={{
          position: "absolute",
          height: "100vh",
        }}
        theme="light"
        className="d-none bg-white d-md-block border-end"
      >
        <div className="demo-logo-vertical" />
        <AppMenu />
      </Sider>
    </div>
  );
};

export default SideBar;
