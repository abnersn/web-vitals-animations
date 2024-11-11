import styles from "./styles.module.css";
import React from "react";

export default function INP() {
  return (
    <section className={styles.container}>
      <div className={styles.page}>
        <div className={styles.buttonContainer}>
          <button>Button</button>
        </div>
        <div className={styles.item} />
        <div className={styles.item} />
        <div className={styles.item} />
      </div>
      <div className={styles.control}>
        <h4>Interaction to Next Pain</h4>
        <p className={styles.timer}>
          <strong>{3}</strong>
          <small>ms</small>
        </p>
        <p className={styles.info}>Click button to trigger INP</p>
      </div>
    </section>
  );
}
