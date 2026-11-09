import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const goTo = useSectionNavigation();

  const handleNav = (id: string) => {
    goTo(id);
    setOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__logo">Leonardo Sodré</Link>

        <nav className="site-nav__links" aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} type="button" className="site-nav__link" onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="site-nav__actions">
          <span className="site-nav__cta">
            <WhatsAppButton label="Conversar" />
          </span>
          <button
            type="button"
            className="site-nav__menu-btn"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="site-nav__mobile" data-testid="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} type="button" className="site-nav__mobile-link" onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
