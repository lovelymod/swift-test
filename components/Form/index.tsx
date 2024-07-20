import React from "react";
import styles from "@/app/spa/spa.module.scss";
import { useTranslation } from "react-i18next";
import { IFormState } from "@/store/features/form/formSlice";

import {
  Button,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
} from "antd";

type Props = {
  form: FormInstance<any>;
  onFinish: (values: IFormState) => void;
  handleChange: (key: keyof IFormState, value: any) => void;
  handleReset: () => void;
};

const AntdForm = ({ form, handleChange, onFinish, handleReset }: Props) => {
  const { t } = useTranslation();
  return (
    <Form name="form" form={form} onFinish={onFinish} autoComplete="off">
      <Form.Item>
        <Form.Item<IFormState>
          label={t("form_title")}
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
          className={styles.formTitle}
        >
          <Select
            onChange={(value) => handleChange("title", value)}
            placeholder={t("form_title")}
            options={[
              { value: "Mr.", label: <span>{t("Mr.")}</span> },
              { value: "Mrs.", label: <span>{t("Mrs.")}</span> },
              { value: "Ms.", label: <span>{t("Ms.")}</span> },
            ]}
          />
        </Form.Item>

        <Form.Item<IFormState>
          label={t("form_firstname")}
          name="firstname"
          rules={[{ required: true }]}
          className={styles.formFirstname}
        >
          <Input
            placeholder={t("form_firstname")}
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
        </Form.Item>

        <Form.Item<IFormState>
          label={t("form_lastname")}
          name="lastname"
          rules={[{ required: true }]}
          className={styles.formLastname}
        >
          <Input
            placeholder={t("form_lastname")}
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item<IFormState>
          label={t("form_birthday")}
          name="birthday"
          rules={[{ required: true }]}
          className={styles.formBirthday}
        >
          <DatePicker
            placeholder={t("form_birthday_placeholder")}
            onChange={(_, dateString) => {
              handleChange("birthday", dateString);
            }}
          />
        </Form.Item>

        <Form.Item<IFormState>
          label={t("form_nationality")}
          name="nationality"
          rules={[{ required: true }]}
          className={styles.formNationality}
        >
          <Select
            onChange={(value) => handleChange("nationality", value)}
            placeholder={t("form_nationality")}
            options={[
              { value: "thai", label: <span>{t("thai")}</span> },
              { value: "japan", label: <span>{t("japan")}</span> },
              { value: "korea", label: <span>{t("korea")}</span> },
            ]}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item<IFormState> label={t("form_citizenId")}>
        <Space>
          <Form.Item<IFormState>
            name="citizenId_1"
            className={styles.formCitizenId}
          >
            <Input
              maxLength={1}
              onChange={(e) => handleChange("citizenId_1", e.target.value)}
            />
          </Form.Item>
          -
          <Form.Item<IFormState>
            name="citizenId_2"
            className={styles.formCitizenId}
          >
            <Input
              maxLength={4}
              onChange={(e) => {
                if (e.target.value.length === 4) {
                  handleChange("citizenId_2", e.target.value);
                }
              }}
            />
          </Form.Item>
          -
          <Form.Item<IFormState>
            name="citizenId_3"
            className={styles.formCitizenId}
          >
            <Input
              maxLength={5}
              onChange={(e) => {
                if (e.target.value.length === 5) {
                  handleChange("citizenId_3", e.target.value);
                }
              }}
            />
          </Form.Item>
          -
          <Form.Item<IFormState>
            name="citizenId_4"
            className={styles.formCitizenId}
          >
            <Input
              maxLength={2}
              onChange={(e) => {
                if (e.target.value.length === 2) {
                  handleChange("citizenId_4", e.target.value);
                }
              }}
            />
          </Form.Item>
          -
          <Form.Item<IFormState>
            name="citizenId_5"
            className={styles.formCitizenId}
          >
            <Input
              maxLength={1}
              onChange={(e) => handleChange("citizenId_5", e.target.value)}
            />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item<IFormState>
        label={t("form_gender")}
        name="gender"
        rules={[{ required: true }]}
      >
        <Radio.Group onChange={(e) => handleChange("gender", e.target.value)}>
          <Radio value={"male"}>{t("male")}</Radio>
          <Radio value={"female"}>{t("female")}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item<IFormState> label={t("form_phone")} required>
        <Space>
          <Form.Item<IFormState>
            name="phoneRegion"
            rules={[{ required: true }]}
            className={styles.formPhone}
          >
            <Select
              onChange={(value) => handleChange("phoneRegion", value)}
              options={[
                { value: "+66", label: <span>+66</span> },
                { value: "+1", label: <span>+1</span> },
                { value: "+33", label: <span>+33</span> },
              ]}
            />
          </Form.Item>
          -
          <Form.Item<IFormState>
            name="phoneNumber"
            rules={[{ required: true }]}
            className={styles.formPhoneNumber}
          >
            <Input
              maxLength={10}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item<IFormState> label={t("form_passport")} name="passport">
        <Input
          style={{
            width: "250px",
          }}
          placeholder={t("form_passport")}
          onChange={(e) => handleChange("passport", e.target.value)}
        />
      </Form.Item>

      <Form.Item<IFormState>
        label={t("form_salary")}
        name="salary"
        rules={[{ required: true }]}
      >
        <Input
          style={{
            width: "150px",
          }}
          placeholder={t("form_salary")}
          onChange={(e) => handleChange("salary", e.target.value)}
        />
      </Form.Item>

      <Flex gap={24} justify="center">
        <Button type="text" htmlType="button" onClick={handleReset}>
          {t("form_reset")}
        </Button>
        <Button type="primary" htmlType="submit">
          {t("form_submit")}
        </Button>
      </Flex>
    </Form>
  );
};

export default AntdForm;
