/* =====================================================
   SECTOR CARD
   Includes the "ROG" independent corner paths ported from the
   end of main.js: four red 36px segments that run from the
   middle of the top/bottom edge, around each corner, on hover.
===================================================== */

import { useLayoutEffect, useRef, useState } from "react";
import RevealItem from "../Reveal/RevealItem";
import { Chevron } from "../Icons/Icons";
import { preventDemoNavigation } from "../../utils/demoLink";

const SEGMENT_LENGTH = 36;
const EDGE = 2;
const DEPTH = 16;

function buildCornerPaths(w, h) {
  const middle = w / 2;
  return [
    // Top-left
    `M ${middle} ${EDGE} H ${EDGE} V ${EDGE + DEPTH}`,
    // Top-right
    `M ${middle} ${EDGE} H ${w - EDGE} V ${EDGE + DEPTH}`,
    // Bottom-left
    `M ${middle} ${h - EDGE} H ${EDGE} V ${h - EDGE - DEPTH}`,
    // Bottom-right
    `M ${middle} ${h - EDGE} H ${w - EDGE} V ${h - EDGE - DEPTH}`,
  ];
}

/* All four paths have the same length: half the width + the corner depth.
   The 36px segment is moved to the end of the path, around the corner. */
function cornerEndOffset(w) {
  const length = w / 2 - EDGE + DEPTH;
  return -Math.max(0, length - SEGMENT_LENGTH);
}

export default function SectorCard({ item, lang, cta }) {
  const t = item[lang];
  const frameRef = useRef(null);
  const [size, setSize] = useState(null); // { w, h }

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      setSize((prev) =>
        prev && prev.w === rect.width && prev.h === rect.height
          ? prev
          : { w: rect.width, h: rect.height },
      );
    };

    update();

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(update);
      observer.observe(frame);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const paths = size ? buildCornerPaths(size.w, size.h) : [];
  const rogEnd = size ? `${cornerEndOffset(size.w)}px` : undefined;

  return (
    <RevealItem
      as="a"
      className="el-sector-card"
      href="#sectors"
      data-demo-link
      onClick={preventDemoNavigation}
    >
      <span ref={frameRef} className="el-sector-card__frame" aria-hidden="true">
        {/* Original stroke (hidden by the final CSS, kept for parity) */}
        <svg
          className="el-sector-card__stroke"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path pathLength="100" d="M50 0 H0 V22" />
          <path pathLength="100" d="M50 0 H100 V22" />
          <path pathLength="100" d="M50 100 H0 V78" />
          <path pathLength="100" d="M50 100 H100 V78" />
        </svg>

        {/* Independent corner paths, sized to the real frame */}
        <svg
          className="el-rog-clean"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox={size ? `0 0 ${size.w} ${size.h}` : undefined}
        >
          {[0, 1, 2, 3].map((index) => (
            <path
              key={index}
              d={paths[index]}
              style={rogEnd ? { "--rog-end": rogEnd } : undefined}
            />
          ))}
        </svg>
      </span>

      <span className="el-sector-card__surface">
        <span className="el-sector-card__media">
          <img src={item.image} alt={t.alt} loading="lazy" />
        </span>
        <span className="el-sector-card__content">
          <strong className="el-sector-card__title">{t.title}</strong>
          <span className="el-sector-card__description">{t.description}</span>
          <span className="el-sector-card__foot">
            <span className="el-sector-card__cta">{cta}</span>
            <Chevron />
          </span>
        </span>
      </span>
    </RevealItem>
  );
}
