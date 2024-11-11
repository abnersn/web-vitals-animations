import { motion } from "framer-motion";
import styles from "./styles.module.css";
import React from "react";
import { range } from "lodash";

const animationProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 100,
  }
};

const items = [
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(214, 68%, 69%)" }}
      className={styles.headerItem}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(140, 68%, 69%)" }}
      className={styles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(100, 68%, 69%)" }}
      className={styles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(60, 68%, 69%)" }}
      className={styles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(30, 68%, 69%)" }}
      className={styles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(10, 68%, 69%)" }}
      className={styles.footerItem}
      {...animationProps}
    />
  ),
];

const shifts = [
  20,
  30,
  40,
  50,
  60,
  100,
  120
]

export default function CLS() {
  const [elements, setElements] = React.useState(0);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElements((e) => {
        if (e < items.length) {
          setValue((v) => v + shifts[e]);
          return e + 1;
        }
        clearInterval(interval);
        return e;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  });

  const handleRefresh = () => {
    setValue(0);
    setElements(0);
  };

  return (
    <section className={styles.container}>
      <div className={styles.page}>
        {range(elements).map((i) => {
          const Item = items[items.length - i - 1];
          return <Item key={i} />;
        })}
      </div>
      <div className={styles.control}>
        <h4>Cumulative Layout Shift</h4>
        <p className={styles.counter}>
          <strong>{value}</strong>
        </p>
        <button onClick={handleRefresh} className={styles.replay}>
          Refresh
        </button>
      </div>
    </section>
  );
}
