import { stagger, useAnimate } from 'framer-motion'
import styles from './styles.module.css'
import React from 'react';

const Timer = React.forwardRef((_props, ref) => {
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime((t) => t + 1);
      };
    });
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
    }
  }))

  return <p className={styles.timer}>
    <strong>{time}</strong><small>ms</small>
  </p>;
});

export default function LCP() {
  const [scope, animate] = useAnimate();
  const timerRef = React.useRef(null);

  const loadPage = async () => {
    timerRef.current.reset();
    timerRef.current.start();
    animate("div.item", {
      opacity: [0, 1],
      scale: [0.7, 1]
    }, {
      delay: stagger(0.2, { startDelay: 0.2 }),
      type: 'spring',
      damping: 20,
      stiffness: 100
    });
    animate(`div.${styles.main}`, {
      opacity: [0, 1],
      scale: [0.7, 1]
    }, {
      delay: 1,
      type: 'spring',
      damping: 20,
      stiffness: 100
    }).then(() => {
      timerRef.current.stop();
    });
  }

  const handleRefresh = () => {
    loadPage();
  }

  return <section className={styles.container}>
    <div className={styles.page} ref={scope}>
      <div className="item" />
      <div className={styles.main}>largest content</div>
      <div className="item" />
      <div className="item" />
      <div className="item" />
    </div>
    <div className={styles.control}>
      <h4>Time to LCP</h4>
      <Timer ref={timerRef} />
      <button
        onClick={handleRefresh}
        className={styles.replay}
      >Refresh</button>
    </div>
  </section>
}