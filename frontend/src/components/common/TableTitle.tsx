import { ChangeEvent } from "react";
import PropTypes from "prop-types";
import { Button, Popover, Space, Input } from "antd";
import { FcExport, FcRefresh } from "react-icons/fc";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

interface TableTitleProps {
  search?: (value: string, field?: string) => void;
  setFilterTableNull?: (value: null) => void;
  refreshTable?: () => void;
  exportRecords?: () => void;
  openAddModal?: (() => void) | boolean;
  searchOptions?: {
    options?: { id: string | number; value: string }[];
    [key: string]: { id: string | number; value: string }[] | undefined;
  };
  searchLoading?: boolean;
  extraActions?: React.ReactNode;
  addNewText?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({
  search = () => null,
  openAddModal = () => null,
  setFilterTableNull = () => null,
  refreshTable,
  exportRecords,
  extraActions,
  addNewText,
}) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) setFilterTableNull(null);
  };

  const titleAction = (
    <Space direction="vertical">
      {refreshTable && (
        <Button className="w-100" onClick={refreshTable}>
          <Space>
            <FcRefresh /> Reload
          </Space>
        </Button>
      )}
      {exportRecords && (
        <Button onClick={exportRecords} className="bg-light w-100">
          <Space>
            <FcExport />
            Export
          </Space>
        </Button>
      )}
      {extraActions}
      <Popover
        content={() => (
          <div className="w-100">
            <Input.Search
              onChange={onChangeInput}
              placeholder="Search"
              enterButton
              onSearch={(value) => search(value)}
            ></Input.Search>
          </div>
        )}
      >
        {typeof search === "function" && (
          <Button className="w-100 d-md-none">
            <Space>
              <AiOutlineSearch /> Search
            </Space>
          </Button>
        )}
      </Popover>
    </Space>
  );
  return (
    <div className="d-flex w-100">
      <Space className="w-50" direction="horizontal">
        {openAddModal && (
          <Button
            onClick={
              typeof openAddModal === "function" ? openAddModal : undefined
            }
            type="primary"
          >
            <Space>
              <AiOutlinePlus /> {addNewText ? addNewText : "Add New"}
            </Space>
          </Button>
        )}
        <Popover content={titleAction} placement="bottom">
          <Button>Actions</Button>
        </Popover>
      </Space>
      {search && (
        <div className="w-50 d-none d-md-block">
          <Input.Search
            onChange={onChangeInput}
            placeholder="Search..."
            enterButton
            onSearch={(value) => search(value)}
          ></Input.Search>
        </div>
      )}
    </div>
  );
};

TableTitle.propTypes = {
  search: PropTypes.func,
  setFilterTableNull: PropTypes.func,
  refreshTable: PropTypes.func,
  exportRecords: PropTypes.func,
  openAddModal: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  searchLoading: PropTypes.bool,
  extraActions: PropTypes.any,
  addNewText: PropTypes.string,
};

export default TableTitle;
