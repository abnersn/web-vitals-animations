import React from "react";
import styles from "../styles.module.css";
import { useAnimate } from "framer-motion";

const Timer = React.forwardRef((_props, ref) => {
  const [scope, animate] = useAnimate();

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
    finish() {
      animate(`.${styles.counter}`, {
        scale: [1, 1.1]
      }, {
        delay: 0.1,
        type: "spring",
        damping: 80,
        repeat: 1,
        repeatType: "reverse",
        stiffness: 1000,
      })
    },
    reset() {
      setTime(0);
    },
  }));

  return (
    <div ref={scope}>
      <div className={styles.counter}>
        <strong>{time}</strong>
        <small>ms</small>
      </div>
    </div>
  );
});

export default Timer;
