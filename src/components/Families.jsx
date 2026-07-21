import { motion } from "framer-motion";
import "./Families.css";

const DEFAULT_FAMILIES = {
  bride: {
    title: "The Bride's Family",
    parents: "Mr. & Mrs. Sharma",
    members: [
      "Aanya Sharma",
      "Vikram Sharma (Brother)",
      "Meera Sharma (Sister-in-law)",
    ],
  },
  groom: {
    title: "The Groom's Family",
    parents: "Mr. & Mrs. Kapoor",
    members: [
      "Rohan Kapoor",
      "Aditi Kapoor (Sister)",
      "Karan Kapoor (Brother)",
    ],
  },
};

function FamilyCard({ family, align }) {
  return (
    <motion.div
      className="family-card"
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.06 }}
      transition={{
        duration: 0.8,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 12,
        },
      }}
    >
      <span className="family-label">{family.title}</span>

      <h3 className="family-parents">{family.parents}</h3>

      <ul className="family-members">
        {family.members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Families({ families = DEFAULT_FAMILIES }) {
  return (
    <section className="families-section">

      <div className="families-heading">
        <span className="section-label">
          With Love & Blessings
        </span>

        <h2>Our Families</h2>

        <div className="heading-divider"></div>
      </div>

      <div className="families-container">

        <FamilyCard
          family={families.bride}
          align="left"
        />

        <div className="family-divider">&</div>

        <FamilyCard
          family={families.groom}
          align="right"
        />

      </div>

    </section>
  );
}