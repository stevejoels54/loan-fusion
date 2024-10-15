import { Layout } from "antd";
import AppMenu from "./AppMenu";
import { useAppStore } from "../../config/stores";

const { Sider } = Layout;

const SideBar = () => {
  const appStore = useAppStore();

  return (
    <div>
      <Sider
        collapsible
        collapsed={appStore.sideBarCollapsed}
        onCollapse={(collapsed) => appStore.setSideBarCollapsed(collapsed)}
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
