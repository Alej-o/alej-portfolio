"use client";

import { usePageTransition } from "@/components/animations/PageTransition";
import { saveLabelForUrl } from "@/app/lib/transitionLabelStore";
import { useRouter, usePathname } from "next/navigation";
import {
  forwardRef,
  type MouseEvent,
  type AnchorHTMLAttributes,
  useRef,
  useEffect,
  useState,
} from "react";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  label?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  skipTransition?: boolean;
  debounceMs?: number;
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Exécuté UNIQUEMENT côté client (jamais SSR)
    setIsTouch(window.matchMedia("(pointer:coarse)").matches);
  }, []);

  return isTouch;
}

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      href,
      children,
      className,
      label,
      disabled = false,
      skipTransition = false,
      debounceMs = 100,
      onClick,
      ...props
    },
    ref
  ) => {
    const { startTransition, isTransitioning } = usePageTransition();
    const router = useRouter();
    const pathname = usePathname();
    const lastClickRef = useRef<number>(0);
    const isTouch = useIsTouchDevice();

    // Ajout : attend d’être hydraté pour éviter le bug mobile
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => { setHydrated(true); }, []);
    if (!hydrated) return null;

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      const now = Date.now();

      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();

      if (disabled) return;
      if (now - lastClickRef.current < debounceMs) return;
      lastClickRef.current = now;

      // PATCH POUR MOBILE/TABLET (touch)
      if (isTouch) {
        if (href.startsWith("/#")) {
          const anchor = href.split("#")[1];
          if (pathname !== "/") {
            sessionStorage.setItem("scrollTo", anchor);
            router.push("/");
          } else {
            const el = document.getElementById(anchor);
            el?.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
        if (href.startsWith("#")) {
          const el = document.getElementById(href.slice(1));
          el?.scrollIntoView({ behavior: "smooth" });
          return;
        }
        if (
          href.startsWith("http") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          window.open(href, "_blank", "noopener,noreferrer");
          return;
        }
        router.push(href);
        return;
      }

      // LOGIQUE DESKTOP AVEC TRANSITION
      if (href.startsWith("#")) {
        if (skipTransition) {
          const element = document.getElementById(href.slice(1));
          element?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      if (skipTransition) {
        router.push(href);
        return;
      }

      if (label) saveLabelForUrl(href, label);
      startTransition(href, label);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={`${className} ${disabled ? "pointer-events-none" : ""}`}
        aria-disabled={disabled}
        data-transitioning={isTransitioning}
        {...props}
      >
        {children}
      </a>
    );
  }
);


TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
