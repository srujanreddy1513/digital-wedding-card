import { motion } from "framer-motion";
import "./Blessings.css";

const DEFAULT_BLESSINGS = [
  {
    text: "May your love story keep getting better, one beautiful chapter at a time.",
    from: "The Sharma Family",
  },
  {
    text: "Wishing you a lifetime of laughter, adventure, and quiet Sunday mornings together.",
    from: "The Kapoor Family",
  },
  {
    text: "Two hearts, one home. Congratulations to you both.",
    from: "Friends & Well-wishers",
  },
];

export default function Blessings({
  blessings = DEFAULT_BLESSINGS,
}) {
  return (
    <section className="blessings-section">
      <div className="blessings-header">
        <span className="blessings-subtitle">
          With Warmth
        </span>

        <h2 className="blessings-title">
          Blessings
        </h2>
      </div>

      <div className="blessings-grid">
        {blessings.map((b, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ scale: 1.06 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 12,
              },
            }}
            className="blessing-card"
          >
            <p className="blessing-text">
              “{b.text}”
            </p>

            <footer className="blessing-author">
              — {b.from}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}