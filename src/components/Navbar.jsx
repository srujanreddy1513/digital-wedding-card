import { useState } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    href: "#home",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V10" />
      </svg>
    ),
  },
  {
    key: "gallery",
    label: "Gallery",
    href: "#gallery",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M21 16 15.5 10.5 6 20" />
      </svg>
    ),
  },
  {
    key: "story",
    label: "Our Story",
    href: "#story",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8C20.5 15 12 20.5 12 20.5Z" />
      </svg>
    ),
  },
  {
    key: "rsvp",
    label: "RSVP",
    href: "#rsvp",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6 8.5 7 8.5-7" />
      </svg>
    ),
  },
  {
    key: "events",
    label: "Events",
    href: "#events",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 9.5h18" />
        <path d="M8 3v3.2M16 3v3.2" />
        <circle cx="8.3" cy="14" r="1" />
        <circle cx="12" cy="14" r="1" />
        <circle cx="15.7" cy="14" r="1" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  const handleRsvpClick = () => setActive("rsvp");

  return (
    <div className="nav-outer">
      <div className="nav-shape-wrap">
        {/* shared path definitions: clip (fill) + gradient (outline) */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
              <path
                d="
                  M 0.08 0.05
                  A 0.072 0.45 0 1 0 0.08 0.95
                  C 0.145 0.95, 0.175 0.8, 0.25 0.8
                  C 0.33 0.8, 0.35 0.675, 0.43 0.6625
                  C 0.51 0.65, 0.53 0.7875, 0.61 0.8
                  C 0.69 0.8125, 0.71 0.6625, 0.79 0.6125
                  C 0.845 0.575, 0.895 0.55, 0.935 0.5
                  C 0.962 0.46875, 0.976 0.3625, 0.976 0.25
                  C 0.976 0.1375, 0.962 0.0625, 0.935 0.05
                  C 0.895 0.01875, 0.845 0.05, 0.79 0.0875
                  C 0.71 0.1375, 0.69 -0.0125, 0.61 0
                  C 0.53 0.0125, 0.51 0.15, 0.43 0.1375
                  C 0.35 0.125, 0.33 0, 0.25 0
                  C 0.175 0, 0.145 0.05, 0.08 0.05
                  Z
                "
              />
            </clipPath>
            <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="glass-layer"></div>

        <svg className="outline-layer" viewBox="0 0 1000 160" preserveAspectRatio="none">
          <path
            className="rim"
            d="
              M 80 8
              A 72 72 0 1 0 80 152
              C 145 152, 175 128, 250 128
              C 330 128, 350 108, 430 106
              C 510 104, 530 126, 610 128
              C 690 130, 710 106, 790 98
              C 845 92, 895 88, 935 80
              C 962 75, 976 58, 976 40
              C 976 22, 962 10, 935 8
              C 895 3, 845 8, 790 14
              C 710 22, 690 -2, 610 0
              C 530 2, 510 24, 430 22
              C 350 20, 330 0, 250 0
              C 175 0, 145 8, 80 8
              Z
            "
          />
          {/* blinking fairy lights along the ribbon */}
          <circle className="light-dot" cx="250" cy="128" r="2.6" style={{ animationDelay: "0s" }} />
          <circle className="light-dot" cx="340" cy="118" r="2.6" style={{ animationDelay: ".35s" }} />
          <circle className="light-dot" cx="430" cy="106" r="2.6" style={{ animationDelay: ".7s" }} />
          <circle className="light-dot" cx="520" cy="115" r="2.6" style={{ animationDelay: "1.05s" }} />
          <circle className="light-dot" cx="610" cy="126" r="2.6" style={{ animationDelay: "1.4s" }} />
          <circle className="light-dot" cx="700" cy="112" r="2.6" style={{ animationDelay: "1.75s" }} />
          <circle className="light-dot" cx="790" cy="99" r="2.6" style={{ animationDelay: ".2s" }} />
          <circle className="light-dot" cx="300" cy="10" r="2.6" style={{ animationDelay: ".55s" }} />
          <circle className="light-dot" cx="420" cy="16" r="2.6" style={{ animationDelay: ".9s" }} />
          <circle className="light-dot" cx="530" cy="8" r="2.6" style={{ animationDelay: "1.25s" }} />
          <circle className="light-dot" cx="630" cy="2" r="2.6" style={{ animationDelay: "1.6s" }} />
          <circle className="light-dot" cx="730" cy="9" r="2.6" style={{ animationDelay: "1.95s" }} />
        </svg>

        <div className="nav-content">
          <div className="logo-medallion" title="Home">
            <svg className="leaf" viewBox="0 0 60 60">
              <path d="M30 6 C40 16, 48 26, 42 40 C36 52, 22 52, 18 40 C14 28, 20 14, 30 6 Z" />
              <path d="M30 6 C30 20, 30 40, 30 54" />
              <path d="M24 20 C26 24, 28 26, 30 28" />
              <path d="M36 20 C34 24, 32 26, 30 28" />
              <path d="M22 32 C25 35, 28 37, 30 38" />
              <path d="M38 32 C35 35, 32 37, 30 38" />
            </svg>
            <span className="sparkle s1">✦</span>
            <span className="sparkle s3">✧</span>
          </div>

        <nav className="nav-links" aria-label="Primary">
  {NAV_ITEMS.map((item, i) => (
    <div key={item.key} style={{ display: "contents" }}>
      <a
        href={item.href}
        className={`nav-item${active === item.key ? " active" : ""}`}
        data-label={item.label.toLowerCase()}
        onClick={() => setActive(item.key)}
      >
        {item.icon}
        <span>{item.label}</span>
        <i className="underline"></i>
      </a>

      {i < NAV_ITEMS.length - 1 && (
        <span className="nav-divider"></span>
      )}
    </div>
  ))}
</nav>

          <div className="florals" aria-hidden="true">
            <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
              <g fill="var(--rose)" opacity="0.85">
                <ellipse cx="20" cy="20" rx="9" ry="5.5" transform="rotate(20 20 20)" />
                <ellipse cx="30" cy="14" rx="9" ry="5.5" transform="rotate(-15 30 14)" />
                <ellipse cx="14" cy="32" rx="8" ry="5" transform="rotate(60 14 32)" />
              </g>
              <circle cx="24" cy="22" r="4" fill="var(--gold)" />
              <path d="M28 26 C24 45, 30 60, 22 80" stroke="#8a9b6e" strokeWidth="2" fill="none" />
              <ellipse cx="26" cy="45" rx="5" ry="2.5" fill="#8a9b6e" transform="rotate(35 26 45)" />
              <ellipse cx="24" cy="62" rx="5" ry="2.5" fill="#8a9b6e" transform="rotate(-25 24 62)" />
            </svg>
          </div>

          <button className="rsvp-btn" type="button" onClick={handleRsvpClick}>
            <span className="full">RSVP&nbsp;Now</span>
            <span className="short" style={{ display: "none" }}>RSVP</span>
            <svg viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}