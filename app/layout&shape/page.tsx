"use client";
import React, { useState } from "react";
import styles from "./layout.module.scss";
import { Row, Col, Flex, Divider } from "antd";
import { useTranslation } from "react-i18next";

type Props = {};

interface IShape {
  order: number;
  style: any;
}

const initialShapes = [
  {
    order: 1,
    style: styles.shape1,
  },
  {
    order: 2,
    style: styles.shape2,
  },
  {
    order: 3,
    style: styles.shape3,
  },
  {
    order: 4,
    style: styles.shape4,
  },
  {
    order: 5,
    style: styles.shape5,
  },
  {
    order: 6,
    style: styles.shape6,
  },
];

const LayoutAndShape = (props: Props) => {
  const { t } = useTranslation();
  const [reverse, setReverse] = useState<boolean>(false);
  const [shapes, setShapes] = useState<IShape[]>(initialShapes);

  const reverseWrap = () => {
    setReverse(!reverse);
  };

  const randomPosition = () => {
    setShapes((prev) => {
      const numberArr = prev.map((i) => i.order);
      const result = prev.map((_, index) => {
        const randomIndex = Math.floor(Math.random() * numberArr.length);
        const randomNumber = numberArr.splice(randomIndex, 1)[0];
        return { ...prev[index], order: randomNumber };
      });
      return result;
    });
  };

  const moveLeft = () => {
    setShapes((prev) => {
      const result = prev.map(({ order }, index) => {
        return order === 1
          ? { ...prev[index], order: prev.length }
          : { ...prev[index], order: order - 1 };
      });
      return result;
    });
  };

  const moveRight = () => {
    setShapes((prev) => {
      const result = prev.map(({ order }, index) => {
        return order === prev.length
          ? { ...prev[index], order: 1 }
          : { ...prev[index], order: order + 1 };
      });
      return result;
    });
  };
  return (
    <div className={styles.container}>
      <Flex vertical gap={16}>
        <Flex gap={50} justify="center">
          <div onClick={moveLeft} className={styles.boxBtn}>
            <div className={styles.triangleLeft}></div>
            <p>{t("move_left")}</p>
          </div>

          <div onClick={reverseWrap} className={styles.boxBtn}>
            <Flex>
              <div className={styles.triangleTop}></div>
              <div className={styles.triangleBottom}></div>
            </Flex>
            <p>{t("move_swap")}</p>
          </div>

          <div onClick={moveRight} className={styles.boxBtn}>
            <div className={styles.triangleRight}></div>
            <p>{t("move_right")}</p>
          </div>
        </Flex>
        <Divider />
        <Row
          gutter={[24, 24]}
          justify={"center"}
          style={{
            flexWrap: reverse ? "wrap-reverse" : "wrap",
          }}
        >
          {shapes.map(({ order, style }, index) => {
            return (
              <Col
                className={styles.boxShape}
                onClick={randomPosition}
                span={8}
                key={`${index}`}
                order={order}
              >
                <Flex justify="center">
                  <div className={style}></div>
                </Flex>
              </Col>
            );
          })}
        </Row>
      </Flex>
    </div>
  );
};

export default LayoutAndShape;
