"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Space, Table } from "antd";
import type { TableProps } from "antd";
import { IFormState } from "@/store/features/form/formSlice";
import { useTranslation } from "react-i18next";

type Props = {
  data: IFormState[];
  isSelectAll: boolean;
  selectedRow: number[];
  setselectedRow: Dispatch<SetStateAction<number[]>>;
  handleDelete: (id: number) => void;
  handleEdit: (obj: IFormState) => void;
  handleSelectDelete: (keys: number[]) => void;
  handleCheckAll: (checked: boolean) => void;
};

const AntdTable = ({
  data,
  isSelectAll,
  selectedRow,
  setselectedRow,
  handleDelete,
  handleEdit,
  handleSelectDelete,
  handleCheckAll,
}: Props) => {
  const { t } = useTranslation();
  const columns: TableProps<IFormState>["columns"] = [
    {
      title: t("table_title"),
      key: "name",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      render: (_, record) => (
        <p>
          {t(record.title)} {record.firstname} {record.lastname}
        </p>
      ),
    },
    {
      title: t("table_gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      render: (text) => <p>{t(text)}</p>,
    },
    {
      title: t("table_phone"),
      key: "phone",
      sorter: (a, b) => +a.phoneNumber - +b.phoneNumber,
      render: (_, record) => (
        <p>
          {record.phoneRegion}
          {record.phoneNumber}
        </p>
      ),
    },
    {
      title: t("table_nation"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      render: (text) => <p>{t(text)}</p>,
    },
    {
      title: t("table_action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            {t("table_action_edit")}
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.key)}
          >
            {t("table_action_delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "90%" }}>
      <Space>
        <Checkbox
          checked={isSelectAll}
          onChange={(e) => handleCheckAll(e.target.checked)}
        >
          {t("select_all")}
        </Checkbox>
        <Button
          type="primary"
          disabled={selectedRow.length === 0}
          onClick={() => handleSelectDelete(selectedRow)}
        >
          {t("delete_all")}
        </Button>
      </Space>

      <Table
        rowSelection={{
          selectedRowKeys: selectedRow,
          onChange: (_: React.Key[], selectedRows: IFormState[]) => {
            setselectedRow(selectedRows.map((row) => row.key));
          },
        }}
        columns={columns}
        dataSource={data}
        pagination={{ position: ["topRight"], pageSize: 2 }}
      />
    </Space>
  );
};

export default AntdTable;
