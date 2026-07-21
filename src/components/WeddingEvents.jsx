import { motion } from "framer-motion";
import "./WeddingEvents.css";

const DEFAULT_EVENTS = [
  {
    name: "Haldi",
    date: "Dec 10, 9:00 AM",
    desc: "A morning of turmeric, laughter, and blessings.",
    accent: "gold",
  },
  {
    name: "Mehendi",
    date: "Dec 10, 5:00 PM",
    desc: "Intricate henna and music under the open sky.",
    accent: "green",
  },
  {
    name: "Sangeet",
    date: "Dec 11, 7:00 PM",
    desc: "A night of dance, songs, and celebration.",
    accent: "rose",
  },
  {
    name: "Nikah",
    date: "Dec 12, 4:00 PM",
    desc: "The sacred vows, witnessed by all who love them.",
    accent: "maroon",
  },
  {
    name: "Reception",
    date: "Dec 12, 8:00 PM",
    desc: "Dinner, dancing, and a toast to forever.",
    accent: "gold-dark",
  },
];

function EventCard({ event, index }) {
  return (
    <motion.div
      className={`event-card ${event.accent}`}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="event-overlay"></div>

      <div className="event-content">
        <span className="event-date">{event.date}</span>
        <h3 className="event-title">{event.name}</h3>

        <p className="event-description">{event.desc}</p>
      </div>

      <span className="event-arrow">→</span>
    </motion.div>
  );
}

export default function WeddingEvents({ events = DEFAULT_EVENTS }) {
  return (
    <section className="wedding-events" id="events">
      <div className="heading">
        <span className="eyebrow">Five Days of Celebration</span>

        <h2>Wedding Events</h2>

        <div className="divider"></div>
      </div>

      <div className="events-grid">
        {events.map((event, index) => (
          <EventCard key={event.name} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}