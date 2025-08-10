"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function LazyInView({
  children,
  idleDelay = 500,
  fallback = null
}: {
  children: React.ReactNode;
  idleDelay?: number;
  fallback?: React.ReactNode;
}) {
  const { ref, inView } = useInView({ rootMargin: "200px 0px", triggerOnce: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setReady(true), idleDelay);
    return () => clearTimeout(t);
  }, [inView, idleDelay]);

  return <div ref={ref} className="relative h-full w-full">{ready ? children : fallback}</div>;
}
