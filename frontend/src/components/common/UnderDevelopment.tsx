import { Result } from "antd";
import { FcSupport } from "react-icons/fc";

const UnderDevelopment = () => {
  return (
    <Result
      title="Under Development"
      subTitle="This Feature is under development. You will be notified when it is ready."
      icon={<FcSupport size={200} />}
    />
  );
};

export default UnderDevelopment;
