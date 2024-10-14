import React, { ReactNode } from "react";
import { Modal, Divider, ModalProps } from "antd";

interface AntdModalProps extends Omit<ModalProps, "footer"> {
  title?: string;
  closeModal: () => void;
  open: boolean;
  footer?: ReactNode[];
  zIndex?: number;
  size?: "default" | "large" | "extraLarge";
  children?: ReactNode;
  customSize?: number;
}

const AntdModal: React.FC<AntdModalProps> = ({
  title,
  closeModal,
  open,
  footer,
  zIndex = 500,
  size = "default",
  children,
  customSize,
  ...props
}) => {
  const Msize = size === "large" ? 800 : size === "extraLarge" ? 1000 : 520;
  const modalSize = customSize || Msize;

  return (
    <Modal
      {...props}
      width={modalSize}
      zIndex={zIndex}
      title={title}
      onCancel={closeModal}
      open={open}
      footer={footer || null}
      maskClosable={false}
    >
      <Divider className="m-1" />
      {children}
    </Modal>
  );
};

export default AntdModal;
