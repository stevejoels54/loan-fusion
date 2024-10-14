import { LoadingOutlined } from "@ant-design/icons";
import propTypes from "prop-types";
import { Spin } from "antd";

const PageLoader = ({ message = "Please wait..." }) => {
  return (
    <div className="vh-100 text-center bg-light d-flex flex-column justify-content-center align-items-center m-0 p-4">
      <div className="align-middle my-auto mx-auto">
        <h5 className="text-danger">LOAN FUSION</h5>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
        <div className=" text-uppercase text-sm text-secondary mt-3">
          {message}
        </div>
      </div>
    </div>
  );
};

PageLoader.propTypes = {
  message: propTypes.string,
};

export default PageLoader;
