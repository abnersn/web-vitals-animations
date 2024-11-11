import React from "react";
import styles from "../styles.module.css";

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

export default Timer;