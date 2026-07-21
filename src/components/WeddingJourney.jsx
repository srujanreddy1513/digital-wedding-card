import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./WeddingJourney.css";
import { image } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_STEPS = [
  {
    label: "The Engagement",
    detail: "Families gathered to bless.",
    image:"/engagement.png"
  },
  {
    label: "The Planning",
    detail: "Months of dreaming, choosing.",
    image:"/planning.png"
  },
  {
    label: "The Invitation",
    detail: "A story ready to be shared with you.",
    image:"/invitation.png",
  },
  {
    label: "The Celebration",
    detail: "Five days of rituals, music, and joy.",
    image:"/celebration.png",
  },
];

export default function WeddingJourney({ steps = DEFAULT_STEPS }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    const distance = track.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.8,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="journey-section" ref={sectionRef}>
      <div className="journey-container">
        <div className="journey-heading">
          <span className="journey-subtitle">Chapter Two</span>

          <h2 className="journey-title">
            The Wedding Journey
          </h2>
        </div>

        <div className="journey-track" ref={trackRef}>
          {steps.map((step, index) => (
            <div className="journey-card" key={step.label}>
              <span className="journey-number">
                {String(index + 1).padStart(2, "0")}
              </span>

             <div>
            <img
              src={step.image}
              alt={step.label}
              className="journey-card-image"
            />

            <h3 className="journey-card-title">
              {step.label}
            </h3>

            <p className="journey-card-text">
              {step.detail}
            </p>
          </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}