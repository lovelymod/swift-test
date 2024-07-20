"use client";

import React from "react";
import styles from "./topbar.module.scss";
import { Select } from "antd";
import i18n from "@/i18nConfig";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {};

const selectOptions = [
  {
    value: "th",
    label: <span>TH</span>,
  },
  {
    value: "en",
    label: <span>EN</span>,
  },
];

const Topbar = (props: Props) => {
  const pathName = usePathname();
  const { t } = useTranslation();
  const swapTitle = () => {
    switch (pathName) {
      case "/":
        return t("home_title");
      case "/layout&shape":
        return t("layout_title");
      case "/spa":
        return t("spa_title");
      default:
        break;
    }
  };

  const onChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{swapTitle()}</p>
      <Select
        defaultValue={i18n.language}
        options={selectOptions}
        onChange={onChangeLanguage}
      />
    </div>
  );
};

export default Topbar;
