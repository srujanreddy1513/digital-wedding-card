import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./Countdown.css";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 1.6 + 0.4,
  delay: Math.random() * 4,
}));

const FIREFLIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: 40 + Math.random() * 55,
  left: Math.random() * 100,
  delay: Math.random() * 5,
}));

function useCountdown(target) {
  const [time, setTime] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(
        0,
        new Date(target).getTime() - Date.now()
      );

      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [target]);

  return time;
}

function TimeBlock({ value, label }) {
  return (
    <div className="time-block">
      <div className="time-circle">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="time-value"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>

      <span className="time-label">{label}</span>
    </div>
  );
}

export default function Countdown({
  weddingDateISO = "2026-12-12T18:00:00",
}) {
  const { d, h, m, s } = useCountdown(weddingDateISO);

  const stars = useMemo(() => STARS, []);
  const fireflies = useMemo(() => FIREFLIES, []);

  return (
    <section className="countdown-section">

      <div className="night-sky">

        {stars.map((st) => (
          <motion.span
            key={st.id}
            className="star"
            style={{
              top: `${st.top}%`,
              left: `${st.left}%`,
              width: st.size,
              height: st.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: st.delay,
            }}
          />
        ))}

        {fireflies.map((f) => (
          <motion.span
            key={f.id}
            className="firefly"
            style={{
              top: `${f.top}%`,
              left: `${f.left}%`,
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: f.delay,
            }}
          />
        ))}

        <div className="moon"></div>
      </div>

      <div className="countdown-content">

        <span className="countdown-subtitle">
          The Countdown Begins
        </span>

        <h2 className="countdown-title">
          Until We Say “I Do”
        </h2>

        <div className="countdown-card">
          <div className="countdown-grid">
            <TimeBlock value={d} label="Days" />
            <TimeBlock value={h} label="Hours" />
            <TimeBlock value={m} label="Mins" />
            <TimeBlock value={s} label="Secs" />
          </div>
        </div>

      </div>
    </section>
  );
}