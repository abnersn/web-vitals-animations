import { stagger, useAnimate } from "framer-motion";
import React from "react";

import styles from "../styles.module.css";
import lcpStyles from "./styles.module.css";

const Timer = React.forwardRef((_props, ref) => {
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime((t) => t + 1);
      }
    }, 1);
    return () => clearInterval(interval);
  });

  React.useImperativeHandle(ref, () => ({
    start() {
      setIsActive(true);
    },
    stop() {
      setIsActive(false);
    },
    reset() {
      setTime(0);
    },
  }));

  return (
    <p className={styles.counter}>
      <strong>{time}</strong>
      <small>ms</small>
    </p>
  );
});

export default function LCP() {
  const [scope, animate] = useAnimate();
  const timerRef = React.useRef(null);

  const loadPage = async () => {
    timerRef.current.reset();
    timerRef.current.start();
    animate(
      `div.${lcpStyles.item}`,
      {
        opacity: [0, 1],
        scale: [0.7, 1],
      },
      {
        delay: stagger(0.2, { startDelay: 0.2 }),
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    );
    animate(
      `div.${lcpStyles.main}`,
      {
        opacity: [0, 1],
        scale: [0.7, 1],
      },
      {
        delay: 1,
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    ).then(() => {
      timerRef.current.stop();
    });
  };

  const handleRefresh = () => {
    loadPage();
  };

  return (
    <section className={styles.container}>
      <div className={styles.page} ref={scope}>
        <div className={lcpStyles.item} />
        <div className={[lcpStyles.main, lcpStyles.item].join(' ')}>largest content</div>
        <div className={lcpStyles.item} />
        <div className={lcpStyles.item} />
        <div className={lcpStyles.item} />
      </div>
      <div className={styles.control}>
        <h4>Time to LCP</h4>
        <Timer ref={timerRef} />
        <p className={styles.info}>Click refresh to calculate LCP</p>
        <button onClick={handleRefresh} className={styles.replay}>
          Refresh
        </button>
      </div>
    </section>
  );
}
