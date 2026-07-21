import { useEffect, useRef, useState } from "react";
import "./Hero.css";
// import Navbar from "./Navbar";

const FRAME_COUNT = 236; // image000.png ... image235.png
const FRAME_PATH = (i) => `/wedding/image${i.toString().padStart(3, "0")}.png`;

// How much scroll distance (in viewport heights) it takes to play the
// whole sequence. Bigger = slower/more scroll needed, smaller = faster.
const SCROLL_LENGTH_VH = 300;

export default function Hero() {
  const wrapperRef = useRef(null); // tall scroll container
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0); // eased frame actually drawn
  const targetFrameRef = useRef(0); // frame implied by scroll position
  const rafRef = useRef(null);
  const cssSizeRef = useRef({ width: 0, height: 0 }); // logical (CSS) canvas size
  const stableViewportHeightRef = useRef(
    typeof window !== "undefined" ? window.innerHeight : 0
  ); // viewport height used for scroll math — only updated on a REAL resize,
  // not on every mobile address-bar show/hide during scrolling
  const lastLayoutSizeRef = useRef({ width: 0, height: 0 }); // last size resize() actually applied

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload every frame once on mount
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (!cancelled) setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      imgs[i] = img;
    }

    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  // Draw a single image onto the canvas, covering it like object-fit: cover.
  // alpha lets us cross-fade between two frames for sub-frame smoothness.
  const drawImageCover = (ctx, img, cw, ch, alpha = 1) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = ih;
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
      sy = 0;
    } else {
      sw = iw;
      sh = iw / canvasRatio;
      sx = 0;
      sy = (ih - sh) / 2;
    }

    ctx.globalAlpha = alpha;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    ctx.globalAlpha = 1;
  };

  // Draw the frame at a fractional index by cross-fading the two nearest
  // integer frames. This removes the visible "stepping" you'd get from
  // rounding to the nearest frame, so scroll motion reads as continuous.
  const drawFrame = (floatIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Use the LOGICAL (CSS) size here, not canvas.width/height.
    // canvas.width/height are already multiplied by devicePixelRatio,
    // and ctx.setTransform(dpr, ...) (set in resize()) scales every
    // draw call by dpr again. Drawing with canvas.width/height here
    // would double-apply the dpr scale (dpr^2), which is what caused
    // the zoomed-in / cropped image on high-DPR mobile screens.
    const { width: cw, height: ch } = cssSizeRef.current;
    if (!cw || !ch) return;

    const lower = Math.floor(floatIndex);
    const upper = Math.min(lower + 1, FRAME_COUNT - 1);
    const frac = floatIndex - lower;

    const lowerImg = imagesRef.current[lower];
    const upperImg = imagesRef.current[upper];

    ctx.clearRect(0, 0, cw, ch);
    drawImageCover(ctx, lowerImg, cw, ch, 1);
    if (frac > 0.001 && upper !== lower) {
      drawImageCover(ctx, upperImg, cw, ch, frac);
    }
  };

  // Resize canvas to fill its container at device pixel ratio.
  //
  // On mobile browsers, the address bar hiding/showing while you scroll
  // fires "resize" (and visualViewport "resize") events continuously, with
  // only the height changing by a small amount each time. If we react to
  // every one of these by resetting canvas.width/height, we clear the
  // canvas and force a redraw dozens of times per second WHILE the user is
  // scrolling — that's the flicker and the "too fast"/jumpy playback you
  // saw. So we debounce, and we ignore resizes that are just the mobile
  // chrome toggling (small height-only changes) — those don't need the
  // canvas or scroll math to change at all.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ADDRESS_BAR_THRESHOLD = 150; // px — typical mobile browser chrome height

    const applyResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const last = lastLayoutSizeRef.current;

      const widthChanged = Math.abs(rect.width - last.width) > 1;
      const heightChanged = Math.abs(rect.height - last.height) > 1;
      const isFirstRun = last.width === 0 && last.height === 0;

      // Only a height change, and small enough to be address-bar chrome —
      // update the stable viewport height reference (so scroll math stays
      // accurate) but skip touching the canvas entirely.
      if (
        !isFirstRun &&
        !widthChanged &&
        heightChanged &&
        Math.abs(rect.height - last.height) < ADDRESS_BAR_THRESHOLD
      ) {
        return;
      }

      lastLayoutSizeRef.current = { width: rect.width, height: rect.height };
      stableViewportHeightRef.current = window.innerHeight;

      cssSizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    let debounceTimer = null;
    const debouncedResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyResize, 150);
    };

    applyResize(); // run once immediately on mount
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", debouncedResize);

    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", debouncedResize);
    };
  }, [loaded]);

  // Compute the target frame from current scroll position (called every
  // animation frame, not on the scroll event — see tick() below)
  const computeTargetFromScroll = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    // Use the cached stable viewport height, not the live window.innerHeight.
    // On mobile, window.innerHeight fluctuates continuously while the
    // address bar animates in/out during a scroll gesture. Reading it live
    // here (called every rAF tick) made the target frame — and therefore
    // the visible playback speed — jitter mid-scroll.
    const viewportHeight = stableViewportHeightRef.current || window.innerHeight;
    const scrollableDistance = wrapper.offsetHeight - viewportHeight;
    if (scrollableDistance <= 0) return;

    // How far we've scrolled into the wrapper (0 at top, 1 at bottom)
    const scrolled = -rect.top;
    const pct = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

    targetFrameRef.current = pct * (FRAME_COUNT - 1);
  };

  // Animation loop: polls scroll position and eases currentFrame toward it
  // every tick. Polling inside rAF (rather than reacting to the "scroll"
  // event) avoids the stutter caused by browsers throttling/batching scroll
  // events during fast wheel/trackpad input.
  useEffect(() => {
    if (!loaded) return;

    // How fast the drawn frame catches up to the scroll target.
    // Higher = snappier/more responsive. Lower = silkier, more glide/lag.
    const SMOOTHING_SPEED = 5.5;
    let lastTime = performance.now();

    const tick = (now) => {
      // Clamp so returning to the tab after being backgrounded doesn't
      // cause one huge catch-up jump.
      const deltaTime = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      computeTargetFromScroll();

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      // Exponential ease-out normalized by elapsed time, so the animation
      // plays at the same perceived speed on 60Hz, 120Hz, 144Hz screens
      // instead of being tied to how many rAF ticks have fired.
      const easedAmount = 1 - Math.exp(-SMOOTHING_SPEED * deltaTime);

      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current = current + diff * easedAmount;
      } else {
        currentFrameRef.current = target;
      }

      drawFrame(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded]);

  return (
    <div
      ref={wrapperRef}
      className="hero-wrapper"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <section className="hero">
        {/* Image sequence canvas, scroll-scrubbed */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {!loaded && (
          <div className="hero-loading">
            <div className="hero-loading-bar">
              <div
                className="hero-loading-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{progress}%</span>
          </div>
        )}

        {/* Overlay */}
        {/* <div className="overlay"></div> */}

        {/* Navbar */}
        {/* <div className="hero-navbar">
          <Navbar />
        </div> */}

        {/* Hero Content */}
        {/* <div className="content">
          <div>
            <h1 className="text-6xl font-bold">
              Build Immersive Digital Experiences
            </h1>
            <p className="mt-4 text-xl">
              Transforming ideas into reality with technology.
            </p>

            <button className="mt-8 rounded-lg bg-white px-6 py-3 text-black font-semibold">
              Get Started
            </button>
          </div>
        </div> */}
      </section>
    </div>
  );
}