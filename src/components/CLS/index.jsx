import { stagger, useAnimate } from 'framer-motion'
import styles from './styles.module.css'
import React from 'react';
import { range } from 'lodash';

export default function LCP() {
  const [elements, setElements] = React.useState(0);
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElements(
        (count) => count < 5 ?
          count + 1 :
          count
      );
    }, 200);

    return () => {
      clearInterval(interval);
    }
  });

  const loadPage = async () => {
    animate("div.item", {
      opacity: [0, 1],
      scale: [0.7, 1]
    }, {
      delay: stagger(0.2, { startDelay: 0.2 }),
      type: 'spring',
      damping: 20,
      stiffness: 100
    });
  }

  const handleRefresh = () => {
    loadPage();
  }

  return <section className={styles.container}>
    <div className={styles.page} ref={scope}>
      {range(elements).map((i) => (
        <div key={i} className="item" />
      ))}
    </div>
    <div className={styles.control}>
      <h4>Cumulative Layout Shift</h4>
      <button
        onClick={handleRefresh}
        className={styles.replay}
      >Refresh</button>
    </div>
  </section>
}