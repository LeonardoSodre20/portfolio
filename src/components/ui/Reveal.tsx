import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
