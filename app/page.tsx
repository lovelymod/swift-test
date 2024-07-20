"use client";
import styles from "@/app/page.module.scss";
import Link from "next/link";

import { useTranslation } from "react-i18next";



export default function Home() {
  const { t } = useTranslation();

  const tests = [
    {
      name: t('layout_title'),
      path: "/layout&shape",
    },
    {
      name: t('spa_title'),
      path: "/spa",
    },
  ];

  return (
    <div className={styles.container}>
      
      {tests.map(({ name, path }) => {
        return (
          <Link href={path} className={styles.card} key={path}>
            <p className={styles.title}>{name}</p>
          </Link>
        );
      })}
    </div>
  );
}
