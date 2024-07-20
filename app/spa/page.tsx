"use client";
import React, { useEffect, useState } from "react";
import styles from "./spa.module.scss";
import { Form, FormProps } from "antd";

import { useAppDispatch, useAppSelector } from "@/hook/reducer";
import {
  setState,
  IFormState,
  setEdit,
  clearState,
} from "@/store/features/form/formSlice";

import dayjs from "dayjs";

import AntdTable from "@/components/Table";
import AntdForm from "@/components/Form";

type Props = {};

const SPA = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.form);

  const [localData, setLocalData] = useState<IFormState[]>([]);
  const [selectedRow, setselectedRow] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  const handleFetch = () => {
    const jsonValue = localStorage.getItem("formValue") || null;
    if (jsonValue) {
      const parseJson = JSON.parse(jsonValue);
      setLocalData(parseJson);
      dispatch(
        setState({ key: "key", value: parseJson[parseJson.length - 1].key + 1 })
      );
    } else {
      dispatch(setState({ key: "key", value: 0 }));
      setLocalData([]);
    }
  };

  const handleDelete = (id: number) => {
    const filtered = localData.filter((item) => item.key !== id);
    if (filtered.length === 0) {
      localStorage.removeItem("formValue");
    } else {
      localStorage.setItem("formValue", JSON.stringify(filtered));
    }
    handleFetch();
  };

  const handleSelectDelete = (keys: number[]) => {
    const filtered = localData.filter((item) => !keys.includes(item.key));
    if (filtered.length !== 0) {
      localStorage.setItem("formValue", JSON.stringify(filtered));
    } else {
      localStorage.removeItem("formValue");
    }
    setIsSelectAll(false);
    setselectedRow([]);
    handleFetch();
  };

  const handleCheckAll = (checked: boolean) => {
    setIsSelectAll(checked);
    const allKeys = localData.map(({ key }) => key);
    setselectedRow(allKeys);
  };

  const handleEdit = (obj: IFormState) => {
    dispatch(setEdit(obj));
    form.setFieldsValue({ ...obj, birthday: dayjs(obj.birthday) });
  };

  const onFinish: FormProps<IFormState>["onFinish"] = () => {
    if (localData.length !== 0) {
      const isEdit = localData.find((item) => item.key === formState.key);
      if (!!isEdit) {
        const filtered = localData.filter((item) => item.key !== formState.key);
        const saveValue = [...filtered, { ...formState }].sort(
          (a, b) => a.key - b.key
        );
        localStorage.setItem("formValue", JSON.stringify(saveValue));
      } else {
        localStorage.setItem(
          "formValue",
          JSON.stringify([...localData, { ...formState }])
        );
      }
    } else {
      localStorage.setItem("formValue", JSON.stringify([{ ...formState }]));
    }
    handleReset();
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(clearState());
    handleFetch();
  };

  const handleChange = (key: keyof IFormState, value: any) => {
    dispatch(setState({ key, value }));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <AntdForm
          form={form}
          handleChange={handleChange}
          handleReset={handleReset}
          onFinish={onFinish}
        />
      </div>

      <AntdTable
        data={localData}
        isSelectAll={isSelectAll}
        selectedRow={selectedRow}
        setselectedRow={setselectedRow}
        handleCheckAll={handleCheckAll}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleSelectDelete={handleSelectDelete}
      />
    </div>
  );
};

export default SPA;
