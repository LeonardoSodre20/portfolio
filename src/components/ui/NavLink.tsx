interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function NavLink({ children, onClick }: NavLinkProps) {
  return (
    <button onClick={onClick} className="nav-link">
      {children}
    </button>
  );
}
