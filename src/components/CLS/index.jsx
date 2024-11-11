import { stagger, useAnimate } from "framer-motion";
import styles from "./styles.module.css";
import React from "react";
import { range } from "lodash";

const items = [
  () => (
    <div
      style={{ backgroundColor: "hsl(214, 68%, 69%)" }}
      className="item wide"
    />
  ),
  () => (
    <div style={{ backgroundColor: "hsl(140, 68%, 69%)" }} className="item" />
  ),
  () => (
    <div style={{ backgroundColor: "hsl(100, 68%, 69%)" }} className="item" />
  ),
  () => (
    <div style={{ backgroundColor: "hsl(60, 68%, 69%)" }} className="item" />
  ),
  () => (
    <div style={{ backgroundColor: "hsl(30, 68%, 69%)" }} className="item" />
  ),
  () => (
    <div
      style={{ backgroundColor: "hsl(10, 68%, 69%)" }}
      className="item wide"
    />
  ),
];

export default function LCP() {
  const [elements, setElements] = React.useState(0);
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElements((count) => (count < 5 ? count + 1 : count));
    }, 200);

    return () => {
      clearInterval(interval);
    };
  });

  const handleRefresh = () => {
    setElements(0);
  };

  return (
    <section className={styles.container}>
      <div className={styles.page} ref={scope}>
        {range(elements).map((i) => {
          const Item = items[i];
          return <Item key={i} />;
        })}
      </div>
      <div className={styles.control}>
        <h4>Cumulative Layout Shift</h4>
        <button onClick={handleRefresh} className={styles.replay}>
          Refresh
        </button>
      </div>
    </section>
  );
}
