/* =====================================================
   REVEAL ITEM — CONTENT REVEAL ON SCROLL
   Replaces `.el-reveal-item` handling from the old main.js.
   Adds `el-enter-ready` once mounted (hidden state) and
   `el-entered` when the element scrolls into view.
   Disabled for users who prefer reduced motion.
===================================================== */

import { useEffect, useRef, useState } from "react";

export default function RevealItem({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return undefined;

    setReady(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const classes = [
    className,
    "el-reveal-item",
    ready ? "el-enter-ready" : "",
    entered ? "el-entered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
