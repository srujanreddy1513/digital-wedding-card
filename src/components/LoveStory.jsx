import { motion } from "framer-motion";
import "./LoveStory.css";

const DEFAULT_MOMENTS = [
  {
    year: "2019",
    title: "First Meeting",
    text: "A chance introduction at a mutual friend's wedding.",
    image: "/public/2019-first meeting.png",
  },
  {
    year: "2021",
    title: "The First Trip",
    text: "Two weeks in the hills that changed everything.",
    image: "/public/2021.png",
  },
  {
    year: "2023",
    title: "The Proposal",
    text: "Under the same stars where they first spoke.",
    image: "/public/2023.png",
  },
  {
    year: "2026",
    title: "The Wedding",
    text: "Two families, one celebration.",
    image: "/public/2026.png",
  },
];

function MemoryFrame({ moment, index }) {
  const fromLeft = index % 2 === 0;

  return (
    <div
      className={`memory-frame ${
        fromLeft ? "memory-left" : "memory-right"
      }`}
    >
      {/* Photo */}
      <motion.div
        initial={{
          opacity: 0,
          x: fromLeft ? -60 : 60,
          rotate: fromLeft ? -6 : 6,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotate: fromLeft ? -3 : 3,
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="memory-photo-container"
      >
        <div className="memory-photo-card">
          <div className="memory-photo">
            {moment.image ? (
              <img
                src={moment.image}
                alt={moment.title}
                className="memory-image"
              />
            ) : (
              <div className="photo-placeholder">
                Photo
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
        }}
        className="memory-text"
      >
        <span className="memory-year">
          {moment.year}
        </span>

        <h3 className="memory-title">
          {moment.title}
        </h3>

        <p className="memory-description">
          {moment.text}
        </p>
      </motion.div>

      {/* Timeline Node */}
      <span className="timeline-node"></span>
    </div>
  );
}

export default function LoveStory({
  moments = DEFAULT_MOMENTS,
}) {
  return (
    <section id="love-story" className="love-story-section">
      <div className="love-story-header">
        <span className="chapter-title">
          Chapter One
        </span>

        <h2 className="main-title">
          Our Love Story
        </h2>

        <div className="divider-line"></div>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        <div className="timeline-content">
          {moments.map((m, i) => (
            <MemoryFrame
              key={m.year + i}
              moment={m}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}