interface ButtonProps {
  variant?: "primary" | "ghost";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = "primary", href, external, onClick, children }: ButtonProps) {
  const className = `btn btn--${variant}`;
  if (href) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
