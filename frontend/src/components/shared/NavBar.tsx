import { Avatar, Col, Flex, Popover, Row, Button } from "antd";
import { AiOutlineDown, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { useAppStore } from "../../config/stores";

const NavBar = () => {
  const appStore = useAppStore();

  const openDrawer = () => {
    appStore.setDrawerOpen(true);
  };

  return (
    <div
      style={{
        height: 45,
        // backgroundColor: "#001529",
      }}
      className="bg-dark"
    >
      <Row>
        <Col span={12}>
          <Flex
            style={{
              height: 45,
            }}
            align="center"
            justify="start"
            className="px-2 w-100"
            gap={8}
          >
            <Button
              type="link"
              className="d-md-none"
              onClick={openDrawer}
              icon={<AiOutlineMenu />}
            ></Button>
            <p className="text-white text-md mb-0 text-uppercase fw-bold d-none d-md-block">
              LOAN FUSION
            </p>
            <p className="text-white fw-bold mb-0 text-uppercase fw-bold d-md-none">
              LOAN FUSION
            </p>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex
            style={{
              height: 45,
            }}
            align="center"
            justify="end"
            className="px-2"
            gap={10}
          >
            <Popover
              content={
                <div>
                  <p className="mb-0">Profile</p>
                  <p className="mb-0">Logout</p>
                </div>
              }
              placement="bottomRight"
              trigger="click"
            >
              <Avatar size="default" icon={<AiOutlineUser />} />
              <AiOutlineDown className="text-dark" />
            </Popover>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
