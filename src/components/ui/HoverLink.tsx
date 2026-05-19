interface HoverLinkProps {
  children: React.ReactNode;
  color: string;
  href?: string;
}

export function HoverLink({ children, color, href = "#" }: HoverLinkProps) {
  return (
    <a href={href} className="hover-link" style={{ "--accent": color } as React.CSSProperties}>
      {children}
    </a>
  );
}
