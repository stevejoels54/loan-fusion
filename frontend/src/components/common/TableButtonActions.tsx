import React from "react";
import PropTypes from "prop-types";
import { Button, Popconfirm, Popover, Space } from "antd";

interface TableButtonActionsProps<T> {
  viewDetails?: (id: React.Key, record: T) => void;
  updateRecord?: (record: T) => void;
  confirmDelete?: (id: React.Key, record: T) => void;
  deleteLoading?: boolean;
  record: T;
  deleteId?: React.Key;
  deleteRecord?: (id: React.Key, record: T) => void;
  extraActions?: React.ReactNode;
}

const TableButtonActions = <T extends { id: React.Key }>({
  viewDetails,
  updateRecord,
  confirmDelete,
  deleteLoading = false,
  record,
  deleteId,
  deleteRecord,
  extraActions,
}: TableButtonActionsProps<T>) => {
  const viewRecordDetails = () => viewDetails?.(record?.id, record);
  const updateRecordDetails = () => updateRecord?.(record);
  const confirmDeleteRecord = () => confirmDelete?.(record.id, record);
  const deleteRow = () => deleteRecord?.(record.id, record);

  return (
    <Popover
      placement="bottom"
      trigger="click"
      content={
        <Space direction="vertical">
          {extraActions}
          {viewDetails && (
            <Button className="w-100" onClick={viewRecordDetails}>
              Check Status
            </Button>
          )}
          {updateRecord && (
            <Button
              type="primary"
              onClick={updateRecordDetails}
              className="w-100"
            >
              Edit
            </Button>
          )}
          <Popconfirm
            okText="Yes"
            cancelText="No"
            onConfirm={confirmDeleteRecord}
            title="Are you sure you want to delete this ?"
          >
            {deleteRecord && (
              <Button
                onClick={deleteRow}
                loading={deleteId === record.id ? deleteLoading : false}
                danger
                type="primary"
                className="w-100"
              >
                Delete
              </Button>
            )}
          </Popconfirm>
        </Space>
      }
    >
      <Button type="link" className="d-md-none">
        Actions
      </Button>
      <Button className="d-none d-md-block">Actions</Button>
    </Popover>
  );
};

TableButtonActions.propTypes = {
  viewDetails: PropTypes.func,
  updateRecord: PropTypes.func,
  confirmDelete: PropTypes.func,
  deleteLoading: PropTypes.bool,
  record: PropTypes.object,
  deleteId: PropTypes.any,
  deleteRecord: PropTypes.func,
  extraActions: PropTypes.any,
};

export default TableButtonActions;
