import React from "react";
import { stagger, useAnimate } from "framer-motion";

import styles from "../styles.module.css";
import inpStyles from "./styles.module.css";
import Timer from "../Timer";

export default function INP() {
  const [scope, animate] = useAnimate();
  const timerRef = React.useRef(null);

  const getINP = async () => {
    timerRef.current.reset();
    timerRef.current.start();
    animate(
      `div.${inpStyles.item}`,
      {
        opacity: [0, 1],
        scale: [0.7, 1],
      },
      {
        delay: stagger(0.2, { startDelay: 0.7 }),
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    );
    setTimeout(() => {
      timerRef.current.stop();
    }, 700);
  };

  return (
    <section className={styles.container}>
      <div ref={scope} className={[styles.page, inpStyles.page].join(' ')}>
        <div className={inpStyles.buttonContainer}>
          <button onClick={getINP} className={styles.button}>Button</button>
        </div>
        <div className={inpStyles.item} />
        <div className={inpStyles.item} />
        <div className={inpStyles.item} />
      </div>
      <div className={styles.control}>
        <h4>Interaction to Next Pain</h4>
        <Timer ref={timerRef} />
        <p className={styles.info}>Click button to trigger INP</p>
      </div>
    </section>
  );
}
