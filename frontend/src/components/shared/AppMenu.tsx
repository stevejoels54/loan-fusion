import { Menu } from "antd";
import { FcMoneyTransfer, FcBarChart, FcSettings } from "react-icons/fc";
import { useAppStore } from "../../config/stores";
import type { MenuProps } from "antd";

const AppMenu = () => {
  const appStore = useAppStore();

  const { activeApplication } = appStore;

  // menu items with icons and labels for the sidebar, Loans, Reports, Settings
  const menuItems = [
    {
      key: "loans",
      icon: <FcMoneyTransfer />,
      label: "Loans",
    },
    {
      key: "reports",
      icon: <FcBarChart />,
      label: "Reports",
    },
    {
      key: "settings",
      icon: <FcSettings />,
      label: "Settings",
    },
  ];

  const changeMenu: MenuProps["onClick"] = (e) => {
    appStore.setActiveApplication(e.key);
  };

  return (
    <Menu
      mode="vertical"
      onClick={changeMenu}
      style={{
        height: "100%",
        borderRight: 0,
      }}
      activeKey={activeApplication}
      defaultSelectedKeys={[activeApplication]}
      items={menuItems}
    />
  );
};

export default AppMenu;
