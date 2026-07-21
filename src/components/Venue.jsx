import { motion } from "framer-motion";
import "./Venue.css";

export default function Venue({
  venue = {
    name: "The Falaknuma Palace",
    address: "Engine Bowli, Falaknuma, Hyderabad, Telangana",
    mapUrl: "https://maps.google.com",
  },
}) {
  return (
    <section id="venue" className="venue-section">
      <div className="venue-container">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="venue-map-card"
        >
         <img src="/public/venue.png" alt="" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="venue-content"
        >
          <span className="venue-subtitle">The Venue</span>

          <h2 className="venue-title">{venue.name}</h2>

          <p className="venue-address">{venue.address}</p>

          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="venue-button"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}