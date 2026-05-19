import { useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { IconLink } from "@/components/ui/IconLink";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [menu, setMenu] = useState(false);

  const handleNav = (link: string) => {
    onNavigate(link.toLowerCase().replace("í", "i"));
    setMenu(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__logo">
          <span style={{ color: "var(--color-purple)" }}>{"<"}</span>
          <span style={{ color: "var(--color-white)" }}>DEV</span>
          <span style={{ color: "var(--color-magenta)" }}>.EXE</span>
          <span style={{ color: "var(--color-purple)" }}>{"/>"}</span>
        </div>

        {/* Desktop nav */}
        <div className="navbar__links">
          {NAV_LINKS.map((link) => (
            <NavLink key={link} onClick={() => handleNav(link)}>
              {link}
            </NavLink>
          ))}
        </div>

        <div className="navbar__actions">
          <IconLink href="https://github.com/LeonardoSodre20" color="var(--color-purple)">
            <Github size={17} />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/leonardo-sodr%C3%A9-454a671a3/" color="var(--color-cyan)">
            <Linkedin size={17} />
          </IconLink>
          <button className="navbar__menu-btn" onClick={() => setMenu((m) => !m)}>
            {menu ? (
              <X size={22} style={{ color: "var(--color-magenta)" }} />
            ) : (
              <Menu size={22} style={{ color: "var(--color-purple)" }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menu && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button key={link} className="mobile-menu__link" onClick={() => handleNav(link)}>
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
