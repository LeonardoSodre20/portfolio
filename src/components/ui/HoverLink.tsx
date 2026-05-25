interface HoverLinkProps {
  children: React.ReactNode;
  color: string;
  href?: string;
  external?: boolean;
}

export function HoverLink({ children, color, href = "#", external }: HoverLinkProps) {
  return (
    <a
      href={href}
      className="hover-link"
      style={{ "--accent": color } as React.CSSProperties}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
