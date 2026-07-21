import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./Gallery.css";

const DEFAULT_PHOTOS = [
  {
    id: 1,
    src: "/gallery-1.png",
    tall: true,
  },
  {
    id: 2,
    src: "/gallery-2.png",
    tall: false,
  },
  {
    id: 3,
    src: "/gallery-3.png",
    tall: false,
  },
  {
    id: 4,
    src: "/gallery-4.png",
    tall: true,
  },
  {
    id: 5,
    src: "/gallery-5.png",
    tall: false,
  },
  {
    id: 6,
    src: "/gallery-6.png",
    tall: false,
  },
  {
    id: 7,
    src: "/gallery-7.png",
    tall: true,
  },
  {
    id: 8,
    src: "/gallery-8.png",
    tall: false,
  },
];

function TiltFrame({ photo }) {
  const ref = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 150,
    damping: 15,
  });

  const springY = useSpring(rotateY, {
    stiffness: 150,
    damping: 15,
  });

  const glare = useTransform(
    [springX, springY],
    ([x, y]) => `${50 + y * 2}% ${50 - x * 2}%`
  );

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * 14);
    rotateX.set(-py * 14);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  

  return (
    <motion.div
      className="gallery-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        className={`tilt-card ${photo.tall ? "tall" : "square"}`}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        {photo.src ? (
          <img src={photo.src} alt="" className="gallery-image" />
        ) : (
          <div className="placeholder">
            Gallery Photo
          </div>
        )}

        <motion.div
          className="glare"
          style={{
            background: useTransform(
              glare,
              (g) =>
                `radial-gradient(circle at ${g}, rgba(255,255,255,.35), transparent 60%)`
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Gallery({ photos = DEFAULT_PHOTOS }) {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <span className="eyebrow">Moments</span>

        <h2 className="gallery-title">Gallery</h2>

        <div className="divider"></div>
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <TiltFrame
            key={photo.id}
            photo={photo}
          />
        ))}
      </div>
    </section>
  );
}