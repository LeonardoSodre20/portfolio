interface IconLinkProps {
  href: string;
  color: string;
  children: React.ReactNode;
}

export function IconLink({ href, color, children }: IconLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="icon-link" style={{ "--accent": color } as React.CSSProperties}>
      {children}
    </a>
  );
}
