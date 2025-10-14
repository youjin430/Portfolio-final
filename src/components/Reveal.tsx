import { PropsWithChildren } from "react";
import { useInView } from "../hooks/useInView";

type RevealProps = PropsWithChildren<{
  from?: "up" | "down" | "left" | "right";
  delayMs?: number;
}>;

/** 스크롤 진입 시 한번만 나타나는 페이드/슬라이드 */
export default function Reveal({ children, from = "up", delayMs = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const offset = 16; // px

  const transformMap = {
    up: `translateY(${offset}px)`,
    down: `translateY(-${offset}px)`,
    left: `translateX(${offset}px)`,
    right: `translateX(-${offset}px)`,
  } as const;

  return (
    <div
      ref={ref}
      className="will-change-transform will-change-opacity"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transformMap[from],
        transition: `opacity 600ms ease, transform 600ms ease`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}