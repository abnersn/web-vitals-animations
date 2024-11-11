import { stagger, useAnimate } from "framer-motion";
import React from "react";

import styles from "../styles.module.css";
import lcpStyles from "./styles.module.css";
import Timer from "../Timer";

export default function LCP() {
  const [scope, animate] = useAnimate();
  const buttonRef = React.useRef(null);
  const timerRef = React.useRef(null);

  const loadPage = async () => {
    buttonRef.current.disabled = true;
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
      timerRef.current.finish();
      buttonRef.current.disabled = false;
    });
  };

  const handleRefresh = () => {
    loadPage();
  };

  return (
    <section className={styles.container}>
      <div className={styles.page} ref={scope}>
        <div className={lcpStyles.item} />
        <div className={[lcpStyles.main, lcpStyles.item].join(" ")}>
          largest content
        </div>
        <div className={lcpStyles.item} />
        <div className={lcpStyles.item} />
        <div className={lcpStyles.item} />
      </div>
      <div className={styles.control}>
        <h4>Time to LCP</h4>
        <Timer ref={timerRef} />
        <p className={styles.info}>Click refresh to calculate LCP</p>
        <button
          ref={buttonRef}
          onClick={handleRefresh}
          className={styles.button}
        >
          Refresh
        </button>
      </div>
    </section>
  );
}
