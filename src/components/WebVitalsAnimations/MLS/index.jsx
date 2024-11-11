import { motion } from "framer-motion";
import React from "react";
import { range } from "lodash";

import styles from "../styles.module.css";
import clsStyles from "./styles.module.css";
import Timer from "../Timer";

const animationProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 100,
  },
};

const items = [
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(100, 68%, 69%)" }}
      className={clsStyles.headerItem}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(60, 68%, 69%)" }}
      className={clsStyles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(214, 68%, 69%)" }}
      className={clsStyles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(140, 68%, 69%)" }}
      className={clsStyles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(30, 68%, 69%)" }}
      className={clsStyles.item}
      {...animationProps}
    />
  ),
  () => (
    <motion.div
      layout
      style={{ backgroundColor: "hsl(10, 68%, 69%)" }}
      className={clsStyles.footerItem}
      {...animationProps}
    />
  ),
];

const CooldownTime = ({ onHide = () => { } }) => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (time === 2) {
        onHide();
      }
      if (time < 3) {
        setTime((t) => t + 1);
      } else {
        clearTimeout(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  if (time === 3) {
    return null;
  }

  return <p>Cooldown time ({time}s)</p>
}

export default function MLS() {
  const [status, setStatus] = React.useState("idle");
  const [elements, setElements] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (elements === 0) {
      timerRef.current.reset();
      timerRef.current.start();
    }
    const interval = setInterval(() => {
      setElements((e) => {
        if (e < items.length) {
          return e + 1;
        }
        timerRef.current.stop();
        setStatus("cooldown");
        clearInterval(interval);
        return e;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  });

  const handleRefresh = () => {
    setElements(0);
    setStatus("shifting");
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
        <h4>MFE Layout Stabilization</h4>
        <Timer ref={timerRef} />
        {status === "shifting" && <p>Layout is shifting...</p>}
        {status === "cooldown" && <CooldownTime onHide={() => {
          timerRef.current.finish();
        }} />}
        <p className={styles.info}>Click refresh to calculate CLS</p>
        <button onClick={handleRefresh} className={styles.button}>
          Refresh
        </button>
      </div>
    </section>
  );
}
