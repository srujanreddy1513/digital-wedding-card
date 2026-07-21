// import { useRef, useState } from "react";
// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import "./Hero-1.css";


// const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
//   id: i,
//   size: 4 + Math.random() * 10,
//   left: Math.random() * 100,
//   delay: Math.random() * 6,
//   duration: 10 + Math.random() * 10,
//   depth: Math.random() > 0.5 ? 1 : 0.4,
// }));

// export default function Hero({
//   coupleNames = {
//     bride: "Aanya",
//     groom: "Rohan",
//   },
//   weddingDate = "12 . 12 . 2026",
// }) {
//   const containerRef = useRef(null);
//   const [musicOn, setMusicOn] = useState(false);

//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);

//   const sx = useSpring(mx, {
//     stiffness: 50,
//     damping: 20,
//   });

//   const sy = useSpring(my, {
//     stiffness: 50,
//     damping: 20,
//   });

//   const layerBack = {
//     x: useTransform(sx, [-1, 1], [-20, 20]),
//     y: useTransform(sy, [-1, 1], [-15, 15]),
//   };

//   const layerMid = {
//     x: useTransform(sx, [-1, 1], [-40, 40]),
//     y: useTransform(sy, [-1, 1], [-25, 25]),
//   };

//   const layerFront = {
//     x: useTransform(sx, [-1, 1], [-60, 60]),
//     y: useTransform(sy, [-1, 1], [-35, 35]),
//   };

//   const handleMouseMove = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();

//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;

//     mx.set(px * 2);
//     my.set(py * 2);
//   };

//   return (
//     <section
//       id="hero"
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="hero"
//     >
//       {/* Background */}
//       <motion.div style={layerBack} className="hero-bg">
//         <div className="left-gradient"></div>
//         <div className="right-gradient"></div>
//       </motion.div>

//       {/* Particles */}
//       <motion.div style={layerMid} className="particles">
//         {PARTICLES.map((p) => (
//           <motion.span
//             key={p.id}
//             className="particle"
//             style={{
//               width: p.size,
//               height: p.size,
//               left: `${p.left}%`,
//               top: "110%",
//               opacity: p.depth,
//             }}
//             animate={{
//               top: "-10%",
//               x: [0, 15, -10, 0],
//             }}
//             transition={{
//               top: {
//                 duration: p.duration,
//                 repeat: Infinity,
//                 delay: p.delay,
//                 ease: "linear",
//               },
//               x: {
//                 duration: p.duration / 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               },
//             }}
//           />
//         ))}
//       </motion.div>

//       {/* Content */}
//       <motion.div style={layerFront} className="hero-content">
//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="eyebrow"
//         >
//           Together with their families
//         </motion.p>

//         <motion.h1
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="hero-title"
//         >
//           <span>{coupleNames.bride}</span>

//           <span className="ampersand">&</span>

//           <span>{coupleNames.groom}</span>
//         </motion.h1>

//         <motion.div
//           className="date-row"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           <span className="line"></span>

//           <span className="date">{weddingDate}</span>

//           <span className="line"></span>
//         </motion.div>

//         <motion.div
//           className="hero-buttons"
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.4 }}
//         >
//           <a href="#love-story" className="gold-btn">
//             View Invitation
//           </a>

//           <a href="#rsvp" className="ghost-btn">
//             RSVP
//           </a>
//         </motion.div>
//       </motion.div>

//       {/* Music */}
//       <button
//         className="music-btn"
//         onClick={() => setMusicOn(!musicOn)}
//       >
//         {musicOn ? "♫" : "♪"}
//       </button>

//       {/* Scroll Indicator */}
//       <motion.div
//         className="scroll-indicator"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//       >
//         <div className="scroll-line">
//           <motion.div
//             className="scroll-dot"
//             animate={{ y: [-20, 50] }}
//             transition={{
//               repeat: Infinity,
//               duration: 1.5,
//             }}
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// }