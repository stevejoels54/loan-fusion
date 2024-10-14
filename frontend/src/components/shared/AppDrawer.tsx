import { Drawer } from "antd";
import AppMenu from "./AppMenu";
import { useAppStore } from "../../config/stores";

const AppDrawer = () => {
  const appStore = useAppStore();

  const closeDrawer = () => {
    appStore.setDrawerOpen(false);
  };

  return (
    <Drawer
      width={280}
      placement="left"
      title="LOAN FUSION"
      onClose={closeDrawer}
      open={appStore.drawerOpen}
    >
      <AppMenu />
    </Drawer>
  );
};

export default AppDrawer;
